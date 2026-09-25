namespace SigortaAPI.Models
{
    public class Teminat
    {
        public string TeminatKod {get; set;} = string.Empty;
        public string TeminatAd {get; set;} = string.Empty;
        public decimal TeminatBedeli {get; set;}
        public decimal Pirim {get; set;}
        public string NetworkKod { get; set; } = string.Empty;
        public string PaketTipi { get; set; } = string.Empty;
        public List<PoliceTeminat> PoliceTeminatlari {get; set;} = new();
    }
}