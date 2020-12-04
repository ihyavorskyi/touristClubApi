using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.ExcursionCRUD
{
    public class UpdateExcursion
    {
        public class Command : IRequest<bool>
        {
            public Excursion Excursion { get; set; }

            public Command(Excursion excursion)
            {
                Excursion = excursion;
            }
        }

        public class Handler : IRequestHandler<UpdateExcursion.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command command, CancellationToken cancellationToken)
            {
                var excursion = await _context.Excursions.FindAsync(command.Excursion.Id);
                if (excursion != null)
                {
                    excursion.Name = command.Excursion.Name;
                    excursion.NumberOfSeats = command.Excursion.NumberOfSeats;
                    excursion.Price = command.Excursion.Price;
                    excursion.Image = command.Excursion.Image;
                    excursion.Description = command.Excursion.Description;
                    excursion.Date = command.Excursion.Date;
                    excursion.CategoryId = command.Excursion.CategoryId;
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
        }
    }
}