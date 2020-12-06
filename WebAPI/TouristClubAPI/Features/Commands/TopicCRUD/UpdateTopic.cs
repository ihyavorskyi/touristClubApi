using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.TopicCRUD
{
    public class UpdateTopic
    {
        public class Command : IRequest<bool>
        {
            public Topic Topic { get; set; }

            public Command(Topic topic)
            {
                Topic = topic;
            }
        }

        public class Handler : IRequestHandler<UpdateTopic.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                var topic = await _context.Topics.FindAsync(request.Topic.Id);
                if (topic != null)
                {
                    topic.Name = request.Topic.Name;
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
        }
    }
}