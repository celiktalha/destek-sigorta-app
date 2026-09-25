using SigortaAPI.Data;
using Microsoft.EntityFrameworkCore;
using SigortaAPI.DTOs;
using SigortaAPI.Models;

namespace SigortaAPI.Services
{
    //AMAÇ: "TeminatService DTo da belirlediğimiz verileri Db den çekmek için hazırlanmış bir sınıftır.
    public class TeminatService : ITeminatService
    {
        private readonly AppDbContext _context;

        public TeminatService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TeminatDto>> TeminatlariGetirAsync(string networkKod)
        {
            // TeminatService, TeminatDto'da belirlediğimiz alanları veritabanından çekip hazırlayan sınıf.
            // 2. MAPPİNG İŞLEMİ...
            /*
            Mapping, bir veri yapısındaki (class/nesne) bilgileri, başka bir veri yapısına aktarma işlemidir — alan alan, elle veya otomatik şekilde.
            */
            var paketler = await _context.Teminatlar
                .Where(t => t.NetworkKod == networkKod)
                .Select(t => new TeminatDto
                {
                    TeminatKod = t.TeminatKod,
                    TeminatAd = t.TeminatAd,
                    Pirim = t.Pirim,
                    NetworkKod = t.NetworkKod,
                    PaketTipi = t.PaketTipi
                })
                .ToListAsync();

            // 3. Sonucu gönder
            return paketler;
        }

        public async Task<Teminat?> TeminatKoduIleBulAsync(string teminatKod)
        {
            return await _context.Teminatlar
                .FirstOrDefaultAsync(t => t.TeminatKod == teminatKod);
        }
    }
}