using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClub.API.Features.Commands.TopicCRUD;

namespace TouristClub.API.Controllers
{
    [Route("api/topics")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TopicController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] Topic topic)
        {
            var getQuery = new CreateTopic.Command(topic);
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] Topic topic)
        {
            var command = new UpdateTopic.Command(topic);
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var getQuery = new DeleteTopic.Command(id);
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }
    }
}