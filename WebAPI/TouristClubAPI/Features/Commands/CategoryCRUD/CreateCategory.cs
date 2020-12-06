using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;
using TouristClubApi.Helpers;

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

            public async Task<bool> Handle(Command command, CancellationToken cancellationToken)
            {
                ValidationHelper.IsCategoryExist(command.Category.Name, _context);
                await _context.Categories.AddAsync(command.Category);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}