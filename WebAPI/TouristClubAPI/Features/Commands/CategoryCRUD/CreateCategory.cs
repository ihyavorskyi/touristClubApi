using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.CategoryCRUD
{
    public class CreateCategory
    {
        public class Command : IRequest<bool>
        {
            public Category Category { get; set; }

            public Command(Category category)
            {
                Category = category;
            }
        }

        public class Handler : IRequestHandler<CreateCategory.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                await _context.Categories.AddAsync(request.Category);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}