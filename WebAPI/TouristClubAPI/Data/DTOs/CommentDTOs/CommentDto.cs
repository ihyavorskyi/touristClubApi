using System;
using TouristClubApi.Data.Models;

namespace TouristClub.API.Data.DTOs.CommentDTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }

        public User Author { get; set; }
    }
}