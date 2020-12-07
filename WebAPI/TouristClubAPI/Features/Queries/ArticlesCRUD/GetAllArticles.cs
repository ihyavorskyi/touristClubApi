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
        public class Query : IRequest<IEnumerable<Article>>
        {
        }

        public class Handler : IRequestHandler<GetAllArticles.Query, IEnumerable<Article>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Article>> Handle(Query request, CancellationToken cancellationToken)
            {
                var articles = await _context.Articles
                    .Select(ar => new Article
                    {
                        Id = ar.Id,
                        Title = ar.Title,
                        Description = ar.Description,
                        Date = ar.Date,
                        Text = ar.Text,
                        Image = ar.Image,
                        TopicId = ar.TopicId,
                        Topic = new Topic
                        {
                            Id = ar.Topic.Id,
                            Name = ar.Topic.Name
                        }
                    }).ToListAsync();
                return articles;
            }
        }
    }
}