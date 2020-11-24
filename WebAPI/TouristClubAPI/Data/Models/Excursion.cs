using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TouristClub.API.Data.Models
{
    [Table("Excursions")]
    public class Excursion
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        public int Price { get; set; }
        public int NumberOfSeats { get; set; }
        public int CategoryId { get; set; }
        public string Image { get; set; }

        //nav prop
        public Category Category { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}