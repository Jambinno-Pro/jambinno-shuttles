
namespace Jambinno.Api.Models;

public class PricingCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Slug { get; set; } = string.Empty;

    public string Eyebrow { get; set; } = string.Empty;

    public string? Description { get; set; }

    public int SortOrder { get; set; }

    public bool IsActive { get; set; } = true;

    public ICollection<Destination> Destinations { get; set; }
        = new List<Destination>();
}
