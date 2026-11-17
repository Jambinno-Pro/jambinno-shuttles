
using System.ComponentModel.DataAnnotations;

namespace Jambinno.Api.Models;

public class Booking
{
    public int Id { get; set; }

    [Required]
    [MaxLength(30)]
    public string BookingReference { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(30)]
    public string Phone { get; set; } = string.Empty;

    [Required]
    [MaxLength(250)]
    public string Pickup { get; set; } = string.Empty;

    [Required]
    [MaxLength(250)]
    public string Destination { get; set; } = string.Empty;

    [Required]
    public DateTime TravelDate { get; set; }

    [Required]
    [MaxLength(10)]
    public string Passengers { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Service { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? SpecialRequests { get; set; }

    [Required]
    [MaxLength(30)]
    public string Status { get; set; } = "Pending";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
