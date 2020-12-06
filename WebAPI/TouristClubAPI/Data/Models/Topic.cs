using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristClub.API.Data.Models
{
    [Table("Topics")]
    public class Topic
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //nav prop

        public virtual ICollection<Article> Articles { get; set; }
    }
}