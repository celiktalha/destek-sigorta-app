using Microsoft.AspNetCore.Mvc;
using SigortaAPI.Models;
using SigortaAPI.Services;
using SigortaAPI.DTOs;

namespace SigortaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PoliceController : ControllerBase
    {
        private readonly IPoliceService _policeService;

        public PoliceController(IPoliceService policeService)
        {
            _policeService = policeService;
        }

        [HttpPost]
        public async Task<IActionResult> PoliceOlustur([FromBody] PoliceOlusturDto dto)
        {
            try
            {
                var ozet = await _policeService.PoliceOlusturAsync(dto);

                // Eğer Transaction başarısız olup null dönerse sistemsel bir hata olarak ele alınıyor.
                if (ozet == null)
                {
                    return BadRequest("Poliçe oluşturulurken sistemsel bir hata meydana geldi.");
                }

                return Ok(ozet);
            }
            catch (Exception ex)
            {
                // "Paket bulunamadı" / "Onay verilmedi" gibi service katmanından fırlatılan özel hatalar buraya düşer.
                return BadRequest(ex.Message);
            }
        }

    }
}