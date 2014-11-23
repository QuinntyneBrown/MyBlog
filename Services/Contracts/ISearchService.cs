using MyBlog.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Services.Contracts
{
    public interface ISearchService
    {
        SearchResultsDto SimpleSearch(string term);
    }
}