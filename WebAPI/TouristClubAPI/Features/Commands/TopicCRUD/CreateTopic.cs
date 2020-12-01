using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.TopicCRUD
{
    public class CreateTopic
    {
        public class Command : IRequest<bool>
        {
            public Topic Topic { get; set; }

            public Command(Topic topic)
            {
                Topic = topic;
            }
        }

        public class Handler : IRequestHandler<CreateTopic.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                await _context.Topics.AddAsync(request.Topic);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}