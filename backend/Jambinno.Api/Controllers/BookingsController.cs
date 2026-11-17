
using Jambinno.Api.Data;
using Jambinno.Api.DTOs;
using Jambinno.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jambinno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly JambinnoDbContext _context;

    public BookingsController(JambinnoDbContext context)
    {
        _context = context;
    }

    // =========================================
    // CREATE PUBLIC BOOKING
    // POST: api/bookings
    // =========================================

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> CreateBooking(
        [FromBody] CreateBookingDto request)
    {
        if (request.TravelDate.Date < DateTime.UtcNow.Date)
        {
            return BadRequest(new
            {
                message = "Travel date cannot be in the past."
            });
        }

        var passengers = request.Passengers?.Trim();

        if (string.IsNullOrWhiteSpace(passengers) ||
            !(passengers == "21+" ||
              (int.TryParse(passengers, out var count) &&
               count >= 1 && count <= 20)))
        {
            return BadRequest(new
            {
                message = "Please select a valid passenger count."
            });
        }

        var booking = new Booking
        {
            BookingReference = $"TJ-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString("N")[..6].ToUpper()}",
            FullName = request.FullName.Trim(),
            Email = request.Email.Trim(),
            Phone = request.Phone.Trim(),
            Pickup = request.Pickup.Trim(),
            Destination = request.Destination.Trim(),
            TravelDate = request.TravelDate,
            Passengers = passengers,
            Service = request.Service.Trim(),
            SpecialRequests = request.SpecialRequests?.Trim(),
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        _context.Bookings.Add(booking);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Your booking request has been received successfully.",
            bookingReference = booking.BookingReference,
            status = booking.Status
        });
    }

    // =========================================
    // GET ALL BOOKINGS - ADMIN
    // GET: api/bookings
    // =========================================

   [Authorize(Roles = "Manager,Administrator,Super Administrator")]
    [HttpGet]
    public async Task<IActionResult> GetBookings()
    {
        var bookings = await _context.Bookings
            .AsNoTracking()
            .OrderByDescending(b => b.CreatedAt)
            .Select(b => new
            {
                b.Id,
                b.BookingReference,
                b.FullName,
                b.Email,
                b.Phone,
                b.Pickup,
                b.Destination,
                b.TravelDate,
                b.Passengers,
                b.Service,
                b.SpecialRequests,
                b.Status,
                b.CreatedAt
            })
            .ToListAsync();

        return Ok(bookings);
    }
}
