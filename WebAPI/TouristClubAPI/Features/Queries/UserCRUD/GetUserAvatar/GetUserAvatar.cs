﻿using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;
using TouristClubApi.Data.Models;
using TouristClubApi.Exceptions;

namespace MedClinical.API.Features.Queries.GetUserAvatar
{
    public class GetUserAvatar
    {
        public class Query : IRequest<string>
        {
            public string Id { get; set; }

            public Query(string id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<GetUserAvatar.Query, string>
        {
            private readonly UserManager<User> _userManager;

            public Handler(UserManager<User> userManager)
            {
                _userManager = userManager;
            }

            public async Task<string> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(request.Id);
                if (user == null)
                    throw new NotFoundException("User not found");

                return user.AvatarPath;
            }
        }
    }
}