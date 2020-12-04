using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs.ArticleDTOs;
using TouristClub.API.Data.DTOs.CommentDTOs;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;
using TouristClubApi.Data.Models;

namespace TouristClub.API.Features.Queries.ExcursionCRUD
{
    public class GetExcursionById
    {
        public class Query : IRequest<Excursion>
        {
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<GetExcursionById.Query, Excursion>
        {
            private readonly AppDbContext _context;
            private readonly UserManager<User> _userManager;

            public Handler(AppDbContext context, UserManager<User> userManager)
            {
                _context = context;
                _userManager = userManager;
            }

            public async Task<Excursion> Handle(Query request, CancellationToken cancellationToken)
            {
                var excursion = await _context.Excursions.Where(a => a.Id == request.Id).Select(ex => new Excursion
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
                }).FirstOrDefaultAsync();
                return excursion;
            }
        }
    }
}