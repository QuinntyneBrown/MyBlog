using MyBlog.Server.Data.Contracts;
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
    public class SearchController : BaseApiController
    {
        protected readonly ISearchService searchService;

        public SearchController(ISearchService searchService, ISessionService sessionService)
            :base(sessionService)
        {
            //Contract.Requires<ArgumentNullException>(searchService != null);

            this.searchService = searchService;
        }

        [HttpGet]
        public IHttpActionResult Simple(string term)
        {
            return Ok(searchService.SimpleSearch(term));
        }
    }
}
