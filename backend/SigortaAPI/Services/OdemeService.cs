using SigortaAPI.Data;
using SigortaAPI.DTOs;
using SigortaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace SigortaAPI.Services
{
    public class OdemeService : IOdemeService
    {
        private readonly AppDbContext _context;

        public OdemeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<OdemeOzetDto?> OdemeYapAsync(OdemeOlusturDto dto)
        {
            // Ödeme kaydı + poliçe güncellemesi tek bir transaction içinde yapılıyor;
            // biri başarısız olursa diğeri de geri alınsın diye.
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // 1. Poliçeyi bul
                var police = await _context.Policeler
                    .FirstOrDefaultAsync(p => p.PoliceNo == dto.PoliceNo);

                if (police == null)
                {
                    throw new Exception("Böyle bir poliçe bulunamadı.");
                }

                var musteri = await _context.Musteriler
                    .FirstOrDefaultAsync(m => m.MusteriNo == police.SigEttirenNo);

                var policeTeminat = await _context.PoliceTeminatlari
                    .Include(pt => pt.Teminat)
                    .FirstOrDefaultAsync(pt => pt.PoliceNo == dto.PoliceNo);
                //---
                // 2. Ödeme kaydını oluştur MAPPİNG kısmı
                var yeniOdeme = new Odeme
                {
                    PoliceNo = dto.PoliceNo,
                    MusteriNo = police.SigEttirenNo,
                    KartNo = dto.KartNo,
                    KulTarih = dto.KulTarih,
                    CVC = dto.CVC,
                    TaksitSayisi = dto.TaksitSayisi
                };
                //---
                await _context.Odemeler.AddAsync(yeniOdeme);
                await _context.SaveChangesAsync();

                // 3. Poliçenin durumunu güncelle (Update)
                // Ödeme alındığına göre poliçe artık "teklif" değil, aktif durumda.
                police.TeklifDurum = true;
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                //OdemeOzet mapping 
                var ozet = new OdemeOzetDto
                {
                    OdemeId = yeniOdeme.OdemeId,
                    PoliceNo = police.PoliceNo,
                    MusteriAdSoyad = musteri != null ? $"{musteri.Ad} {musteri.Soyad}" : "",
                    TeminatAd = policeTeminat?.Teminat?.TeminatAd ?? "",
                    OdenenTutar = police.Bedel,
                    TaksitSayisi = dto.TaksitSayisi,
                    PoliceBasTarih = police.BasTarih,
                    PoliceBitTarih = police.BitTarih
                };

                return ozet;
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                return null;
            }
        }
    }
}