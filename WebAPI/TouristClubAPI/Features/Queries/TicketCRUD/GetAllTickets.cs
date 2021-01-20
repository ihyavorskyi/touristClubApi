using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;
using TouristClubApi.Data.Models;

namespace TouristClub.API.Features.Queries.TicketCRUD
{
    public class GetAllTickets
    {
        public class Query : IRequest<IEnumerable<Ticket>>
        {
        }

        public class Handler : IRequestHandler<GetAllTickets.Query, IEnumerable<Ticket>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Ticket>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tickets = await _context.Tickets
                    .Select(t => new Ticket
                    {
                        Id = t.Id,
                        DateOfIssuance = t.DateOfIssuance,
                        UniqueCode = t.UniqueCode,
                        Excursion = new Excursion
                        {
                            Id = t.Excursion.Id,
                            Name = t.Excursion.Name
                        },
                        User = new User
                        {
                            Id = t.User.Id,
                            FirstName = t.User.FirstName,
                            LastName = t.User.LastName
                        }
                    }).ToListAsync();
                return tickets;
            }
        }
    }
}