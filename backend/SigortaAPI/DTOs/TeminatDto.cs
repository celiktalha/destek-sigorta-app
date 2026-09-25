using System;

namespace SigortaAPI.DTOs
{
    public class TeminatDto
    {
        public string TeminatKod { get; set; } = string.Empty; // Sistemler arası iletişim için (React ile backend'in birbirini tanıması)
        public string TeminatAd { get; set; } = string.Empty;  // Kullanıcıya ekranda gösterilecek isim
        public decimal Pirim { get; set; }     // Kullanıcıya ekranda gösterilecek fiyat
        public string NetworkKod { get; set; } = string.Empty;
        public string PaketTipi { get; set; } = string.Empty;
    }
}