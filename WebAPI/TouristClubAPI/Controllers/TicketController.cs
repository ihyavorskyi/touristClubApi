using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClub.API.Features.Commands.TicketCRUD;

namespace TouristClub.API.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TicketController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> GreateAsync([FromBody] Ticket ticket)
        {
            var command = new GreateTicket.Command(ticket);
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var command = new DeleteTicket.Command(id);
            var res = await _mediator.Send(command);
            return Ok(res);
        }
    }
}