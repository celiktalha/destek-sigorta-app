using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SigortaAPI.Migrations
{
    /// <inheritdoc />
    public partial class TeminatSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Teminatlar",
                columns: new[] { "TeminatKod", "NetworkKod", "PaketTipi", "Pirim", "TeminatAd", "TeminatBedeli" },
                values: new object[,]
                {
                    { "KIRMIZI-Y10", "KIRMIZI", "Adet10", 16752.20m, "Kırmızı Network - Yatarak + Ayakta (10 Adet)", 1000000m },
                    { "KIRMIZI-Y4", "KIRMIZI", "Adet4", 11306.92m, "Kırmızı Network - Yatarak + Ayakta (4 Adet)", 1000000m },
                    { "KIRMIZI-YL", "KIRMIZI", "AdetLimitsiz", 21439.63m, "Kırmızı Network - Yatarak + Ayakta (Limitsiz Adet)", 1000000m },
                    { "TURKUAZ-Y10", "TURKUAZ", "Adet10", 13827.13m, "Turkuaz Network - Yatarak + Ayakta (10 Adet)", 100000m },
                    { "TURKUAZ-Y4", "TURKUAZ", "Adet4", 9057.92m, "Turkuaz Network - Yatarak + Ayakta (4 Adet)", 100000m },
                    { "TURKUAZ-YL", "TURKUAZ", "AdetLimitsiz", 17854.54m, "Turkuaz Network - Yatarak + Ayakta (Limitsiz Adet)", 100000m },
                    { "TURUNCU-Y10", "TURUNCU", "Adet10", 15473.38m, "Turuncu Network - Yatarak + Ayakta (10 Adet)", 250000m },
                    { "TURUNCU-Y4", "TURUNCU", "Adet4", 10418.60m, "Turuncu Network - Yatarak + Ayakta (4 Adet)", 250000m },
                    { "TURUNCU-YL", "TURUNCU", "AdetLimitsiz", 19817.50m, "Turuncu Network - Yatarak + Ayakta (Limitsiz Adet)", 250000m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Teminatlar",
                keyColumn: "TeminatKod",
                keyValue: "KIRMIZI-Y10");

            migrationBuilder.DeleteData(
                table: "Teminatlar",
                keyColumn: "TeminatKod",
                keyValue: "KIRMIZI-Y4");

            migrationBuilder.DeleteData(
                table: "Teminatlar",
                keyColumn: "TeminatKod",
                keyValue: "KIRMIZI-YL");

            migrationBuilder.DeleteData(
                table: "Teminatlar",
                keyColumn: "TeminatKod",
                keyValue: "TURKUAZ-Y10");

            migrationBuilder.DeleteData(
                table: "Teminatlar",
                keyColumn: "TeminatKod",
                keyValue: "TURKUAZ-Y4");

            migrationBuilder.DeleteData(
                table: "Teminatlar",
                keyColumn: "TeminatKod",
                keyValue: "TURKUAZ-YL");

            migrationBuilder.DeleteData(
                table: "Teminatlar",
                keyColumn: "TeminatKod",
                keyValue: "TURUNCU-Y10");

            migrationBuilder.DeleteData(
                table: "Teminatlar",
                keyColumn: "TeminatKod",
                keyValue: "TURUNCU-Y4");

            migrationBuilder.DeleteData(
                table: "Teminatlar",
                keyColumn: "TeminatKod",
                keyValue: "TURUNCU-YL");
        }
    }
}
