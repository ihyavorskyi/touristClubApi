using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristClub.API.Data.Models
{
    [Table("Categories")]
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //nav prop

        public virtual ICollection<Excursion> Excursions { get; set; }
    }
}