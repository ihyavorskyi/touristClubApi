using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.ArticleCRUD
{
    public class UpdateArticle
    {
        public class Command : IRequest<bool>
        {
            public Article Article { get; set; }

            public Command(Article article)
            {
                Article = article;
            }
        }

        public class Handler : IRequestHandler<UpdateArticle.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command command, CancellationToken cancellationToken)
            {
                var article = await _context.Articles.FindAsync(command.Article.Id);
                if (article != null)
                {
                    article.Title = command.Article.Title;
                    article.Text = command.Article.Text;
                    article.Description = command.Article.Description;
                    article.Image = command.Article.Image;
                    article.TopicId = command.Article.TopicId;
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
        }
    }
}