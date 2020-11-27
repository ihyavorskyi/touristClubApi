using System;
using System.ComponentModel.DataAnnotations.Schema;
using TouristClubApi.Data.Models;

namespace TouristClub.API.Data.Models
{
    [Table("Tickets")]
    public class Ticket
    {
        public int Id { get; set; }
        public string OwnerId { get; set; }
        public int ExcursionId { get; set; }
        public string UniqueCode { get; set; }
        public DateTime DateOfIssuance { get; set; }

        //nav prop

        public Excursion Excursion { get; set; }
        public User User { get; set; }
    }
}