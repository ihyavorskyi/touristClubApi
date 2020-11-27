﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TouristClub.API.Data.Models;

namespace TouristClub.API.Data.DTOs
{
    public class ShortArticleDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public Category Category { get; set; }
    }
}