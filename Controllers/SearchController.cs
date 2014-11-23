using MyBlog.Data.Contracts;
using MyBlog.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyBlog.Controllers
{
    public class SearchController : BaseApiController
    {
        protected readonly ISearchService searchService;

        public SearchController(ISearchService searchService, ISessionService sessionService)
            :base(sessionService)
        {
            this.searchService = searchService;
        }

        [HttpGet]
        public IHttpActionResult Simple(string term)
        {
            return Ok(searchService.SimpleSearch(term));
        }
    }
}
