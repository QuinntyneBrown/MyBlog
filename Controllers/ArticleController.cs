using MyBlog.Data.Contracts;
using MyBlog.Models;
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

        public ArticleController(IUow uow)
        {
            this.uow = uow;

            this.repository = uow.Articles;
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {
            return Ok(repository.GetAll());
        }

        [HttpGet]
        public IHttpActionResult GetById(int id)
        {
            return Ok(repository.GetById(id));
        }

        [HttpGet]
        public IHttpActionResult Delete(int id)
        {
            this.repository.Delete(id);
            this.uow.SaveChanges();
            return Ok();
        }
    }
}
