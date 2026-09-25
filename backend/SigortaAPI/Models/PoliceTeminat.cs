
namespace SigortaAPI.Models
{
    public class PoliceTeminat
    {
        public int PoliceNo {get; set;}
        public Police? Police {get; set;}
        public string TeminatKod {get; set;} = string.Empty;
        public Teminat? Teminat{get; set;}
        public decimal Bedel {get; set;}
        public decimal Pirim {get; set;}
    }
}