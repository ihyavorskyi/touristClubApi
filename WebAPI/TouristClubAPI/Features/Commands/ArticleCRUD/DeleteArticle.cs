using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.ArticleCRUD
{
    public class DeleteArticle
    {
        public class Command : IRequest<bool>
        {
            public int Id { get; set; }

            public Command(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<DeleteArticle.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command command, CancellationToken cancellationToken)
            {
                var result = await _context.Articles.FindAsync(command.Id);
                if (result != null)
                {
                    _context.Articles.Remove(result);
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
        }
    }
}