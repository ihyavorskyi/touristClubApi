using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Queries
{
    public class GetAllCategories
    {
        public class Query : IRequest<IEnumerable<Category>>
        {
        }

        public class Handler : IRequestHandler<GetAllCategories.Query, IEnumerable<Category>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Category>> Handle(Query request, CancellationToken cancellationToken)
            {
                var departments = await _context.Categories
                    .Select(dep => new Category
                    {
                        Id = dep.Id,
                        Name = dep.Name,
                        Articles = dep.Articles.Select(doc => new Article
                        {
                            Id = doc.Id,
                            AuthorId = doc.AuthorId,
                            Description = doc.Description,
                            Text = doc.Text
                        }).ToList()
                    }).ToListAsync();
                return departments;
            }
        }
    }
}