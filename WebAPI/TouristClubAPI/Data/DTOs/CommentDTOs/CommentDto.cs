using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TouristClub.API.Data.DTOs.UserDTOs;

namespace TouristClub.API.Data.DTOs.CommentDTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }

        public NameUserDto Author { get; set; }
    }
}