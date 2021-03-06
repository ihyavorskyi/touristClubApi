﻿using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs;
using TouristClubApi.Data.Models;

namespace TouristClub.API.Features.Queries.UserCRUD.GetUserById
{
    public class GetUserById
    {
        public class Query : IRequest<UserDto>
        {
            public string Id { get; set; }

            public Query(string id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<GetUserById.Query, UserDto>
        {
            private readonly UserManager<User> _userManager;

            public Handler(UserManager<User> userManager)
            {
                _userManager = userManager;
            }

            public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(request.Id);
                UserDto model = new UserDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Age = user.Age
                };

                return model;
            }
        }
    }
}