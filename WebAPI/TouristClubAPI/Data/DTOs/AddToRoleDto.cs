﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristClub.API.Data.DTOs
{
    public class AddToRoleDto
    {
        public string UserId { get; set; }
        public string Role { get; set; }
    }
}