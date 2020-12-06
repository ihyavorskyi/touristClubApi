using Microsoft.EntityFrameworkCore.Migrations;

namespace TouristClub.API.Migrations
{
    public partial class articleFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Comments_Articles_AricleId",
            //    table: "Comments");

            //migrationBuilder.DropIndex(
            //    name: "IX_Comments_AricleId",
            //    table: "Comments");

            //migrationBuilder.DropColumn(
            //    name: "AricleId",
            //    table: "Comments");

            //migrationBuilder.AddColumn<int>(
            //    name: "ArticleId",
            //    table: "Comments",
            //    nullable: false,
            //    defaultValue: 0);

            //migrationBuilder.CreateIndex(
            //    name: "IX_Comments_ArticleId",
            //    table: "Comments",
            //    column: "ArticleId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Comments_Articles_ArticleId",
            //    table: "Comments",
            //    column: "ArticleId",
            //    principalTable: "Articles",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //    migrationBuilder.DropForeignKey(
            //        name: "FK_Comments_Articles_ArticleId",
            //        table: "Comments");

            //    migrationBuilder.DropIndex(
            //        name: "IX_Comments_ArticleId",
            //        table: "Comments");

            //    migrationBuilder.DropColumn(
            //        name: "ArticleId",
            //        table: "Comments");

            //    migrationBuilder.AddColumn<int>(
            //        name: "AricleId",
            //        table: "Comments",
            //        type: "int",
            //        nullable: false,
            //        defaultValue: 0);

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Comments_AricleId",
            //        table: "Comments",
            //        column: "AricleId");

            //    migrationBuilder.AddForeignKey(
            //        name: "FK_Comments_Articles_AricleId",
            //        table: "Comments",
            //        column: "AricleId",
            //        principalTable: "Articles",
            //        principalColumn: "Id",
            //        onDelete: ReferentialAction.Cascade);
        }
    }
}