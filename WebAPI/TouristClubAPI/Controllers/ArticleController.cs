using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using TouristClub.API.Features.Queries.ArticlesCRUD;

namespace TouristClub.API.Controllers
{
    [Route("api/articles")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ArticleController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var getQuery = new GetAllArticles.Query();
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var getQuery = new GetArticleById.Query(id);
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }

        [HttpGet("image/{id}")]
        public async Task<IActionResult> GetImage(int Id)
        {
            var query = new GetArticlePhoto.Query(Id);
            var res = await _mediator.Send(query);

            return new FileStreamResult(new FileStream(res, FileMode.Open), "image/jpeg");
        }
    }
}