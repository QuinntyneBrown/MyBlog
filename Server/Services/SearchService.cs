using MyBlog.Server.Data.Contracts;
using MyBlog.Server.Dto;
using MyBlog.Server.Models;
using MyBlog.Server.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Services
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
                    .Where(x => x.Status == PublishStatus.Published && x.IsDeleted == false)
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