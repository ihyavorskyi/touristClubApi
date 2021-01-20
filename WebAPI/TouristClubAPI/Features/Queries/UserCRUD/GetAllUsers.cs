using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs;
using TouristClubApi.Data.Models;

namespace MedClinicalAPI.Features.Queries.UserCRUD
{
    public class GetAllUsers
    {
        public class Query : IRequest<IEnumerable<UserDto>>
        {
        }

        public class Handler : IRequestHandler<GetAllUsers.Query, IEnumerable<UserDto>>
        {
            private readonly UserManager<User> _userManager;

            public Handler(UserManager<User> userManager)
            {
                _userManager = userManager;
            }

            public async Task<IEnumerable<UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _userManager.Users.ToListAsync();
                var usersDto = new List<UserDto>();
                foreach (var user in users)
                {
                    var roles = (List<string>)await _userManager.GetRolesAsync(user);

                    var role = "user";
                    if (roles.Count != 0)
                    {
                        role = roles[0];
                    }
                    var userDto = new UserDto
                    {
                        Id = user.Id,
                        UserName = user.UserName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        Age = user.Age,
                        Role = role
                    };
                    usersDto.Add(userDto);
                }

                return usersDto;
            }
        }
    }
}