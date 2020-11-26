using System.Collections.Generic;
using TouristClub.API.Data.DTOs.CategoryDTOs;
using TouristClub.API.Data.DTOs.CommentDTOs;
using TouristClub.API.Data.DTOs.UserDTOs;

namespace TouristClub.API.Data.DTOs.ArticleDTOs
{
    public class ArticleDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string Image { get; set; }

        //nav props
        public CategoryDto Category { get; set; }

        public NameUserDto Author { get; set; }

        public virtual ICollection<CommentDto> Comments { get; set; }
    }
}