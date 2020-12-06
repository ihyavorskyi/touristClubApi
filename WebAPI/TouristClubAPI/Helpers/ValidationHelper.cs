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

        public static void IsTopicExist(string Name, AppDbContext _context)
        {
            var isTopic = _context.Topics.Any(d => d.Name == Name);
            if (isTopic)
                throw new BadRequestException("This topic already exists.");
        }

        public static void IsCategoryExist(string Name, AppDbContext _context)
        {
            var isCategory = _context.Categories.Any(d => d.Name == Name);
            if (isCategory)
                throw new BadRequestException("This category  already exists.");
        }
    }
}