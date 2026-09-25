using System;

namespace SigortaAPI.DTOs
{
    public class PoliceOlusturDto
    {
        public string SigortaNo { get; set; } = string.Empty;
        public string SigEttirenNo { get; set; } = string.Empty;
        public string TeminatKod { get; set; } = string.Empty;
        // Not: bir DTO'nun sadece kendi tablosunun alanlarını taşıması gibi bir kural yok;
        // burada Teminat tablosuna ait bir bilgiyi de (kodunu) taşıyoruz, sorun değil.
        public bool BeyanOnay { get; set; }

        // Not: burada liste (List<string>) değil tek bir TeminatKod kullanmamın sebebi,
        // ekranda müşterinin tek bir paket seçebilmesi (radyo buton / tekli seçim).
        // Aynı anda birden fazla paket seçilebilseydi (bir sepet gibi), o zaman
        // List<string> TeminatKodlari kullanmak gerekirdi.

    }
}