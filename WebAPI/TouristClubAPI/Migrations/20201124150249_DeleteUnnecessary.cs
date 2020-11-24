using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TouristClub.API.Migrations
{
    public partial class DeleteUnnecessary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_AspNetUsers_Departments_DepartmentId",
            //    table: "AspNetUsers");

            //migrationBuilder.DropTable(
            //    name: "Departments");

            //migrationBuilder.DropTable(
            //    name: "Records");

            //migrationBuilder.DropIndex(
            //    name: "IX_AspNetUsers_DepartmentId",
            //    table: "AspNetUsers");

            //migrationBuilder.DropColumn(
            //    name: "DepartmentId",
            //    table: "AspNetUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //    migrationBuilder.AddColumn<int>(
            //        name: "DepartmentId",
            //        table: "AspNetUsers",
            //        type: "int",
            //        nullable: true);

            //    migrationBuilder.CreateTable(
            //        name: "Departments",
            //        columns: table => new
            //        {
            //            Id = table.Column<int>(type: "int", nullable: false)
            //                .Annotation("SqlServer:Identity", "1, 1"),
            //            AddressId = table.Column<int>(type: "int", nullable: false),
            //            DepartmentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //            Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //            ScheduleId = table.Column<int>(type: "int", nullable: false)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_Departments", x => x.Id);
            //        });

            //    migrationBuilder.CreateTable(
            //        name: "Records",
            //        columns: table => new
            //        {
            //            Id = table.Column<int>(type: "int", nullable: false)
            //                .Annotation("SqlServer:Identity", "1, 1"),
            //            DateOfMeeting = table.Column<DateTime>(type: "datetime2", nullable: false),
            //            DateOfRecord = table.Column<DateTime>(type: "datetime2", nullable: false),
            //            DoctorId = table.Column<string>(type: "nvarchar(450)", nullable: true),
            //            PatientId = table.Column<string>(type: "nvarchar(450)", nullable: true),
            //            ServiceId = table.Column<int>(type: "int", nullable: true)
            //        },
            //        constraints: table =>
            //        {
            //            table.PrimaryKey("PK_Records", x => x.Id);
            //            table.ForeignKey(
            //                name: "FK_Records_AspNetUsers_DoctorId",
            //                column: x => x.DoctorId,
            //                principalTable: "AspNetUsers",
            //                principalColumn: "Id",
            //                onDelete: ReferentialAction.Restrict);
            //            table.ForeignKey(
            //                name: "FK_Records_AspNetUsers_PatientId",
            //                column: x => x.PatientId,
            //                principalTable: "AspNetUsers",
            //                principalColumn: "Id",
            //                onDelete: ReferentialAction.Restrict);
            //        });

            //    migrationBuilder.CreateIndex(
            //        name: "IX_AspNetUsers_DepartmentId",
            //        table: "AspNetUsers",
            //        column: "DepartmentId");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Records_DoctorId",
            //        table: "Records",
            //        column: "DoctorId");

            //    migrationBuilder.CreateIndex(
            //        name: "IX_Records_PatientId",
            //        table: "Records",
            //        column: "PatientId");

            //    migrationBuilder.AddForeignKey(
            //        name: "FK_AspNetUsers_Departments_DepartmentId",
            //        table: "AspNetUsers",
            //        column: "DepartmentId",
            //        principalTable: "Departments",
            //        principalColumn: "Id",
            //        onDelete: ReferentialAction.Restrict);
        }
    }
}