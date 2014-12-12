using MyBlog.Data.Contracts;
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
    public class ArticleController : BaseApiController
    {
        protected readonly IRepository<Article> repository;

        protected readonly IUow uow;

        public ArticleController(ISessionService sessionService, IUow uow):
            base(sessionService)
        {
            this.uow = uow;

            this.repository = uow.Articles;
        }

        [HttpGet]
        public IHttpActionResult GetAll(ArticleStatus? status = null)
        {

            if (status != null)
            {
                return Ok(repository.GetAll()
                    .Where(x => x.IsDeleted == false && x.Status == status)
                    .OrderByDescending(x => x.PubDate)
                    .ToList());
            }

            return Ok(repository.GetAll()
                .Where(x => x.IsDeleted == false)
                .OrderByDescending(x=>x.PubDate)
                .ToList());
        }

        [HttpGet]
        public IHttpActionResult GetPage(int offset = 0, int setSize = 5, ArticleStatus? status = null)
        {
            return Ok(repository.GetAll()
                .Where(x => x.IsDeleted == false && x.Status == ArticleStatus.Published)
                .Skip(offset * setSize)
                .Take(setSize)
                .ToList());
        }

        [HttpGet]
        public IHttpActionResult GetBySlug(string slug)
        {
            return Ok(repository.GetAll().Where(x=>x.Slug==slug).Single());
        }

        [HttpGet]
        public IHttpActionResult GetById(int id)
        {
            return Ok(repository.GetById(id));
        }

        [HttpGet]
        public IHttpActionResult Delete(int id)
        {
            var article = this.repository.GetById(id);
            article.IsDeleted = true;
            return Update(article);
        }

        [HttpPost]
        public IHttpActionResult Add(Article entity)
        {
            this.repository.Add(entity);
            this.uow.SaveChanges();
            return Ok(entity);
        }

        [HttpPost]
        public IHttpActionResult Update(Article entity)
        {
            this.repository.Update(entity);
            this.uow.SaveChanges();
            return Ok();
        }
    }
}
