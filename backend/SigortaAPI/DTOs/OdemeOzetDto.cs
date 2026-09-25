using System;

namespace SigortaAPI.DTOs
{
    public class OdemeOzetDto
    {
        public int OdemeId { get; set; }
        public int PoliceNo { get; set; }
        public string MusteriAdSoyad { get; set; } = string.Empty;
        public string TeminatAd { get; set; } = string.Empty;
        public decimal OdenenTutar { get; set; }
        public int TaksitSayisi { get; set; }
        public DateTime PoliceBasTarih { get; set; }
        public DateTime PoliceBitTarih { get; set; }
    }
}
