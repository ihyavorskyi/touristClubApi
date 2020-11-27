using System.Linq;
using TouristClubApi.Data;
using TouristClubApi.Exceptions;

namespace TouristClubApi.Helpers
{
    public class ValidationHelper
    {
        public static void IsRoleExist(string Name, AppDbContext _context)
        {
            var isRole = _context.Roles.Any(d => d.Name == Name);
            if (isRole)
                throw new BadRequestException("This role already exists.");
        }
    }
}