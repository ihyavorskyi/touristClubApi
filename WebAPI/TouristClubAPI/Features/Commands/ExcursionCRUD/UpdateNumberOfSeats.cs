using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.ExcursionCRUD
{
    public class UpdateNumberOfSeats
    {
        public class Command : IRequest<bool>
        {
            public NumberOfSeatsDto NumberOfSeatsDto { get; set; }

            public Command(NumberOfSeatsDto numberOfSeatsDto)
            {
                NumberOfSeatsDto = numberOfSeatsDto;
            }
        }

        public class Handler : IRequestHandler<UpdateNumberOfSeats.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command command, CancellationToken cancellationToken)
            {
                var excursion = await _context.Excursions.FindAsync(command.NumberOfSeatsDto.ExcursionId);
                if (excursion != null)
                {
                    excursion.NumberOfSeats = command.NumberOfSeatsDto.NumberOfSeats;
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
        }
    }
}