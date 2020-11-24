using Microsoft.EntityFrameworkCore.Migrations;

namespace TouristClub.API.Migrations
{
    public partial class UserComments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<string>(
            //    name: "AuthorId",
            //    table: "Comments",
            //    nullable: true,
            //    oldClrType: typeof(string),
            //    oldType: "nvarchar(max)",
            //    oldNullable: true);

            //migrationBuilder.CreateIndex(
            //    name: "IX_Comments_AuthorId",
            //    table: "Comments",
            //    column: "AuthorId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Comments_AspNetUsers_AuthorId",
            //    table: "Comments",
            //    column: "AuthorId",
            //    principalTable: "AspNetUsers",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Comments_AspNetUsers_AuthorId",
            //    table: "Comments");

            //migrationBuilder.DropIndex(
            //    name: "IX_Comments_AuthorId",
            //    table: "Comments");

            //migrationBuilder.AlterColumn<string>(
            //    name: "AuthorId",
            //    table: "Comments",
            //    type: "nvarchar(max)",
            //    nullable: true,
            //    oldClrType: typeof(string),
            //    oldNullable: true);
        }
    }
}