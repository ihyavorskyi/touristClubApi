using System.Net;

namespace TouristClubApi.Exceptions
{
    public class BadRequestException : BaseCustomException
    {
        public BadRequestException() : base(HttpStatusCode.BadRequest, "Bad Request")
        {
        }

        public BadRequestException(string msg) : base(HttpStatusCode.BadRequest, msg)
        {
        }
    }
}