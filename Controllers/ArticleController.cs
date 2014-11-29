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
        public IHttpActionResult GetAll()
        {
            return Ok(repository.GetAll().Where(x=>x.IsDeleted ==false).ToList());
        }

        [HttpGet]
        public IHttpActionResult GetPage(int offset = 0, int setSize = 5)
        {
            return Ok(repository.GetAll()
                .Where(x => x.IsDeleted == false && x.Status == ArticleStatus.Published)
                .Skip(offset * setSize)
                .Take(setSize)
                .ToList());
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
            this.uow.SaveChanges();
            return Ok();
        }

        [HttpPost]
        public IHttpActionResult Add(Article entity)
        {
            this.repository.Add(entity);
            this.uow.SaveChanges();
            return Ok();
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
