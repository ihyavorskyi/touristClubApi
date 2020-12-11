using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.TicketCRUD
{
    public class DeleteTicket
    {
        public class Command : IRequest<bool>
        {
            public int Id { get; set; }

            public Command(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<DeleteTicket.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command command, CancellationToken cancellationToken)
            {
                var result = await _context.Tickets.FindAsync(command.Id);
                if (result != null)
                {
                    _context.Tickets.Remove(result);
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
        }
    }
}