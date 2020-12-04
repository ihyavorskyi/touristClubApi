using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.ArticleCRUD
{
    public class GreateArticle
    {
        public class Command : IRequest<bool>
        {
            public Article Article { get; set; }

            public Command(Article article)
            {
                Article = article;
            }
        }

        public class Handler : IRequestHandler<GreateArticle.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command command, CancellationToken cancellationToken)
            {
                command.Article.Date = DateTime.Now;
                await _context.Articles.AddAsync(command.Article);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}