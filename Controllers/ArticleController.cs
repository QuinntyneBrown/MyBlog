using MyBlog.Data.Contracts;
using MyBlog.Models;
using MyBlog.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
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
        public async Task<IHttpActionResult> GetAll(PublishStatus? status = null)
        {
            var articles = new List<Article>();

            await Task.Factory.StartNew(() =>
            {
                if (status != null)
                {
                    articles = repository.GetAll()
                        .Where(x => x.IsDeleted == false && x.Status == status)
                        .OrderByDescending(x => x.PubDate)
                        .ToList();
                }
                else
                {
                    articles = repository.GetAll()
                        .Where(x => x.IsDeleted == false)
                        .OrderByDescending(x => x.PubDate)
                        .ToList();
                }
            });

            return Ok(articles);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetPage(int offset = 0, int setSize = 5, PublishStatus? status = null)
        {
            var articles = new List<Article>();

            await Task.Factory.StartNew(() =>
            {
                if (status != null)
                {
                    articles = this.repository.GetAll()
                        .Where(x => x.IsDeleted == false && x.Status == status)
                        .Skip(offset * setSize)
                        .Take(setSize)
                        .ToList();
                }
                else
                {
                    articles = this.repository.GetAll()
                        .Where(x => x.IsDeleted == false)
                        .Skip(offset * setSize)
                        .Take(setSize)
                        .ToList();
                }
            });

            return Ok(articles);
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

        [HttpDelete]
        [Authorize]
        public IHttpActionResult Delete(int id)
        {
            var article = this.repository.GetById(id);
            article.IsDeleted = true;
            return Update(article);
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult Add(Article entity)
        {
            this.repository.Add(entity);
            this.uow.SaveChanges();
            return Ok(entity);
        }

        [HttpPut]
        [Authorize]
        public IHttpActionResult Update(Article entity)
        {
            this.repository.Update(entity);
            this.uow.SaveChanges();
            return Ok();
        }
    }
}
