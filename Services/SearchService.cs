using MyBlog.Data.Contracts;
using MyBlog.Dto;
using MyBlog.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Services
{
    public class SearchService: ISearchService
    {
        protected readonly IUow uow;

        public SearchService(IUow uow)
        {
            this.uow = uow;
        }

        public SearchResultsDto SimpleSearch(string term)
        {

            var articles = new HashSet<dynamic>();
                
                uow.Articles.GetAll()
                    .Where(x => x.HtmlBody.Contains(term) || x.Title.Contains(term))
                    .OrderBy(x => x.LastModifiedDate)
                    .ToList()
                    .ForEach(x=> articles.Add(x));

            var result = new SearchResultsDto()
            {
                Data = articles
            };

            return result;
        }
    }
}