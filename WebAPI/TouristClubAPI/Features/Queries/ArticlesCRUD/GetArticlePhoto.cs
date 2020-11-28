using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClubApi.Data;
using TouristClubApi.Exceptions;

namespace TouristClub.API.Features.Queries.ArticlesCRUD
{
    public class GetArticlePhoto
    {
        public class Query : IRequest<string>
        {
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<GetArticlePhoto.Query, string>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<string> Handle(Query request, CancellationToken cancellationToken)
            {
                var article = await _context.Articles.Where(ar => ar.Id == request.Id).FirstOrDefaultAsync();
                if (article == null)
                    throw new NotFoundException("Article not found");

                return article.Image;
            }
        }
    }
}