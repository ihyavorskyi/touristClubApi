using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using TouristClub.API.Data.Models;

namespace TouristClubApi.Data.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public int RoleId { get; set; }
        public string AvatarPath { get; set; }

        // nav props
        public virtual ICollection<Comment> Comments { get; set; }

        public virtual ICollection<Article> Articles { get; set; }
        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}