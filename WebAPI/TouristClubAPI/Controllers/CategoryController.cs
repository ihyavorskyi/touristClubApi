using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClub.API.Features.Commands.CategoryCRUD;
using TouristClub.API.Features.Queries.CategoryCRUD;

namespace TouristClub.API.Controllers
{
    [EnableCors]
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var getQuery = new GetAllCategory.Query();
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] Category category)
        {
            var getQuery = new CreateCategory.Command(category);
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] Category category)
        {
            var command = new UpdateCategory.Command(category);
            var res = await _mediator.Send(command);
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var command = new DeleteCategory.Command(id);
            var res = await _mediator.Send(command);
            return Ok(res);
        }
    }
}