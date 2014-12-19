using MyBlog.Server.Data.Contracts;
using MyBlog.Server.Dto;
using MyBlog.Server.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyBlog.Server.Controllers
{
    public class IdentityController : BaseApiController
    {
        protected readonly IIdentityService identityService;

        public IdentityController(ISessionService sessionService, IUow uow, IIdentityService identityService)
            :base(sessionService) 
        {
            //Contract.Requires<ArgumentNullException>(uow != null);
            //Contract.Requires<ArgumentNullException>(identityService != null);

            this.identityService = identityService;
        }

        [HttpPost]
        public IHttpActionResult SignIn(SignInDto signInDto)
        {
            return Ok(identityService.SignIn(signInDto));
        }

        [HttpPost]
        public IHttpActionResult Register(RegistrationRequestDto dto)
        {
            return Ok();
        }


    }
}
