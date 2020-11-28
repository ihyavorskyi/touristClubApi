using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Queries.ArticlesCRUD
{
    public class GetAllArticles
    {
        public class Query : IRequest<IEnumerable<ShortArticleDto>>
        {
        }

        public class Handler : IRequestHandler<GetAllArticles.Query, IEnumerable<ShortArticleDto>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<ShortArticleDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var articles = await _context.Articles
                    .Select(ar => new ShortArticleDto
                    {
                        Id = ar.Id,
                        Title = ar.Title,
                        Description = ar.Description,
                        Topic = new Topic
                        {
                            Name = ar.Topic.Name
                        }
                    }).ToListAsync();
                return articles;
            }
        }
    }
}