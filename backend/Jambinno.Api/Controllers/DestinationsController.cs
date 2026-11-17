
using Jambinno.Api.Data;
using Jambinno.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jambinno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Administrator,Super Administrator")]
public class DestinationsController : ControllerBase
{
    private readonly JambinnoDbContext _context;

    public DestinationsController(JambinnoDbContext context)
    {
        _context = context;
    }

    // GET: api/destinations
    [HttpGet]
    public async Task<IActionResult> GetDestinations()
    {
        var destinations = await _context.Destinations
            .AsNoTracking()
            .Include(d => d.PricingCategory)
            .OrderBy(d => d.SortOrder)
            .ThenBy(d => d.Name)
            .Select(d => new
            {
                d.Id,
                d.PricingCategoryId,
                CategoryName = d.PricingCategory!.Name,
                d.Name,
                d.Slug,
                d.Description,
                d.SortOrder,
                d.IsActive
            })
            .ToListAsync();

        return Ok(destinations);
    }

    // GET: api/destinations/categories
    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _context.PricingCategories
            .AsNoTracking()
            .OrderBy(c => c.SortOrder)
            .Select(c => new
            {
                c.Id,
                c.Name,
                c.IsActive
            })
            .ToListAsync();

        return Ok(categories);
    }

    // POST: api/destinations
    [HttpPost]
    public async Task<IActionResult> CreateDestination(
        [FromBody] DestinationRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Destination name is required.");

        if (string.IsNullOrWhiteSpace(request.Slug))
            return BadRequest("Destination slug is required.");

        var categoryExists = await _context.PricingCategories
            .AnyAsync(c => c.Id == request.PricingCategoryId);

        if (!categoryExists)
            return BadRequest("Selected pricing category does not exist.");

        var slug = request.Slug.Trim().ToLowerInvariant();

        if (await _context.Destinations.AnyAsync(d => d.Slug == slug))
            return Conflict("A destination with this slug already exists.");

        var destination = new Destination
        {
            PricingCategoryId = request.PricingCategoryId,
            Name = request.Name.Trim(),
            Slug = slug,
            Description = request.Description?.Trim(),
            SortOrder = request.SortOrder,
            IsActive = request.IsActive
        };

        _context.Destinations.Add(destination);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetDestinations),
            new { id = destination.Id },
            new
            {
                message = "Destination created successfully.",
                destination.Id
            });
    }

    // PUT: api/destinations/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateDestination(
        int id,
        [FromBody] DestinationRequest request)
    {
        var destination = await _context.Destinations
            .FirstOrDefaultAsync(d => d.Id == id);

        if (destination == null)
            return NotFound("Destination not found.");

        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Destination name is required.");

        if (string.IsNullOrWhiteSpace(request.Slug))
            return BadRequest("Destination slug is required.");

        var categoryExists = await _context.PricingCategories
            .AnyAsync(c => c.Id == request.PricingCategoryId);

        if (!categoryExists)
            return BadRequest("Selected pricing category does not exist.");

        var slug = request.Slug.Trim().ToLowerInvariant();

        var slugExists = await _context.Destinations
            .AnyAsync(d => d.Id != id && d.Slug == slug);

        if (slugExists)
            return Conflict("Another destination already uses this slug.");

        destination.PricingCategoryId = request.PricingCategoryId;
        destination.Name = request.Name.Trim();
        destination.Slug = slug;
        destination.Description = request.Description?.Trim();
        destination.SortOrder = request.SortOrder;
        destination.IsActive = request.IsActive;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Destination updated successfully."
        });
    }

    // PATCH: api/destinations/{id}/status
    [HttpPatch("{id:int}/status")]
    public async Task<IActionResult> UpdateStatus(
        int id,
        [FromBody] DestinationStatusRequest request)
    {
        var destination = await _context.Destinations
            .FirstOrDefaultAsync(d => d.Id == id);

        if (destination == null)
            return NotFound("Destination not found.");

        destination.IsActive = request.IsActive;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Destination status updated successfully.",
            destination.IsActive
        });
    }
}

public class DestinationRequest
{
    public int PricingCategoryId { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Slug { get; set; } = string.Empty;

    public string? Description { get; set; }

    public int SortOrder { get; set; }

    public bool IsActive { get; set; } = true;
}

public class DestinationStatusRequest
{
    public bool IsActive { get; set; }
}
