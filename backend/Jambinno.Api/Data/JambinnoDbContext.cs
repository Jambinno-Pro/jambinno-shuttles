
using Jambinno.Api.Models;
using Microsoft.EntityFrameworkCore;


namespace Jambinno.Api.Data;

public class JambinnoDbContext : DbContext
{
    public JambinnoDbContext(
        DbContextOptions<JambinnoDbContext> options)
        : base(options)
    {
    }

    public DbSet<PricingCategory> PricingCategories => Set<PricingCategory>();
    public DbSet<Destination> Destinations => Set<Destination>();
    public DbSet<DestinationPriceBand> DestinationPriceBands => Set<DestinationPriceBand>();
    public DbSet<AdminUser> AdminUsers { get; set; }
    public DbSet<Booking> Bookings => Set<Booking>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PricingCategory>()
            .HasIndex(c => c.Slug)
            .IsUnique();

        modelBuilder.Entity<Destination>()
            .HasIndex(d => d.Slug)
            .IsUnique();

        modelBuilder.Entity<Destination>()
            .HasOne(d => d.PricingCategory)
            .WithMany(c => c.Destinations)
            .HasForeignKey(d => d.PricingCategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<DestinationPriceBand>()
            .HasOne(p => p.Destination)
            .WithMany(d => d.PriceBands)
            .HasForeignKey(p => p.DestinationId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<DestinationPriceBand>()
            .Property(p => p.Price)
            .HasPrecision(18, 2);

        modelBuilder.Entity<DestinationPriceBand>()
            .HasIndex(p => new
            {
                p.DestinationId,
                p.MinimumPassengers,
                p.MaximumPassengers
            })
            .IsUnique();

        modelBuilder.Entity<DestinationPriceBand>()
            .ToTable(t => t.HasCheckConstraint(
                "CK_DestinationPriceBands_Passengers",
                "[MinimumPassengers] >= 1 AND [MaximumPassengers] >= [MinimumPassengers] AND [MaximumPassengers] <= 22"
            ));

        // Initial pricing categories
        modelBuilder.Entity<PricingCategory>().HasData(
            new PricingCategory
            {
                Id = 1,
                Name = "Cape Town & The Winelands",
                Slug = "cape-town-winelands",
                Eyebrow = "CULTURE · COASTLINES · WINE COUNTRY",
                SortOrder = 1,
                IsActive = true
            },
            new PricingCategory
            {
                Id = 2,
                Name = "Coastal Escapes & Garden Route",
                Slug = "coastal-escapes-garden-route",
                Eyebrow = "SCENIC ROADS · BEACHES · NATURAL BEAUTY",
                SortOrder = 2,
                IsActive = true
            },
            new PricingCategory
            {
                Id = 3,
                Name = "Safari & Wildlife Experiences",
                Slug = "safari-wildlife-experiences",
                Eyebrow = "THE WILD SIDE OF THE WESTERN CAPE",
                SortOrder = 3,
                IsActive = true
            }
        );

        // Cape Town & The Winelands
        modelBuilder.Entity<Destination>().HasData(
            new Destination { Id = 1, PricingCategoryId = 1, Name = "Cape Town", Slug = "cape-town", SortOrder = 1, IsActive = true },
            new Destination { Id = 2, PricingCategoryId = 1, Name = "Stellenbosch", Slug = "stellenbosch", SortOrder = 2, IsActive = true },
            new Destination { Id = 3, PricingCategoryId = 1, Name = "Franschhoek", Slug = "franschhoek", SortOrder = 3, IsActive = true },
            new Destination { Id = 4, PricingCategoryId = 1, Name = "Paarl", Slug = "paarl", SortOrder = 4, IsActive = true },
            new Destination { Id = 5, PricingCategoryId = 1, Name = "Somerset West", Slug = "somerset-west", SortOrder = 5, IsActive = true },
            new Destination { Id = 6, PricingCategoryId = 1, Name = "Constantia", Slug = "constantia", SortOrder = 6, IsActive = true },
            new Destination { Id = 7, PricingCategoryId = 1, Name = "Durbanville", Slug = "durbanville", SortOrder = 7, IsActive = true },
            new Destination { Id = 8, PricingCategoryId = 1, Name = "Gordon's Bay", Slug = "gordons-bay", SortOrder = 8, IsActive = true }
        );

        // Coastal Escapes & Garden Route
        modelBuilder.Entity<Destination>().HasData(
            new Destination { Id = 9, PricingCategoryId = 2, Name = "Hermanus", Slug = "hermanus", SortOrder = 1, IsActive = true },
            new Destination { Id = 10, PricingCategoryId = 2, Name = "Arniston", Slug = "arniston", SortOrder = 2, IsActive = true },
            new Destination { Id = 11, PricingCategoryId = 2, Name = "Cape Agulhas", Slug = "cape-agulhas", SortOrder = 3, IsActive = true },
            new Destination { Id = 12, PricingCategoryId = 2, Name = "Swellendam", Slug = "swellendam", SortOrder = 4, IsActive = true },
            new Destination { Id = 13, PricingCategoryId = 2, Name = "Mossel Bay", Slug = "mossel-bay", SortOrder = 5, IsActive = true },
            new Destination { Id = 14, PricingCategoryId = 2, Name = "George", Slug = "george", SortOrder = 6, IsActive = true },
            new Destination { Id = 15, PricingCategoryId = 2, Name = "Wilderness", Slug = "wilderness", SortOrder = 7, IsActive = true },
            new Destination { Id = 16, PricingCategoryId = 2, Name = "Knysna", Slug = "knysna", SortOrder = 8, IsActive = true },
            new Destination { Id = 17, PricingCategoryId = 2, Name = "Plettenberg Bay", Slug = "plettenberg-bay", SortOrder = 9, IsActive = true },
            new Destination { Id = 18, PricingCategoryId = 2, Name = "Oudtshoorn", Slug = "oudtshoorn", SortOrder = 10, IsActive = true },
            new Destination { Id = 19, PricingCategoryId = 2, Name = "West Coast", Slug = "west-coast", SortOrder = 11, IsActive = true },
            new Destination { Id = 20, PricingCategoryId = 2, Name = "Cederberg", Slug = "cederberg", SortOrder = 12, IsActive = true }
        );

        // Safari & Wildlife Experiences
        modelBuilder.Entity<Destination>().HasData(
            new Destination { Id = 21, PricingCategoryId = 3, Name = "Aquila Private Game Reserve", Slug = "aquila-private-game-reserve", SortOrder = 1, IsActive = true },
            new Destination { Id = 22, PricingCategoryId = 3, Name = "Inverdoorn Game Reserve", Slug = "inverdoorn-game-reserve", SortOrder = 2, IsActive = true },
            new Destination { Id = 23, PricingCategoryId = 3, Name = "Sanbona Wildlife Reserve", Slug = "sanbona-wildlife-reserve", SortOrder = 3, IsActive = true },
            new Destination { Id = 24, PricingCategoryId = 3, Name = "Gondwana Game Reserve", Slug = "gondwana-game-reserve", SortOrder = 4, IsActive = true },
            new Destination { Id = 25, PricingCategoryId = 3, Name = "Botlierskop Private Game Reserve", Slug = "botlierskop-private-game-reserve", SortOrder = 5, IsActive = true },
            new Destination { Id = 26, PricingCategoryId = 3, Name = "Garden Route Game Lodge", Slug = "garden-route-game-lodge", SortOrder = 6, IsActive = true },
            new Destination { Id = 27, PricingCategoryId = 3, Name = "Buffelsdrift Game Lodge", Slug = "buffelsdrift-game-lodge", SortOrder = 7, IsActive = true }
        );
    }
}
