
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Jambinno.Api.Data;
using Jambinno.Api.DTOs;
using Jambinno.Api.Models;
using Jambinno.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Jambinno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly JambinnoDbContext _context;
    private readonly PasswordService _passwordService;
    private readonly IConfiguration _configuration;

    public AuthController(
        JambinnoDbContext context,
        PasswordService passwordService,
        IConfiguration configuration)
    {
        _context = context;
        _passwordService = passwordService;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        AdminRegisterRequest request)
    {
        var fullName = request.FullName.Trim();
        var email = request.Email.Trim().ToLowerInvariant();

        if (string.IsNullOrWhiteSpace(fullName) ||
            string.IsNullOrWhiteSpace(email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new
            {
                message = "All fields are required."
            });
        }

        if (request.Password.Length < 12)
        {
            return BadRequest(new
            {
                message = "Password must contain at least 12 characters."
            });
        }

        if (!new System.ComponentModel.DataAnnotations.EmailAddressAttribute()
            .IsValid(email))
        {
            return BadRequest(new
            {
                message = "Please enter a valid email address."
            });
        }

        if (await _context.AdminUsers.AnyAsync())
        {
            return Conflict(new
            {
                message = "Administrator registration is closed."
            });
        }

        var admin = new AdminUser
        {
            FullName = fullName,
            Email = email,
            PasswordHash = _passwordService.HashPassword(request.Password),
            Role = "Admin",
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.AdminUsers.Add(admin);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Administrator account created successfully. Please log in."
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(AdminLoginRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        var admin = await _context.AdminUsers
            .FirstOrDefaultAsync(a =>
                a.Email.ToLower() == email &&
                a.IsActive);

        if (admin == null ||
            !_passwordService.VerifyPassword(
                admin.PasswordHash,
                request.Password))
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        var key = new SymmetricSecurityKey(
            Convert.FromBase64String(_configuration["Jwt:Key"]!)
        );

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256
        );

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString()),
            new Claim(ClaimTypes.Name, admin.FullName),
            new Claim(ClaimTypes.Email, admin.Email),
            new Claim(ClaimTypes.Role, admin.Role)
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: credentials
        );

        admin.LastLoginAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            admin = new
            {
                admin.Id,
                admin.FullName,
                admin.Email,
                admin.Role
            }
        });
    }
}
