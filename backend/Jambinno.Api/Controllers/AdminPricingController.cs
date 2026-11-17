
using Jambinno.Api.Data;
using Jambinno.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jambinno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Adminstrator,Super Administrator")]
public class AdminPricingController : ControllerBase
{
    private readonly JambinnoDbContext _context;

    public AdminPricingController(JambinnoDbContext context)
    {
        _context = context;
    }

    // GET: api/adminpricing/destinations
    [HttpGet("destinations")]
    public async Task<IActionResult> GetDestinations()
    {
        var destinations = await _context.Destinations
            .AsNoTracking()
            .OrderBy(d => d.PricingCategoryId)
            .ThenBy(d => d.SortOrder)
            .Select(d => new
            {
                d.Id,
                d.Name,
                d.IsActive,
                CategoryName = d.PricingCategory!.Name
            })
            .ToListAsync();

        return Ok(destinations);
    }

    // GET: api/adminpricing/destinations/1/price-ranges
    [HttpGet("destinations/{destinationId:int}/price-ranges")]
    public async Task<IActionResult> GetPriceRanges(int destinationId)
    {
        var destination = await _context.Destinations
            .AsNoTracking()
            .Where(d => d.Id == destinationId)
            .Select(d => new
            {
                d.Id,
                d.Name,
                d.IsActive
            })
            .FirstOrDefaultAsync();

        if (destination == null)
            return NotFound(new { message = "Destination not found." });

        var priceRanges = await _context.DestinationPriceBands
            .AsNoTracking()
            .Where(p => p.DestinationId == destinationId)
            .OrderBy(p => p.MinimumPassengers)
            .Select(p => new
            {
                p.Id,
                p.DestinationId,
                p.MinimumPassengers,
                p.MaximumPassengers,
                p.Price,
                p.Currency,
                p.IsActive
            })
            .ToListAsync();

        return Ok(new
        {
            destination,
            priceRanges
        });
    }

    // POST: api/adminpricing/price-ranges
    [HttpPost("price-ranges")]
    public async Task<IActionResult> CreatePriceRange(
        [FromBody] PriceRangeRequest request)
    {
        if (request.MinimumPassengers < 1 ||
            request.MaximumPassengers < request.MinimumPassengers ||
            request.MaximumPassengers > 22 ||
            request.Price < 0)
        {
            return BadRequest(new
            {
                message = "Please provide a valid passenger range and price."
            });
        }

        var destinationExists = await _context.Destinations
            .AnyAsync(d => d.Id == request.DestinationId);

        if (!destinationExists)
            return NotFound(new { message = "Destination not found." });

        var duplicate = await _context.DestinationPriceBands
            .AnyAsync(p =>
                p.DestinationId == request.DestinationId &&
                p.MinimumPassengers == request.MinimumPassengers &&
                p.MaximumPassengers == request.MaximumPassengers);

        if (duplicate)
            return Conflict(new
            {
                message = "This passenger range already exists for this destination."
            });

        var priceRange = new DestinationPriceBand
        {
            DestinationId = request.DestinationId,
            MinimumPassengers = request.MinimumPassengers,
            MaximumPassengers = request.MaximumPassengers,
            Price = request.Price,
            Currency = "ZAR",
            IsActive = true
        };

        _context.DestinationPriceBands.Add(priceRange);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetPriceRanges),
            new { destinationId = priceRange.DestinationId },
            new
            {
                message = "Passenger price range created successfully.",
                id = priceRange.Id
            });
    }

    // PUT: api/adminpricing/price-ranges/1
    [HttpPut("price-ranges/{id:int}")]
    public async Task<IActionResult> UpdatePriceRange(
        int id,
        [FromBody] PriceRangeRequest request)
    {
        if (request.MinimumPassengers < 1 ||
            request.MaximumPassengers < request.MinimumPassengers ||
            request.MaximumPassengers > 22 ||
            request.Price < 0)
        {
            return BadRequest(new
            {
                message = "Please provide a valid passenger range and price."
            });
        }

        var priceRange = await _context.DestinationPriceBands
            .FirstOrDefaultAsync(p => p.Id == id);

        if (priceRange == null)
            return NotFound(new { message = "Price range not found." });

        if (priceRange.DestinationId != request.DestinationId)
            return BadRequest(new
            {
                message = "The destination cannot be changed when editing a price range."
            });

        var duplicate = await _context.DestinationPriceBands
            .AnyAsync(p =>
                p.Id != id &&
                p.DestinationId == request.DestinationId &&
                p.MinimumPassengers == request.MinimumPassengers &&
                p.MaximumPassengers == request.MaximumPassengers);

        if (duplicate)
            return Conflict(new
            {
                message = "This passenger range already exists for this destination."
            });

        priceRange.MinimumPassengers = request.MinimumPassengers;
        priceRange.MaximumPassengers = request.MaximumPassengers;
        priceRange.Price = request.Price;
        priceRange.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Price range updated successfully."
        });
    }

    // PATCH: api/adminpricing/price-ranges/1/status
    [HttpPatch("price-ranges/{id:int}/status")]
    public async Task<IActionResult> UpdatePriceRangeStatus(
        int id,
        [FromBody] PriceRangeStatusRequest request)
    {
        var priceRange = await _context.DestinationPriceBands
            .FirstOrDefaultAsync(p => p.Id == id);

        if (priceRange == null)
            return NotFound(new { message = "Price range not found." });

        priceRange.IsActive = request.IsActive;
        priceRange.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = request.IsActive
                ? "Price range activated successfully."
                : "Price range deactivated successfully.",
            priceRange.IsActive
        });
    }

    public class PriceRangeRequest
    {
        public int DestinationId { get; set; }
        public int MinimumPassengers { get; set; }
        public int MaximumPassengers { get; set; }
        public decimal Price { get; set; }
    }

    public class PriceRangeStatusRequest
    {
        public bool IsActive { get; set; }
    }
}
