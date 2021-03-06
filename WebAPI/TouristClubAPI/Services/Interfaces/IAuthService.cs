﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using TouristClub.API.Data.Models.Auth;

namespace TouristClub.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResultDto> GenerateAuthResultAsync(IdentityUser user);

        Task LogOutAsync(HttpContext context);

        ClaimsPrincipal GetClaimsPrincipalFromToken(string token);

        bool ValidateTokenExpiry(string token);
    }
}