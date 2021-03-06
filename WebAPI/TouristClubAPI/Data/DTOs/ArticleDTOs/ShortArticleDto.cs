﻿using System;
using TouristClub.API.Data.Models;

namespace TouristClub.API.Data.DTOs
{
    public class ShortArticleDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public DateTime Date { get; set; }

        public Topic Topic { get; set; }
    }
}