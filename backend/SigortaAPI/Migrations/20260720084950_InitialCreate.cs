using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SigortaAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Musteriler",
                columns: table => new
                {
                    MusteriNo = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Ad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Soyad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DogumTarih = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CepTel = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Musteriler", x => x.MusteriNo);
                });

            migrationBuilder.CreateTable(
                name: "Teminatlar",
                columns: table => new
                {
                    TeminatKod = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TeminatAd = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TeminatBedeli = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Pirim = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teminatlar", x => x.TeminatKod);
                });

            migrationBuilder.CreateTable(
                name: "Policeler",
                columns: table => new
                {
                    PoliceNo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SigortaNo = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SigEttirenNo = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Bedel = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BasTarih = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BitTarih = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TeklifDurum = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Policeler", x => x.PoliceNo);
                    table.ForeignKey(
                        name: "FK_Policeler_Musteriler_SigEttirenNo",
                        column: x => x.SigEttirenNo,
                        principalTable: "Musteriler",
                        principalColumn: "MusteriNo",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Policeler_Musteriler_SigortaNo",
                        column: x => x.SigortaNo,
                        principalTable: "Musteriler",
                        principalColumn: "MusteriNo",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Odemeler",
                columns: table => new
                {
                    OdemeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PoliceNo = table.Column<int>(type: "int", nullable: false),
                    MusteriNo = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    KartNo = table.Column<int>(type: "int", nullable: false),
                    KulTarih = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CVC = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Odemeler", x => x.OdemeId);
                    table.ForeignKey(
                        name: "FK_Odemeler_Musteriler_MusteriNo",
                        column: x => x.MusteriNo,
                        principalTable: "Musteriler",
                        principalColumn: "MusteriNo",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Odemeler_Policeler_PoliceNo",
                        column: x => x.PoliceNo,
                        principalTable: "Policeler",
                        principalColumn: "PoliceNo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PoliceTeminatlari",
                columns: table => new
                {
                    PoliceNo = table.Column<int>(type: "int", nullable: false),
                    TeminatKod = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Bedel = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Pirim = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PoliceTeminatlari", x => new { x.PoliceNo, x.TeminatKod });
                    table.ForeignKey(
                        name: "FK_PoliceTeminatlari_Policeler_PoliceNo",
                        column: x => x.PoliceNo,
                        principalTable: "Policeler",
                        principalColumn: "PoliceNo",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PoliceTeminatlari_Teminatlar_TeminatKod",
                        column: x => x.TeminatKod,
                        principalTable: "Teminatlar",
                        principalColumn: "TeminatKod",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Odemeler_MusteriNo",
                table: "Odemeler",
                column: "MusteriNo");

            migrationBuilder.CreateIndex(
                name: "IX_Odemeler_PoliceNo",
                table: "Odemeler",
                column: "PoliceNo");

            migrationBuilder.CreateIndex(
                name: "IX_Policeler_SigEttirenNo",
                table: "Policeler",
                column: "SigEttirenNo");

            migrationBuilder.CreateIndex(
                name: "IX_Policeler_SigortaNo",
                table: "Policeler",
                column: "SigortaNo");

            migrationBuilder.CreateIndex(
                name: "IX_PoliceTeminatlari_TeminatKod",
                table: "PoliceTeminatlari",
                column: "TeminatKod");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Odemeler");

            migrationBuilder.DropTable(
                name: "PoliceTeminatlari");

            migrationBuilder.DropTable(
                name: "Policeler");

            migrationBuilder.DropTable(
                name: "Teminatlar");

            migrationBuilder.DropTable(
                name: "Musteriler");
        }
    }
}
