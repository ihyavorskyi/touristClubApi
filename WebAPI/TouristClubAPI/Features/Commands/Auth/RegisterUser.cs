﻿using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models.Auth;
using TouristClub.API.Services.Interfaces;
using TouristClubApi.Data;
using TouristClubApi.Data.Models;

namespace TouristClub.API.Features.Commands.Auth
{
    public class RegisterUser
    {
        public class Command : IRequest<AuthResultDto>
        {
            public RegisterRequest Model { get; set; }

            public Command(RegisterRequest request)
            {
                this.Model = request;
            }
        }

        public class Handler : IRequestHandler<RegisterUser.Command, AuthResultDto>
        {
            private readonly AppDbContext _context;
            private readonly UserManager<User> _userManager;
            private readonly IAuthService _authService;

            public Handler(AppDbContext context, UserManager<User> userManager, IAuthService authService)
            {
                _context = context;
                _userManager = userManager;
                _authService = authService;
            }

            public async Task<AuthResultDto> Handle(Command command, CancellationToken cancellationToken)
            {
                var existingUser = await _userManager.FindByEmailAsync(command.Model.Email);
                if (existingUser != null)
                {
                    return new AuthResultDto
                    {
                        Success = false,
                        ErrorMessages = new[] { "User with this email is already exist!" }
                    };
                }
                User user = new User { Email = command.Model.Email, UserName = command.Model.Username, FirstName = command.Model.FirstName, LastName = command.Model.LastName, Age = command.Model.Age, AvatarPath = "Resourses\\Images\\haski.jpg" };
                var result = await _userManager.CreateAsync(user, command.Model.Password);
                if (!result.Succeeded)
                    return new AuthResultDto()
                    {
                        ErrorMessages = result.Errors.Select(i => i.Description)
                    };
                return await _authService.GenerateAuthResultAsync(user);
            }
        }
    }
}