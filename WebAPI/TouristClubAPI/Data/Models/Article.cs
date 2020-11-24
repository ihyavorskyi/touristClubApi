using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using TouristClubApi.Data.Models;

namespace TouristClub.API.Data.Models
{
    [Table("Articles")]
    public class Article
    {
        public int Id { get; set; }
        public string AuthorId { get; set; }
        public int CategoryId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Text { get; set; }
        public string Image { get; set; }

        //nav props
        public Category Category { get; set; }

        public User User { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}