using Microsoft.AspNetCore.Mvc;
using SigortaAPI.Models;
using SigortaAPI.Services;
using SigortaAPI.DTOs;

namespace SigortaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MusteriController : ControllerBase
    {
        private readonly IMusteriService _musteriService;

        public MusteriController(IMusteriService musteriService)
        {
            _musteriService = musteriService;
        }

        [HttpGet("{musteriNo}")]
        public async Task<IActionResult> MusteriSorgula(string musteriNo)
        {
            var musteri = await _musteriService.MusteriBulAsync(musteriNo);

            if (musteri == null)
            {
                return NotFound("Bu müşteriye ait kayıt bulunamadı.");
            }

            return Ok(musteri);
        }

        [HttpPost]
        public async Task<IActionResult> MusteriEkle(MusteriOlusturDto dto)
        {
            var yeniMusteri = await _musteriService.MusteriOlusturAsync(dto);
            return Ok(yeniMusteri);
        }

        // Get-or-create endpoint: müşteri kayıtlıysa mevcut kaydı döner, değilse yeni oluşturur.
        [HttpPost("Giris")]
        public async Task<IActionResult> GirisYapVeyaKaydet([FromBody] MusteriOlusturDto dto)
        {
            try
            {
                // Karar mantığı (var mı yok mu, oluştur mu getir mi) service katmanında.
                var musteri = await _musteriService.MusteriGetirOrKaydetAsync(dto);

                return Ok(musteri);
            }
            catch (Exception ex)
            {
                // Beklenmeyen bir hata (örn. veritabanı bağlantı sorunu) durumunda güvenlik ağı.
                return BadRequest($"İşlem sırasında bir hata oluştu: {ex.Message}");
            }
        }

    }
}