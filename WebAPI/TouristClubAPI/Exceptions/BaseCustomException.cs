using System;
using System.Net;

namespace TouristClubApi.Exceptions
{
    public abstract class BaseCustomException : ApplicationException
    {
        public HttpStatusCode Code { get; }

        protected BaseCustomException(HttpStatusCode code, string msg)
            : base(msg)
        {
            this.Code = code;
        }
    }
}