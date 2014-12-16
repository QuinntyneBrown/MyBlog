using MyBlog.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyBlog.Controllers
{
    public class BaseApiController : ApiController
    {
        protected readonly ISessionService sessionService;

        public BaseApiController(ISessionService sessionService)
        {
            Contract.Requires<ArgumentNullException>(sessionService != null);

            this.sessionService = sessionService;
        }
    }
}
