using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Thesis.API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DHTs",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    humidity = table.Column<string>(nullable: false),
                    key = table.Column<string>(nullable: false),
                    temperature = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DHTs", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Pins",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    key = table.Column<string>(nullable: false),
                    pin = table.Column<int>(nullable: false),
                    state = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pins", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RFID = table.Column<string>(maxLength: 8, nullable: true),
                    email = table.Column<string>(maxLength: 40, nullable: true),
                    gender = table.Column<string>(maxLength: 10, nullable: true),
                    name = table.Column<string>(maxLength: 20, nullable: true),
                    password = table.Column<string>(maxLength: 40, nullable: true),
                    role = table.Column<string>(maxLength: 10, nullable: true),
                    username = table.Column<string>(maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DHTs");

            migrationBuilder.DropTable(
                name: "Pins");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
