using Microsoft.AspNetCore.Mvc;
using SigortaAPI.Services;
using SigortaAPI.DTOs;

namespace SigortaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OdemeController : ControllerBase
    {
        private readonly IOdemeService _odemeService;

        public OdemeController(IOdemeService odemeService)
        {
            _odemeService = odemeService;
        }

        [HttpPost]
        public async Task<IActionResult> OdemeYap([FromBody] OdemeOlusturDto dto)
        {
            try
            {
                var odeme = await _odemeService.OdemeYapAsync(dto);

                if (odeme == null)
                {
                    return BadRequest("Ödeme işlenirken bir hata oluştu.");
                }

                return Ok(odeme);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}