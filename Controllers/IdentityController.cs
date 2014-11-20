using MyBlog.Data.Contracts;
using MyBlog.Dtos;
using MyBlog.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyBlog.Controllers
{
    public class IdentityController : BaseApiController
    {
        public IdentityController(ISessionService sessionService, IUow uow)
            :base(sessionService) 
        {

        }

        [HttpPost]
        public IHttpActionResult SignIn(string username, string password)
        {
            return Ok();
        }

        [HttpPost]
        public IHttpActionResult Register(RegistrationRequestDto dto)
        {
            return Ok();
        }
    }
}
