using MedClinical.API.Features.Commands.UserCRUD;
using MedClinical.API.Features.Commands.UserCRUD.DeleteUser;
using MedClinicalAPI.Features.Queries.UserCRUD;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs;
using TouristClub.API.Features.Commands.UserCRUD.ChangeUserPassword;
using TouristClub.API.Features.Commands.UserCRUD.UpdateUserWithoutPassword;
using TouristClub.API.Features.Queries.TicketCRUD;
using TouristClub.API.Features.Queries.UserCRUD.GetShortUserById;
using TouristClub.API.Features.Queries.UserCRUD.GetUserById;

namespace TouristClub.API.Controllers
{
    [EnableCors]
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var getQuery = new GetAllUsers.Query();
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(string id)
        {
            var getQuery = new GetUserById.Query(id);
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }

        [HttpGet("{id}/short")]
        public async Task<IActionResult> GetShortAsync(string id)
        {
            var getQuery = new GetShortUserById.Query(id);
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }

        [HttpGet("tickets/{id}")]
        public async Task<IActionResult> GetUserTicketsAsync(string id)
        {
            var getQuery = new GetUserTickets.Query(id);
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(UserDto model)
        {
            var updCommand = new CreateUser.Command(model);
            var res = await _mediator.Send(updCommand);
            return Ok(res);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync(UserDto model)
        {
            var updCommand = new UpdateUserWithoutPassword.Command(model);
            var res = await _mediator.Send(updCommand);
            return Ok(res);
        }

        [HttpPut("password")]
        public async Task<IActionResult> ChangePasswordAsync(UserChangePasswordDto model)
        {
            var changePassword = new ChangeUserPassword.Command(model);
            var res = await _mediator.Send(changePassword);
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            var delCommand = new DeleteUser.Command(id);
            var res = await _mediator.Send(delCommand);
            return Ok(res);
        }
    }
}