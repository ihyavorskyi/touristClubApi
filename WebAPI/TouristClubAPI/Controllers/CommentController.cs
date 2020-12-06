using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs.CommentDTOs;
using TouristClub.API.Features.Commands.CommentCRUD;

namespace TouristClub.API.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CommentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CreateCommentRequest comment)
        {
            var getQuery = new CreateComment.Command(comment);
            var res = await _mediator.Send(getQuery);
            return Ok(true);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleeAsync(int id)
        {
            var getQuery = new DeleteComment.Command(id);
            var res = await _mediator.Send(getQuery);
            return Ok(true);
        }
    }
}