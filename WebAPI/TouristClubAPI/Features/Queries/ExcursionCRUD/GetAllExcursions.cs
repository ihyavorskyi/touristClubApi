using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Queries.ExcursionCRUD
{
    public class GetAllExcursions
    {
        public class Query : IRequest<IEnumerable<Excursion>>
        {
        }

        public class Handler : IRequestHandler<GetAllExcursions.Query, IEnumerable<Excursion>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Excursion>> Handle(Query request, CancellationToken cancellationToken)
            {
                var excursions = await _context.Excursions
                    .Select(ex => new Excursion
                    {
                        Id = ex.Id,
                        Name = ex.Name,
                        Description = ex.Description,
                        CategoryId = ex.CategoryId,
                        Category = new Category
                        {
                            Id = ex.Category.Id,
                            Name = ex.Category.Name
                        },
                        Date = ex.Date,
                        Image = ex.Image,
                        Price = ex.Price,
                        NumberOfSeats = ex.NumberOfSeats
                    }).ToListAsync();
                return excursions;
            }
        }
    }
}