namespace SigortaAPI.Models
{
    public class Musteri
    {
        public string MusteriNo { get; set; } = string.Empty;
        public string Ad { get; set; } = string.Empty;
        public string Soyad { get; set; } = string.Empty;
        public DateTime DogumTarih { get; set; }
        public string CepTel { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public List<Police> Policeler { get; set; } = new();
    }
}