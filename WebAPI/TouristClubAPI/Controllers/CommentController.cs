using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs.CommentDTOs;
using TouristClub.API.Data.Models;
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
            Console.WriteLine(comment.Id);
            Console.WriteLine(comment.Text);
            Console.WriteLine(comment.ArticleId);
            Console.WriteLine(comment.AuthorId);

            var getQuery = new CreateComment.Command(comment);
            var res = await _mediator.Send(getQuery);
            return Ok(true);
        }
    }
}