using System.Collections.Generic;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TouristClubApi.Data.Models;
using TouristClub.API.Data.DTOs;

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
                    var userDto = new UserDto
                    {
                        Id = user.Id,
                        UserName = user.UserName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        Age = user.Age,
                        Role = roles[0]
                    };
                    usersDto.Add(userDto);
                }

                return usersDto;
            }
        }
    }
}