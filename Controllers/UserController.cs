using MyBlog.Data.Contracts;
using MyBlog.Dto;
using MyBlog.Models;
using MyBlog.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MyBlog.Controllers
{
    [Authorize]
    public class UserController : BaseApiController
    {
        protected readonly IRepository<User> repository;

        public UserController(ISessionService sessionService, IUow uow)
            : base(sessionService)
        {

            Contract.Requires<ArgumentNullException>(uow != null);

            this.repository = uow.Users;
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetCurrentUser()
        {
            var user = await sessionService.GetCurrentUser(User.Identity.Name);

            return Ok(user);
        }

        [HttpGet]        
        public IHttpActionResult GetAll()
        {
            return Ok(repository.GetAll());
        }

    }
}
