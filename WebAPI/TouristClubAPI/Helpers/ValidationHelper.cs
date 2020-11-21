using TouristClubApi.Data;
using TouristClubApi.Data.Models;
using TouristClubApi.Exceptions;
using System.Linq;

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