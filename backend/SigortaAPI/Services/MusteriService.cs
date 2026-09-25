using SigortaAPI.Data;
using SigortaAPI.Models;
using Microsoft.EntityFrameworkCore;
using SigortaAPI.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace SigortaAPI.Services
{
    public class MusteriServices : IMusteriService  // IMusteriService'i implemente ediyor
    {
        private readonly AppDbContext _context;
        public MusteriServices(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Musteri?> MusteriBulAsync(string musteriNo)
        {
            return await _context.Musteriler
                .FirstOrDefaultAsync(m => m.MusteriNo == musteriNo);
        }

        public async Task<Musteri> MusteriOlusturAsync(MusteriOlusturDto dto)
        {
            var yeniMusteri = new Musteri
            {
                MusteriNo = dto.MusteriNo,
                Ad = dto.Ad,
                Soyad = dto.Soyad,
                DogumTarih = dto.DogumTarih,
                CepTel = dto.CepTel,
                Email = dto.Email
            };

            await _context.Musteriler.AddAsync(yeniMusteri);
            await _context.SaveChangesAsync();

            return yeniMusteri;
        }

        public async Task<Musteri> MusteriGetirOrKaydetAsync(MusteriOlusturDto dto)
        {
            // Müşteri kayıtlı mı diye TC (MusteriNo) üzerinden kontrol ediyoruz.
            var tempMusteri = await _context.Musteriler
                .FirstOrDefaultAsync(m => m.MusteriNo == dto.MusteriNo);

            // Kayıtlıysa yeni bir şey oluşturmadan mevcut kaydı döndürüyoruz.
            if (tempMusteri != null)
            {
                return tempMusteri;
            }

            // Kayıtlı değilse DTO'daki verilerle yeni bir müşteri oluşturuyoruz.
            var yeniMusteri = new Musteri
            {
                MusteriNo = dto.MusteriNo,
                Ad = dto.Ad,
                Soyad = dto.Soyad,
                DogumTarih = dto.DogumTarih,
                CepTel = dto.CepTel,
                Email = dto.Email
            };

            // DB'e ekle ve kaydet.
            await _context.Musteriler.AddAsync(yeniMusteri);
            await _context.SaveChangesAsync();

            // Yeni oluşturduğun adamı Controller'a geri gönder.
            return yeniMusteri;
        }

    }
}