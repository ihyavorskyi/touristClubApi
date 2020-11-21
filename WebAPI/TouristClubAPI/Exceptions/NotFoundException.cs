using System.Net;

namespace TouristClubApi.Exceptions
{
    public class NotFoundException : BaseCustomException
    {
        public NotFoundException() : base(HttpStatusCode.NotFound, "Not found")
        {
        }

        public NotFoundException(string msg) : base(HttpStatusCode.NotFound, msg)
        {
        }
    }
}