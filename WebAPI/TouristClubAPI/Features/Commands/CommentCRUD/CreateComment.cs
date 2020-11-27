using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.CommentCRUD
{
    public class CreateComment
    {
        public class Command : IRequest<bool>
        {
            public Comment Comment { get; set; }

            public Command(Comment сomment)
            {
                Comment = сomment;
            }
        }

        public class Handler : IRequestHandler<CreateComment.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                await _context.Comments.AddAsync(request.Comment);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}