
using Jambinno.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jambinno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PricingController : ControllerBase
{
    private readonly JambinnoDbContext _context;

    public PricingController(JambinnoDbContext context)
    {
        _context = context;
    }

    
// GET: api/pricing/categories
[HttpGet("categories")]
public async Task<IActionResult> GetCategories()
{
    var categories = await _context.PricingCategories
        .AsNoTracking()
        .Where(c => c.IsActive)
        .OrderBy(c => c.SortOrder)
        .Select(c => new
        {
            c.Id,
            c.Name,
            c.Slug,
            c.Eyebrow,
            c.Description,

            Destinations = c.Destinations
                .Where(d => d.IsActive)
                .OrderBy(d => d.SortOrder)
                .Select(d => new
                {
                    d.Id,
                    d.Name,
                    d.Slug,
                    d.Description,

                    PriceBands = d.PriceBands
                        .Where(p => p.IsActive)
                        .OrderBy(p => p.MinimumPassengers)
                        .Select(p => new
                        {
                            p.MinimumPassengers,
                            p.MaximumPassengers,
                            p.Price,
                            p.Currency
                        })
                })
        })
        .ToListAsync();

    return Ok(categories);
}


    // GET: api/pricing/destinations
    [HttpGet("destinations")]
    public async Task<IActionResult> GetDestinations()
    {
        var destinations = await _context.Destinations
            .AsNoTracking()
            .Where(d => d.IsActive && d.PricingCategory!.IsActive)
            .OrderBy(d => d.PricingCategoryId)
            .ThenBy(d => d.SortOrder)
            .Select(d => new
            {
                d.Id,
                d.Name,
                d.Slug,
                d.Description,
                Category = d.PricingCategory!.Name
            })
            .ToListAsync();

        return Ok(destinations);
    }

    // GET: api/pricing/destinations/{id}
    [HttpGet("destinations/{id:int}")]
    public async Task<IActionResult> GetDestination(int id)
    {
        var destination = await _context.Destinations
            .AsNoTracking()
            .Where(d =>
                d.Id == id &&
                d.IsActive &&
                d.PricingCategory!.IsActive)
            .Select(d => new
            {
                d.Id,
                d.Name,
                d.Slug,
                d.Description,
                Category = d.PricingCategory!.Name,
                PriceBands = d.PriceBands
                    .Where(p => p.IsActive)
                    .OrderBy(p => p.MinimumPassengers)
                    .Select(p => new
                    {
                        p.MinimumPassengers,
                        p.MaximumPassengers,
                        p.Price,
                        p.Currency
                    })
            })
            .FirstOrDefaultAsync();

        if (destination == null)
        {
            return NotFound(new
            {
                message = "Destination not found."
            });
        }

        return Ok(destination);
    }

    // GET: api/pricing/estimate?destinationId=21&passengers=4
    [HttpGet("estimate")]
    public async Task<IActionResult> GetEstimate(
        [FromQuery] int destinationId,
        [FromQuery] int passengers)
    {
        if (destinationId <= 0)
        {
            return BadRequest(new
            {
                message = "Please provide a valid destination."
            });
        }

        if (passengers < 1 || passengers > 22)
        {
            return BadRequest(new
            {
                message = "Passenger count must be between 1 and 22."
            });
        }

        var destination = await _context.Destinations
            .AsNoTracking()
            .Where(d =>
                d.Id == destinationId &&
                d.IsActive &&
                d.PricingCategory!.IsActive)
            .Select(d => new
            {
                d.Id,
                d.Name,
                PriceBand = d.PriceBands
                    .Where(p =>
                        p.IsActive &&
                        p.MinimumPassengers <= passengers &&
                        p.MaximumPassengers >= passengers)
                    .Select(p => new
                    {
                        p.MinimumPassengers,
                        p.MaximumPassengers,
                        p.Price,
                        p.Currency
                    })
                    .FirstOrDefault()
            })
            .FirstOrDefaultAsync();

        if (destination == null)
        {
            return NotFound(new
            {
                message = "Destination not found."
            });
        }

        if (destination.PriceBand == null)
        {
            return Ok(new
            {
                destinationId = destination.Id,
                destination = destination.Name,
                passengers,
                hasEstimate = false,
                message = "Request a Quote"
            });
        }

        return Ok(new
        {
            destinationId = destination.Id,
            destination = destination.Name,
            passengers,
            hasEstimate = true,
            minimumPassengers = destination.PriceBand.MinimumPassengers,
            maximumPassengers = destination.PriceBand.MaximumPassengers,
            price = destination.PriceBand.Price,
            currency = destination.PriceBand.Currency
        });
    }
}
