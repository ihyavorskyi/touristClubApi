using MediatR;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using TouristClubApi.Data;

namespace TouristClub.API.Features.Commands.ArticleCRUD
{
    public class UploadArticleImage
    {
        public class Command : IRequest<bool>
        {
            public IFormFile File { get; set; }
            public int Id { get; set; }

            public Command(IFormFile file, int id)
            {
                File = file;
                Id = id;
            }
        }

        public class Handler : IRequestHandler<UploadArticleImage.Command, bool>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command command, CancellationToken cancellationToken)
            {
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var article = await _context.Articles.FindAsync(command.Id);
                if (command.File.Length == 0 || article == null)
                    return false;

                var fileName = ContentDispositionHeaderValue.Parse(command.File.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    command.File.CopyTo(stream);
                }
                article.Image = dbPath;
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}