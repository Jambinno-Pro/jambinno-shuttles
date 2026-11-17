using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Jambinno.Api.Migrations
{
    /// <inheritdoc />
    public partial class SeedPricingDestinations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PricingCategories",
                columns: new[] { "Id", "Description", "Eyebrow", "IsActive", "Name", "Slug", "SortOrder" },
                values: new object[,]
                {
                    { 1, null, "CULTURE · COASTLINES · WINE COUNTRY", true, "Cape Town & The Winelands", "cape-town-winelands", 1 },
                    { 2, null, "SCENIC ROADS · BEACHES · NATURAL BEAUTY", true, "Coastal Escapes & Garden Route", "coastal-escapes-garden-route", 2 },
                    { 3, null, "THE WILD SIDE OF THE WESTERN CAPE", true, "Safari & Wildlife Experiences", "safari-wildlife-experiences", 3 }
                });

            migrationBuilder.InsertData(
                table: "Destinations",
                columns: new[] { "Id", "Description", "IsActive", "Name", "PricingCategoryId", "Slug", "SortOrder" },
                values: new object[,]
                {
                    { 1, null, true, "Cape Town", 1, "cape-town", 1 },
                    { 2, null, true, "Stellenbosch", 1, "stellenbosch", 2 },
                    { 3, null, true, "Franschhoek", 1, "franschhoek", 3 },
                    { 4, null, true, "Paarl", 1, "paarl", 4 },
                    { 5, null, true, "Somerset West", 1, "somerset-west", 5 },
                    { 6, null, true, "Constantia", 1, "constantia", 6 },
                    { 7, null, true, "Durbanville", 1, "durbanville", 7 },
                    { 8, null, true, "Gordon's Bay", 1, "gordons-bay", 8 },
                    { 9, null, true, "Hermanus", 2, "hermanus", 1 },
                    { 10, null, true, "Arniston", 2, "arniston", 2 },
                    { 11, null, true, "Cape Agulhas", 2, "cape-agulhas", 3 },
                    { 12, null, true, "Swellendam", 2, "swellendam", 4 },
                    { 13, null, true, "Mossel Bay", 2, "mossel-bay", 5 },
                    { 14, null, true, "George", 2, "george", 6 },
                    { 15, null, true, "Wilderness", 2, "wilderness", 7 },
                    { 16, null, true, "Knysna", 2, "knysna", 8 },
                    { 17, null, true, "Plettenberg Bay", 2, "plettenberg-bay", 9 },
                    { 18, null, true, "Oudtshoorn", 2, "oudtshoorn", 10 },
                    { 19, null, true, "West Coast", 2, "west-coast", 11 },
                    { 20, null, true, "Cederberg", 2, "cederberg", 12 },
                    { 21, null, true, "Aquila Private Game Reserve", 3, "aquila-private-game-reserve", 1 },
                    { 22, null, true, "Inverdoorn Game Reserve", 3, "inverdoorn-game-reserve", 2 },
                    { 23, null, true, "Sanbona Wildlife Reserve", 3, "sanbona-wildlife-reserve", 3 },
                    { 24, null, true, "Gondwana Game Reserve", 3, "gondwana-game-reserve", 4 },
                    { 25, null, true, "Botlierskop Private Game Reserve", 3, "botlierskop-private-game-reserve", 5 },
                    { 26, null, true, "Garden Route Game Lodge", 3, "garden-route-game-lodge", 6 },
                    { 27, null, true, "Buffelsdrift Game Lodge", 3, "buffelsdrift-game-lodge", 7 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Destinations",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "PricingCategories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "PricingCategories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "PricingCategories",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
