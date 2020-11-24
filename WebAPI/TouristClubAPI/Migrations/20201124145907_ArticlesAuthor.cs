using Microsoft.EntityFrameworkCore.Migrations;

namespace TouristClub.API.Migrations
{
    public partial class ArticlesAuthor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<string>(
            //    name: "AuthorId",
            //    table: "Articles",
            //    nullable: true,
            //    oldClrType: typeof(string),
            //    oldType: "nvarchar(max)",
            //    oldNullable: true);

            //migrationBuilder.CreateIndex(
            //    name: "IX_Articles_AuthorId",
            //    table: "Articles",
            //    column: "AuthorId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Articles_AspNetUsers_AuthorId",
            //    table: "Articles",
            //    column: "AuthorId",
            //    principalTable: "AspNetUsers",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Articles_AspNetUsers_AuthorId",
            //    table: "Articles");

            //migrationBuilder.DropIndex(
            //    name: "IX_Articles_AuthorId",
            //    table: "Articles");

            //migrationBuilder.AlterColumn<string>(
            //    name: "AuthorId",
            //    table: "Articles",
            //    type: "nvarchar(max)",
            //    nullable: true,
            //    oldClrType: typeof(string),
            //    oldNullable: true);
        }
    }
}