namespace SigortaAPI.Models
{
    public class Police
    {
        public int PoliceNo {get; set;}
        public string SigortaNo {get; set;} = string.Empty;
        public Musteri? SigortaliMusteri { get; set; }
        public string SigEttirenNo {get; set;} = string.Empty;
        public Musteri? SigEttirenMusteri  { get; set; }
        public decimal Bedel {get; set;}
        public DateTime BasTarih {get; set;}
        public DateTime BitTarih {get; set;}
        public bool TeklifDurum {get; set;}
        public bool BeyanOnay {get; set;}
        public List<PoliceTeminat> PoliceTeminatlari {get; set;} = new();
        public List<Odeme> Odemeler {get; set;} = new();
    }
}