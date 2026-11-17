
using System.ComponentModel.DataAnnotations;

namespace Jambinno.Api.DTOs;

public class CreateBookingDto
{
    [Required]
    [StringLength(150, MinimumLength = 2)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(150)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(30)]
    public string Phone { get; set; } = string.Empty;

    [Required]
    [StringLength(250)]
    public string Pickup { get; set; } = string.Empty;

    [Required]
    [StringLength(250)]
    public string Destination { get; set; } = string.Empty;

    [Required]
    public DateTime TravelDate { get; set; }

    [Required]
    [StringLength(10)]
    public string Passengers { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Service { get; set; } = string.Empty;

    [StringLength(2000)]
    public string? SpecialRequests { get; set; }
}
