using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs;
using TouristClubApi.Data.Models;
using TouristClubApi.Exceptions;

namespace TouristClub.API.Features.Queries.RolesCRUD
{
    public class GetIsInRole
    {
        public class Query : IRequest<List<string>>
        {
            public string Id { get; set; }

            public Query(string id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<GetIsInRole.Query, List<string>>
        {
            private readonly UserManager<User> _userManager;
            private readonly RoleManager<IdentityRole> _roleManager;

            public Handler(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
            {
                _userManager = userManager;
                _roleManager = roleManager;
            }

            public async Task<List<string>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(request.Id);
                if (user == null)
                    throw new BadRequestException("This user does not exist!");

                var res = (List<string>)await _userManager.GetRolesAsync(user);
                return res;
            }
        }
    }
}