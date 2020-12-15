using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Queries.CategoryCRUD
{
    public class GetAllCategory
    {
        public class Query : IRequest<IEnumerable<Category>>
        {
        }

        public class Handler : IRequestHandler<GetAllCategory.Query, IEnumerable<Category>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Category>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categories = await _context.Categories
                    .Select(cat => new Category
                    {
                        Id = cat.Id,
                        Name = cat.Name,
                        Excursions = cat.Excursions.Select(ex => new Excursion
                        {
                            Id = ex.Id,
                            Name = ex.Name,
                            Price = ex.Price,
                            Date = ex.Date
                        }).ToList()
                    }).ToListAsync();
                return categories;
            }
        }
    }
}