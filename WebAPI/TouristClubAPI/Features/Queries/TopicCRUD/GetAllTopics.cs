using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClub.API.Features.Queries.CategoryCRUD;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Queries.TopicCRUD
{
    public class GetAllTopics
    {
        public class Query : IRequest<IEnumerable<Topic>>
        {
        }

        public class Handler : IRequestHandler<GetAllTopics.Query, IEnumerable<Topic>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Topic>> Handle(Query request, CancellationToken cancellationToken)
            {
                var topics = await _context.Topics
                    .Select(top => new Topic
                    {
                        Id = top.Id,
                        Name = top.Name
                    }).ToListAsync();
                return topics;
            }
        }
    }
}