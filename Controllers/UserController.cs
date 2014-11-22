using MyBlog.Data.Contracts;
using MyBlog.Dtos;
using MyBlog.Models;
using MyBlog.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyBlog.Controllers
{
    public class UserController : BaseApiController
    {

        protected readonly IRepository<User> repository;

        public UserController(ISessionService sessionService, IUow uow)
            : base(sessionService)
        {
            this.repository = uow.Users;
        }

        [HttpGet]
        public IHttpActionResult GetCurrentUser()
        {
            return Ok(User.Identity.Name);
        }


    }
}
