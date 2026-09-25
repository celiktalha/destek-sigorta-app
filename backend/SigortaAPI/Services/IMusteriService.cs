using SigortaAPI.Models;
using SigortaAPI.DTOs;

namespace SigortaAPI.Services
{

    // "I" öneki, interface olduğunu belirten isimlendirme kuralı (IMusteriService).
    //
    // Task<Musteri?> MusteriBulAsync(...) imzasının anlamı:
    //   - Task: bu işlemin asenkron (zaman alabilen) bir işlem olduğunu belirtir
    //   - Musteri?: müşteri bulunamazsa null dönebileceğini belirtir (nullable)
    //   - Async son eki: yine asenkron bir metot olduğunu gösteren isimlendirme kuralı
    public interface IMusteriService
    {
        Task<Musteri?> MusteriBulAsync(string musteriNo);
        Task<Musteri> MusteriOlusturAsync(MusteriOlusturDto dto);
        Task<Musteri> MusteriGetirOrKaydetAsync(MusteriOlusturDto dto);
    }
}