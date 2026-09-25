namespace SigortaAPI.Models
{
    public class Odeme
    {
        public int OdemeId {get; set;}
        public int PoliceNo { get; set; }          // Foreign Key -> Police
        public Police? Police { get; set; }        // Navigation Property
        public string MusteriNo { get; set; } = string.Empty; // Foreign Key -> Musteri
        public Musteri? Musteri { get; set; }       // Navigation Property
        public string KartNo { get; set; } = string.Empty;
        public DateTime KulTarih {get; set;}
        public string CVC { get; set; } = string.Empty;
        public int TaksitSayisi { get; set; }
    }
}