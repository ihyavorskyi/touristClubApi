using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClub.API.Features.Commands.ArticleCRUD;
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

        [HttpPost("upload"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadImage()
        {
            var file = Request.Form.Files[0];
            var id = Request.Form["article"];
            var command = new UploadArticleImage.Command(file, Int32.Parse(id));
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> GreateAsync([FromBody] Article article)
        {
            var command = new GreateArticle.Command(article);
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] Article article)
        {
            Console.WriteLine(article.Id);
            var command = new UpdateArticle.Command(article);
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var command = new DeleteArticle.Command(id);
            var res = await _mediator.Send(command);
            return Ok(res);
        }
    }
}