using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;
using TouristClubApi.Helpers;

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

            public async Task<bool> Handle(Command command, CancellationToken cancellationToken)
            {
                ValidationHelper.IsTopicExist(command.Topic.Name, _context);
                await _context.Topics.AddAsync(command.Topic);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}