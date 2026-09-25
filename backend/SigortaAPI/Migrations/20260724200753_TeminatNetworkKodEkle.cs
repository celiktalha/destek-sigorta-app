using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SigortaAPI.Migrations
{
    /// <inheritdoc />
    public partial class TeminatNetworkKodEkle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NetworkKod",
                table: "Teminatlar",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NetworkKod",
                table: "Teminatlar");
        }
    }
}
