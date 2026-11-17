
using Jambinno.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jambinno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Manager,Administrator,Super Administrator")]
public class DashboardController : ControllerBase
{
    private readonly JambinnoDbContext _context;

    public DashboardController(JambinnoDbContext context)
    {
        _context = context;
    }

    // GET: api/dashboard/overview
    [HttpGet("overview")]
    public async Task<IActionResult> GetOverview()
    {
        var totalCategories = await _context.PricingCategories
            .CountAsync();

        var activeCategories = await _context.PricingCategories
            .CountAsync(c => c.IsActive);

        var totalDestinations = await _context.Destinations
            .CountAsync();

        var activeDestinations = await _context.Destinations
            .CountAsync(d => d.IsActive);

        var inactiveDestinations = await _context.Destinations
            .CountAsync(d => !d.IsActive);

        var totalPriceBands = await _context.DestinationPriceBands
            .CountAsync();

        var activePriceBands = await _context.DestinationPriceBands
            .CountAsync(p => p.IsActive);

        var inactivePriceBands = await _context.DestinationPriceBands
            .CountAsync(p => !p.IsActive);

        var totalAdministrators = await _context.AdminUsers
            .CountAsync();

        return Ok(new
        {
            categories = new
            {
                total = totalCategories,
                active = activeCategories
            },

            destinations = new
            {
                total = totalDestinations,
                active = activeDestinations,
                inactive = inactiveDestinations
            },

            passengerPricing = new
            {
                total = totalPriceBands,
                active = activePriceBands,
                inactive = inactivePriceBands
            },

            administrators = new
            {
                total = totalAdministrators
            }
        });
    }
}
