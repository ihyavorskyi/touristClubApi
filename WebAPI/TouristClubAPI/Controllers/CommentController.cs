using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClub.API.Features.Commands.CommentCRUD;

namespace TouristClub.API.Controllers
{
    [Route("api/commments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CommentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(Comment comment)
        {
            var getQuery = new CreateComment.Command(comment);
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }
    }
}