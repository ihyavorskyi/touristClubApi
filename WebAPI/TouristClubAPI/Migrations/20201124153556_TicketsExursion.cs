using Microsoft.EntityFrameworkCore.Migrations;

namespace TouristClub.API.Migrations
{
    public partial class TicketsExursion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AddColumn<string>(
            //    name: "Image",
            //    table: "Articles",
            //    nullable: true);

            //migrationBuilder.AddColumn<string>(
            //    name: "Title",
            //    table: "Articles",
            //    nullable: true);

            //migrationBuilder.CreateTable(
            //    name: "Excursions",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Name = table.Column<string>(nullable: true),
            //        Description = table.Column<string>(nullable: true),
            //        Date = table.Column<DateTime>(nullable: false),
            //        Price = table.Column<int>(nullable: false),
            //        NumberOfSeats = table.Column<int>(nullable: false),
            //        CategoryId = table.Column<int>(nullable: false),
            //        Image = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Excursions", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_Excursions_Categories_CategoryId",
            //            column: x => x.CategoryId,
            //            principalTable: "Categories",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Tickets",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        OwnerId = table.Column<string>(nullable: true),
            //        ExcursionId = table.Column<int>(nullable: false),
            //        UniqueCode = table.Column<string>(nullable: true),
            //        DateOfIssuance = table.Column<DateTime>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Tickets", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_Tickets_Excursions_ExcursionId",
            //            column: x => x.ExcursionId,
            //            principalTable: "Excursions",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Tickets_AspNetUsers_OwnerId",
            //            column: x => x.OwnerId,
            //            principalTable: "AspNetUsers",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_Excursions_CategoryId",
            //    table: "Excursions",
            //    column: "CategoryId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Tickets_ExcursionId",
            //    table: "Tickets",
            //    column: "ExcursionId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Tickets_OwnerId",
            //    table: "Tickets",
            //    column: "OwnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "Tickets");

            //migrationBuilder.DropTable(
            //    name: "Excursions");

            //migrationBuilder.DropColumn(
            //    name: "Image",
            //    table: "Articles");

            //migrationBuilder.DropColumn(
            //    name: "Title",
            //    table: "Articles");
        }
    }
}