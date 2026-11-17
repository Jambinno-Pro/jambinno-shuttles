
namespace Jambinno.Api.Models;

public class Destination
{
    public int Id { get; set; }

    public int PricingCategoryId { get; set; }

    public PricingCategory? PricingCategory { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Slug { get; set; } = string.Empty;

    public string? Description { get; set; }

    public int SortOrder { get; set; }

    public bool IsActive { get; set; } = true;

    public ICollection<DestinationPriceBand> PriceBands { get; set; }
        = new List<DestinationPriceBand>();
}
