using Microsoft.AspNetCore.Mvc;
using SigortaAPI.Services;

namespace SigortaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeminatController : ControllerBase
    {
        private readonly ITeminatService _teminatService;

        public TeminatController(ITeminatService teminatService)
        {
            _teminatService = teminatService;
        }

        [HttpGet("{networkKod}")]
        public async Task<IActionResult> TeminatlariGetir(string networkKod)
        {
            var teminatlar = await _teminatService.TeminatlariGetirAsync(networkKod);
            return Ok(teminatlar);
        }
    }
}