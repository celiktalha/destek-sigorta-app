using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SigortaAPI.Migrations
{
    /// <inheritdoc />
    public partial class PoliceBeyanOnayEkle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "BeyanOnay",
                table: "Policeler",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BeyanOnay",
                table: "Policeler");
        }
    }
}
