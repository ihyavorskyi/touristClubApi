﻿using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs;
using TouristClub.API.Features.Commands.UserCRUD.ChangeUserPassword;
using TouristClub.API.Features.Commands.UserCRUD.UpdateUserWithoutPassword;
using TouristClub.API.Features.Queries.UserCRUD.GetShortUserById;
using TouristClub.API.Features.Queries.UserCRUD.GetUserById;

namespace TouristClub.API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
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
    }
}