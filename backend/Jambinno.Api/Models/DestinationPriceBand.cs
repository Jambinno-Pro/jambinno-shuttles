
namespace Jambinno.Api.Models;

public class DestinationPriceBand
{
    public int Id { get; set; }

    public int DestinationId { get; set; }

    public Destination? Destination { get; set; }

    public int MinimumPassengers { get; set; }

    public int MaximumPassengers { get; set; }

    public decimal Price { get; set; }

    public string Currency { get; set; } = "ZAR";

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }
}
