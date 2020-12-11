using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClub.API.Helpers;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.TicketCRUD
{
    public class GreateTicket
    {
        public class Command : IRequest<bool>
        {
            public Ticket Ticket { get; set; }

            public Command(Ticket ticket)
            {
                Ticket = ticket;
            }
        }

        public class Handler : IRequestHandler<GreateTicket.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command command, CancellationToken cancellationToken)
            {
                command.Ticket.UniqueCode = UniqueCodeCreator.Create();
                command.Ticket.DateOfIssuance = DateTime.Now;
                await _context.Tickets.AddAsync(command.Ticket);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}