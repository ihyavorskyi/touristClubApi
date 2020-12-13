using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Queries.TicketCRUD
{
    public class GetUserTickets
    {
        public class Query : IRequest<ICollection<Ticket>>
        {
            public string Id { get; set; }

            public Query(string id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<GetUserTickets.Query, ICollection<Ticket>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<ICollection<Ticket>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tickets = await _context.Tickets.Where(a => a.OwnerId == request.Id).Select(tic => new Ticket
                {
                    Id = tic.Id,
                    UniqueCode = tic.UniqueCode,
                    ExcursionId = tic.ExcursionId,
                    OwnerId = tic.OwnerId,
                    DateOfIssuance = tic.DateOfIssuance,
                    Excursion = new Excursion
                    {
                        Id = tic.Excursion.Id,
                        Name = tic.Excursion.Name,
                        Date = tic.Excursion.Date,
                        NumberOfSeats = tic.Excursion.NumberOfSeats
                    }
                }).ToListAsync();
                return tickets;
            }
        }
    }
}