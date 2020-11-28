using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs.ArticleDTOs;
using TouristClub.API.Data.DTOs.CategoryDTOs;
using TouristClub.API.Data.DTOs.CommentDTOs;
using TouristClub.API.Data.DTOs.UserDTOs;
using TouristClub.API.Data.Models;
using TouristClubApi.Data;
using TouristClubApi.Data.Models;

namespace TouristClub.API.Features.Queries.ArticlesCRUD
{
    public class GetArticleById
    {
        public class Query : IRequest<ArticleDto>
        {
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<GetArticleById.Query, ArticleDto>
        {
            private readonly AppDbContext _context;
            private readonly UserManager<User> _userManager;

            public Handler(AppDbContext context, UserManager<User> userManager)
            {
                _context = context;
                _userManager = userManager;
            }

            public async Task<ArticleDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var article = await _context.Articles.Where(a => a.Id == request.Id).Select(ar => new ArticleDto
                {
                    Id = ar.Id,
                    Title = ar.Title,
                    Text = ar.Text,
                    Author = new User
                    {
                        Id = ar.User.Id,
                        FirstName = ar.User.FirstName,
                        LastName = ar.User.LastName
                    },
                    Topic = new Topic
                    {
                        Id = ar.Topic.Id,
                        Name = ar.Topic.Name
                    },
                    Comments = ar.Comments.Select(com => new CommentDto
                    {
                        Id = com.Id,
                        Text = com.Text,
                        Date = com.Date,
                        Author = new NameUserDto
                        {
                            Id = com.User.Id,
                            FirstName = com.User.FirstName,
                            LastName = com.User.LastName
                        }
                    }).ToList()
                }).FirstOrDefaultAsync();
                return article;
            }
        }
    }
}