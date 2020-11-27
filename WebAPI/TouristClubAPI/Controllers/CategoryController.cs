using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TouristClub.API.Data.Models;
using TouristClub.API.Features.Commands.CategoryCRUD;

namespace TouristClub.API.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(Category category)
        {
            var getQuery = new CreateCategory.Command(category);
            var res = await _mediator.Send(getQuery);
            return Ok(res);
        }
    }
}