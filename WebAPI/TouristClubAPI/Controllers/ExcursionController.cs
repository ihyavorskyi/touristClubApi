using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClub.API.Features.Commands.ExcursionCRUD;
using TouristClub.API.Features.Queries.ExcursionCRUD;

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

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var query = new GetAllExcursions.Query();
            var res = await _mediator.Send(query);
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var query = new GetExcursionById.Query(id);
            var res = await _mediator.Send(query);
            return Ok(res);
        }

        [HttpGet("image/{id}")]
        public async Task<IActionResult> GetImage(int Id)
        {
            var query = new GetExcursionPhoto.Query(Id);
            var res = await _mediator.Send(query);
            return new FileStreamResult(new FileStream(res, FileMode.Open), "image/jpeg");
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] Excursion excursion)
        {
            var getQuery = new CreateExcursion.Command(excursion);
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] Excursion excursion)
        {
            var command = new UpdateExcursion.Command(excursion);
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var command = new DeleteExcursion.Command(id);
            var res = await _mediator.Send(command);
            return Ok(res);
        }
    }
}