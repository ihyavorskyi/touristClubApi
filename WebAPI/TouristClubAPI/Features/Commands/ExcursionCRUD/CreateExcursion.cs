using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;
using TouristClubApi.Helpers;

namespace TouristClub.API.Features.Commands.ExcursionCRUD
{
    public class CreateExcursion
    {
        public class Command : IRequest<bool>
        {
            public Excursion Excursion { get; set; }

            public Command(Excursion excursion)
            {
                Excursion = excursion;
            }
        }

        public class Handler : IRequestHandler<CreateExcursion.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command command, CancellationToken cancellationToken)
            {
                //ValidationHelper.IsRoleExist(command.Name, _context);
                await _context.Excursions.AddAsync(command.Excursion);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}