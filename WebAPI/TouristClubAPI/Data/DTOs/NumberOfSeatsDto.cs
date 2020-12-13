using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristClub.API.Data.DTOs
{
    public class NumberOfSeatsDto
    {
        public int ExcursionId { get; set; }

        public int NumberOfSeats { get; set; }
    }
}