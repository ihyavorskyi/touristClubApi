﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using TouristClubApi.Data.Models;

namespace TouristClub.API.Data.Models
{
    [Table("Comments")]
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string AuthorId { get; set; }
        public int AricleId { get; set; }
        public DateTime Date { get; set; }

        //nav props
        public Article Article { get; set; }

        public User User { get; set; }
    }
}