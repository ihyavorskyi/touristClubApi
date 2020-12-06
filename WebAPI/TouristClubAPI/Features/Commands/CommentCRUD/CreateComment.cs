using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs.CommentDTOs;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.CommentCRUD
{
    public class CreateComment
    {
        public class Command : IRequest<bool>
        {
            public CreateCommentRequest Comment { get; set; }

            public Command(CreateCommentRequest сomment)
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
                var comment = new Comment
                {
                    Id = request.Comment.Id,
                    Text = request.Comment.Text,
                    ArticleId = request.Comment.ArticleId,
                    AuthorId = request.Comment.AuthorId,
                    Date = DateTime.Now
                };
                await _context.Comments.AddAsync(comment);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}