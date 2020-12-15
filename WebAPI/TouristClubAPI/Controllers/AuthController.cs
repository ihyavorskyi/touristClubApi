﻿using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using TouristClub.API.Data.Models.Auth;
using TouristClub.API.Features.Commands.Auth;

namespace TouristClub.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.SelectMany(e => e.Value.Errors.Select(e => e.ErrorMessage)));
            }
            if (model == null)
                return BadRequest("Invalid client request");

            var loginCommand = new LoginUser.Command(model);
            var loginResponse = await _mediator.Send(loginCommand);
            if (!loginResponse.Success)
            {
                return BadRequest(loginResponse.ErrorMessages);
            }
            return Ok(new
            {
                loginResponse.Token,
                loginResponse.RefreshToken
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.SelectMany(e => e.Value.Errors.Select(e => e.ErrorMessage)));
            }

            if (model == null)
                return BadRequest("Invalid client request");

            if (!string.Equals(model.ConfirmedPassword, model.Password))
            {
                return BadRequest(new string[] { "Confirmed password not match" });
            }
            model.Username = model.Username.Trim();
            model.Email = model.Email.Trim();

            var registerRequest = new RegisterUser.Command(model);
            var registerResponse = await _mediator.Send(registerRequest);

            if (!registerResponse.Success)
            {
                return BadRequest(registerResponse.ErrorMessages);
            }
            return Ok(new { Message = "Registered" });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.SelectMany(e => e.Value.Errors.Select(e => e.ErrorMessage)));
            }
            if (model == null)
                return BadRequest("Invalid client request");
            return Ok();
        }
    }
}