using SigortaAPI.Models;
using SigortaAPI.DTOs;

namespace SigortaAPI.Services
{
    public interface IOdemeService
    {
        Task<OdemeOzetDto?> OdemeYapAsync(OdemeOlusturDto dto);
    }
}