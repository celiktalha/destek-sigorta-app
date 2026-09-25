using System;

namespace SigortaAPI.DTOs
{
    public class PoliceOzetDto
    {
        public int PoliceNo {get; set;}
        public string SigortaNo {get; set;} = string.Empty;
        public string TeminatAd {get; set;} = string.Empty;
        public string NetworkKod {get; set;} = string.Empty;
        public decimal Bedel {get; set;}
        public DateTime BasTarih {get; set;}
        public DateTime BitTarih {get; set;}
    }
}