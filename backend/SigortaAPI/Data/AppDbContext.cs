using Microsoft.EntityFrameworkCore;
using SigortaAPI.Models;

namespace SigortaAPI.Data
{
    
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Musteri> Musteriler {get; set;} = null!;
    public DbSet<Odeme> Odemeler {get; set;} = null!;
    public DbSet<Police> Policeler {get; set;} = null!;
    public DbSet<PoliceTeminat> PoliceTeminatlari {get; set;} = null!;
    public DbSet<Teminat> Teminatlar {get; set;} = null!;


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Police>()
            .HasOne(p => p.SigortaliMusteri)
            .WithMany(m => m.Policeler)
            .HasForeignKey(p => p.SigortaNo)
            .OnDelete(DeleteBehavior.Restrict); 

        modelBuilder.Entity<Police>()
            .HasOne(p => p.SigEttirenMusteri)
            .WithMany()
            .HasForeignKey(p => p.SigEttirenNo)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Odeme>()
            .HasOne(o => o.Police)
            .WithMany(p => p.Odemeler)
            .HasForeignKey(o => o.PoliceNo);

        modelBuilder.Entity<Odeme>()
            .HasOne(o => o.Musteri)
            .WithMany()
            .HasForeignKey(o => o.MusteriNo);

        modelBuilder.Entity<PoliceTeminat>()
            .HasOne(pt => pt.Police)
            .WithMany(p => p.PoliceTeminatlari)
            .HasForeignKey(pt => pt.PoliceNo);

        modelBuilder.Entity<PoliceTeminat>()
            .HasOne(pt => pt.Teminat)
            .WithMany(t => t.PoliceTeminatlari)
            .HasForeignKey(pt => pt.TeminatKod);

        modelBuilder.Entity<Musteri>()
            .HasKey(m => m.MusteriNo);

        modelBuilder.Entity<Police>()
            .HasKey(p => p.PoliceNo);

        modelBuilder.Entity<Teminat>()
            .HasKey(t => t.TeminatKod);

        modelBuilder.Entity<Odeme>()
            .HasKey(o => o.OdemeId);
        
        modelBuilder.Entity<PoliceTeminat>()
        .HasKey(pt => new { pt.PoliceNo, pt.TeminatKod });

        modelBuilder.Entity<Teminat>().HasData(
            //Teminat Bedeli => sigorta şirketinin kasasından çıkacak para
            //Pirim => müşterinin sigorta yapması için ödeyeceği para
            new Teminat{TeminatKod = "TURKUAZ-Y4", TeminatAd = "Turkuaz Network - Yatarak + Ayakta (4 Adet)", TeminatBedeli = 100000, Pirim = 9057.92m, NetworkKod = "TURKUAZ", PaketTipi = "Adet4"},
            new Teminat{TeminatKod = "TURKUAZ-Y10", TeminatAd = "Turkuaz Network - Yatarak + Ayakta (10 Adet)", TeminatBedeli = 100000, Pirim = 13827.13m, NetworkKod = "TURKUAZ", PaketTipi = "Adet10"},  
            new Teminat{TeminatKod = "TURKUAZ-YL", TeminatAd = "Turkuaz Network - Yatarak + Ayakta (Limitsiz Adet)", TeminatBedeli = 100000, Pirim = 17854.54m, NetworkKod = "TURKUAZ", PaketTipi = "AdetLimitsiz"},
            
            new Teminat{TeminatKod = "TURUNCU-Y4", TeminatAd = "Turuncu Network - Yatarak + Ayakta (4 Adet)", TeminatBedeli = 250000, Pirim = 10418.60m, NetworkKod = "TURUNCU", PaketTipi = "Adet4"},
            new Teminat{TeminatKod = "TURUNCU-Y10", TeminatAd = "Turuncu Network - Yatarak + Ayakta (10 Adet)", TeminatBedeli = 250000, Pirim = 15473.38m, NetworkKod = "TURUNCU", PaketTipi = "Adet10"},  
            new Teminat{TeminatKod = "TURUNCU-YL", TeminatAd = "Turuncu Network - Yatarak + Ayakta (Limitsiz Adet)", TeminatBedeli = 250000, Pirim = 19817.50m, NetworkKod = "TURUNCU", PaketTipi = "AdetLimitsiz"},
            
            new Teminat{TeminatKod = "KIRMIZI-Y4", TeminatAd = "Kırmızı Network - Yatarak + Ayakta (4 Adet)", TeminatBedeli = 1000000, Pirim = 11306.92m, NetworkKod = "KIRMIZI", PaketTipi = "Adet4"},
            new Teminat{TeminatKod = "KIRMIZI-Y10", TeminatAd = "Kırmızı Network - Yatarak + Ayakta (10 Adet)", TeminatBedeli = 1000000, Pirim = 16752.20m, NetworkKod = "KIRMIZI", PaketTipi = "Adet10"},  
            new Teminat{TeminatKod = "KIRMIZI-YL", TeminatAd = "Kırmızı Network - Yatarak + Ayakta (Limitsiz Adet)", TeminatBedeli = 1000000, Pirim = 21439.63m, NetworkKod = "KIRMIZI", PaketTipi = "AdetLimitsiz"}
            
        );
        

    }


}

}