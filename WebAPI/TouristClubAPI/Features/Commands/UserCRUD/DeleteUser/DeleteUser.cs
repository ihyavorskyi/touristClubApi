﻿using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TouristClubApi.Data;
using TouristClubApi.Data.Models;

namespace MedClinical.API.Features.Commands.UserCRUD.DeleteUser
{
    public class DeleteUser
    {
        public class Command : IRequest<bool>
        {
            public string UserId { get; set; }

            public Command(string userId)
            {
                UserId = userId;
            }
        }

        public class Handler : IRequestHandler<DeleteUser.Command, bool>
        {
            private readonly AppDbContext _context;
            private UserManager<User> _userManager;

            public Handler(AppDbContext context, UserManager<User> userManager)
            {
                _context = context;
                _userManager = userManager;
            }

            public async Task<bool> Handle(Command command, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(command.UserId);
                if (user != null)
                {
                    await _userManager.DeleteAsync(user);
                    return true;
                }
                return false;
            }
        }
    }
}