using System;

namespace SigortaAPI.DTOs
{
    public class OdemeOlusturDto
    {
        public int PoliceNo { get; set; } 
        public string KartNo { get; set; } = string.Empty;
        public DateTime KulTarih {get; set;}
        public string CVC { get; set; } = string.Empty;
        public int TaksitSayisi { get; set; }


    }
}