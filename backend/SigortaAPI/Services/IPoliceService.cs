using SigortaAPI.DTOs;
using SigortaAPI.Models;

namespace SigortaAPI.Services
{
    public interface IPoliceService
    {
        Task<PoliceOzetDto?> PoliceOlusturAsync(PoliceOlusturDto dto);
    }
}