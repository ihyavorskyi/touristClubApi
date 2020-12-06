namespace TouristClub.API.Data.DTOs.CommentDTOs
{
    public class CreateCommentRequest
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string AuthorId { get; set; }
        public int ArticleId { get; set; }
    }
}