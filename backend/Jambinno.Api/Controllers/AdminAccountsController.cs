
using System.Security.Claims;
using Jambinno.Api.Data;
using Jambinno.Api.Models;
using Jambinno.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jambinno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Super Administrator")]
public class AdminAccountsController : ControllerBase
{
    private readonly JambinnoDbContext _context;
    private readonly PasswordService _passwordService;

    private static readonly string[] AllowedRoles =
    {
        "Super Administrator",
        "Administrator",
        "Manager"
    };

    public AdminAccountsController(
        JambinnoDbContext context,
        PasswordService passwordService)
    {
        _context = context;
        _passwordService = passwordService;
    }

    // GET: api/adminaccounts
    [HttpGet]
    public async Task<IActionResult> GetAccounts()
    {
        var accounts = await _context.AdminUsers
            .AsNoTracking()
            .OrderBy(a => a.FullName)
            .Select(a => new
            {
                a.Id,
                a.FullName,
                a.Email,
                a.Role,
                a.IsActive,
                a.CreatedAt,
                a.LastLoginAt
            })
            .ToListAsync();

        return Ok(accounts);
    }

    // POST: api/adminaccounts
    [HttpPost]
    public async Task<IActionResult> CreateAccount(
        [FromBody] CreateAccountRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FullName) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new
            {
                message = "Full name, email and password are required."
            });
        }

        var email = request.Email.Trim().ToLowerInvariant();
        var fullName = request.FullName.Trim();

        if (request.Password.Length < 12)
        {
            return BadRequest(new
            {
                message = "Password must contain at least 12 characters."
            });
        }

        if (!AllowedRoles.Contains(request.Role))
        {
            return BadRequest(new
            {
                message = "Please select a valid account role."
            });
        }

        var emailExists = await _context.AdminUsers
            .AnyAsync(a => a.Email.ToLower() == email);

        if (emailExists)
        {
            return Conflict(new
            {
                message = "An account with this email address already exists."
            });
        }

        var account = new AdminUser
        {
            FullName = fullName,
            Email = email,
            PasswordHash = _passwordService.HashPassword(request.Password),
            Role = request.Role,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.AdminUsers.Add(account);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Account created successfully.",
            account = new
            {
                account.Id,
                account.FullName,
                account.Email,
                account.Role,
                account.IsActive,
                account.CreatedAt
            }
        });
    }

    // PUT: api/adminaccounts/1
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateAccount(
        int id,
        [FromBody] UpdateAccountRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FullName) ||
            string.IsNullOrWhiteSpace(request.Email))
        {
            return BadRequest(new
            {
                message = "Full name and email are required."
            });
        }

        if (!AllowedRoles.Contains(request.Role))
        {
            return BadRequest(new
            {
                message = "Please select a valid account role."
            });
        }

        var account = await _context.AdminUsers
            .FirstOrDefaultAsync(a => a.Id == id);

        if (account == null)
            return NotFound(new { message = "Account not found." });

        var currentUserId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        // Prevent the signed-in Super Administrator from demoting themselves.
        if (currentUserId == id.ToString() &&
            request.Role != "Super Administrator")
        {
            return BadRequest(new
            {
                message = "You cannot remove your own Super Administrator role."
            });
        }

        var email = request.Email.Trim().ToLowerInvariant();

        var emailExists = await _context.AdminUsers
            .AnyAsync(a => a.Id != id &&
                           a.Email.ToLower() == email);

        if (emailExists)
        {
            return Conflict(new
            {
                message = "Another account already uses this email address."
            });
        }

        account.FullName = request.FullName.Trim();
        account.Email = email;
        account.Role = request.Role;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Account updated successfully."
        });
    }

    // PATCH: api/adminaccounts/1/status
    [HttpPatch("{id:int}/status")]
    public async Task<IActionResult> UpdateAccountStatus(
        int id,
        [FromBody] AccountStatusRequest request)
    {
        var account = await _context.AdminUsers
            .FirstOrDefaultAsync(a => a.Id == id);

        if (account == null)
            return NotFound(new { message = "Account not found." });

        var currentUserId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        // Prevent the signed-in administrator from deactivating themselves.
        if (currentUserId == id.ToString() && !request.IsActive)
        {
            return BadRequest(new
            {
                message = "You cannot deactivate your own account."
            });
        }

        // Never allow the last active Super Administrator to be deactivated.
        if (!request.IsActive &&
            account.Role == "Super Administrator" &&
            account.IsActive)
        {
            var activeSuperAdmins = await _context.AdminUsers
                .CountAsync(a =>
                    a.Role == "Super Administrator" &&
                    a.IsActive);

            if (activeSuperAdmins <= 1)
            {
                return BadRequest(new
                {
                    message = "The last active Super Administrator cannot be deactivated."
                });
            }
        }

        account.IsActive = request.IsActive;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = request.IsActive
                ? "Account activated successfully."
                : "Account deactivated successfully.",
            account.IsActive
        });
    }

    public class CreateAccountRequest
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = "Manager";
    }

    public class UpdateAccountRequest
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "Manager";
    }

    public class AccountStatusRequest
    {
        public bool IsActive { get; set; }
    }
}
