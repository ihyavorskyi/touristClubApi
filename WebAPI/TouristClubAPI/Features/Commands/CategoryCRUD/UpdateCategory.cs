using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.CategoryCRUD
{
    public class UpdateCategory
    {
        public class Command : IRequest<bool>
        {
            public Category Category { get; set; }

            public Command(Category category)
            {
                Category = category;
            }
        }

        public class Handler : IRequestHandler<UpdateCategory.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories.FindAsync(request.Category.Id);
                if (category != null)
                {
                    category.Name = request.Category.Name;
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
        }
    }
}