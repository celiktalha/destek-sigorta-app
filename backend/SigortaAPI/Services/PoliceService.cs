using SigortaAPI.Data;
using SigortaAPI.DTOs;
using SigortaAPI.Models;

namespace SigortaAPI.Services
{
    public class PoliceService : IPoliceService
    {
        private readonly AppDbContext _context;
        private readonly ITeminatService _teminatService;

        public PoliceService(AppDbContext context, ITeminatService teminatService)
        {
            _context = context;
            _teminatService = teminatService;
        }

        public async Task<PoliceOzetDto?> PoliceOlusturAsync(PoliceOlusturDto dto)
        {

            if (dto.BeyanOnay == false)
            {
                throw new Exception("Sağlık beyanı ve kişisel veri onayı olmadan işlem yapılamaz.");
            }

            // 1. Transaction Başlat
            // Poliçe + PoliceTeminat kayıtları birlikte kalıcı olsun/olmasın diye transaction içinde ilerliyoruz.
            using var transaction = await _context.Database.BeginTransactionAsync();
            // Bu satırdan sonra yapılan tüm DB işlemleri, henüz geçici durumda, gerçek anlamda kalıcı değil.

            try
            {
                // 2. GÜVENLİK VE VERİ HAZIRLIĞI
                // React'ten gelen paket kodunu (Örn: TRNC-10) veritabanında buluyoruz ki gerçek fiyatını öğrenelim.
                var secilenTeminat = await _context.Teminatlar.FindAsync(dto.TeminatKod);

                if (secilenTeminat == null)
                {
                    throw new Exception("Böyle bir paket bulunamadı."); // Olmayan bir ID gelirse işlemi durdur.
                }

                // 3. ANA TABLO (Police) KAYDI
                var yeniPolice = new Police
                {
                    SigortaNo = dto.SigortaNo,
                    SigEttirenNo = dto.SigEttirenNo,
                    BeyanOnay = dto.BeyanOnay,
                    Bedel = secilenTeminat.Pirim, // Fiyatı DTO'dan değil, güvenli DB'den aldık!
                    BasTarih = DateTime.Now,
                    BitTarih = DateTime.Now.AddYears(1), // Sigorta 1 yıllık
                    TeklifDurum = false
                };

                _context.Policeler.Add(yeniPolice);
                await _context.SaveChangesAsync();
                // DİKKAT: 1. Kayıt bitti. SQL artık bu poliçeye otomatik bir 'Id' verdi (Örn: 5).

                // 4. DETAY TABLOSU (PoliceTeminat) KAYDI
                var policeTeminat = new PoliceTeminat
                {
                    PoliceNo = yeniPolice.PoliceNo,
                    TeminatKod = dto.TeminatKod,
                    Bedel = secilenTeminat.TeminatBedeli,
                    Pirim = secilenTeminat.Pirim
                };

                _context.PoliceTeminatlari.Add(policeTeminat);
                await _context.SaveChangesAsync();
                // 2. Kayıt da bitti. İki tablo birbirine bağlandı.

                // 5. İŞLEM BAŞARILI
                await transaction.CommitAsync();
                // Bu satır çalışırsa Db ye yazılmış olan yukarıdaki bilgiler artık commit edilmiştir. Yani Db artık günceldir. Ancak buraya kadar bir hata oluşmuşsa catch çalışır ve kaydetmez.
                // POLİCEOZET TABLOSU MAPPİNG
                var yeniPoliceOzet = new PoliceOzetDto
                {
                    // 1. Yeni oluşan poliçeden aldığımız veriler:
                    PoliceNo = yeniPolice.PoliceNo,
                    SigortaNo = yeniPolice.SigortaNo,
                    Bedel = yeniPolice.Bedel,
                    BasTarih = yeniPolice.BasTarih,
                    BitTarih = yeniPolice.BitTarih,

                    // 2. En başta veritabanından bulduğumuz Teminat'tan (Paketten) aldığımız veriler:
                    TeminatAd = secilenTeminat.TeminatAd,
                    NetworkKod = secilenTeminat.NetworkKod

                };
                return yeniPoliceOzet; // Controller'a yeni poliçeyi gönder.
            }
            catch (Exception)
            {
                // 6. HATA DURUMU
                await transaction.RollbackAsync(); // Hata çıkarsa geçici hafızayı temizle.
                return null;
            }
        }

    }
}