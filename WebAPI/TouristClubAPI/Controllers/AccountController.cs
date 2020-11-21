using TouristClub.API.Data.DTOs;
using TouristClub.API.Features.Commands.Roles;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace TouristClub.API.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("roles")]
        public async Task<IActionResult> CreateAsync(AddToRoleDto model)
        {
            var getQuery = new AddUserToRole.Command(model);
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }
    }
}