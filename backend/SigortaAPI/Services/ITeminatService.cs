using SigortaAPI.Models;
using SigortaAPI.DTOs;

namespace SigortaAPI.Services
{

    // ITeminatService, Controller'a verilen bir sözleşme (contract) gibi düşünülebilir:
    // "networkKod verilirse, karşılığında bir TeminatDto listesi döneceğim" garantisi.
    public interface ITeminatService
    {
        // Task<List<TeminatDto>>: işlem asenkron (Task) ve tamamlandığında bir DTO listesi döner.
        Task<List<TeminatDto>> TeminatlariGetirAsync(string networkKod);
        Task<Teminat?> TeminatKoduIleBulAsync(string teminatKod);
    }
}