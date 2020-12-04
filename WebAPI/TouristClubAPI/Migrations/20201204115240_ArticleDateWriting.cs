using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TouristClub.API.Migrations
{
    public partial class ArticleDateWriting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AddColumn<DateTime>(
            //    name: "Date",
            //    table: "Articles",
            //    nullable: false,
            //    defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //    migrationBuilder.DropColumn(
            //        name: "Date",
            //        table: "Articles");
        }
    }
}