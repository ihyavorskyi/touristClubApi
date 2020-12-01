using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClub.API.Features.Commands.ExcursionCRUD;

namespace TouristClub.API.Controllers
{
    [Route("api/excursions")]
    [ApiController]
    public class ExcursionController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ExcursionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] Excursion excursion)
        {
            var getQuery = new CreateExcursion.Command(excursion);
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }
    }
}