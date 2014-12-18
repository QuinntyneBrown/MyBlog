using MyBlog.Data.Contracts;
using MyBlog.Models;
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
    public class BookController : BaseApiController
    {
        protected readonly IRepository<Book> repository;

        protected readonly IUow uow;

        public BookController(ISessionService sessionService, IUow uow) :
            base(sessionService)
        {
            //Contract.Requires<ArgumentNullException>(uow != null);

            this.uow = uow;
            this.repository = uow.Books;
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {

            return Ok(repository.GetAll()
                .Where(x => x.IsDeleted == false)
                .ToList());
        }

        [HttpGet]
        public IHttpActionResult GetPage(int offset = 0, int setSize = 5)
        {
            return Ok(repository.GetAll()
                .Where(x => x.IsDeleted == false)
                .Skip(offset * setSize)
                .Take(setSize)
                .ToList());
        }

        [HttpGet]
        public IHttpActionResult GetBySlug(string slug)
        {
            return Ok(repository.GetAll().Where(x => x.Slug == slug).Single());
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
            var Book = this.repository.GetById(id);
            Book.IsDeleted = true;
            return Update(Book);
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult Add(Book entity)
        {
            this.repository.Add(entity);
            this.uow.SaveChanges();
            return Ok(entity);
        }

        [HttpPut]
        [Authorize]
        public IHttpActionResult Update(Book entity)
        {
            this.repository.Update(entity);
            this.uow.SaveChanges();
            return Ok();
        }
    }
}
