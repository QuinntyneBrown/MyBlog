using MyBlog.Server.Data.Contracts;
using MyBlog.Server.Models;
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
    public class CourseController : BaseApiController
    {
        protected readonly IRepository<Course> repository;

        protected readonly IUow uow;

        public CourseController(ISessionService sessionService, IUow uow) :
            base(sessionService)
        {
            //Contract.Requires<ArgumentNullException>(uow != null);

            this.uow = uow;
            this.repository = uow.Courses;
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
            var Course = this.repository.GetById(id);
            Course.IsDeleted = true;
            return Update(Course);
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult Add(Course entity)
        {
            this.repository.Add(entity);
            this.uow.SaveChanges();
            return Ok(entity);
        }

        [HttpPut]
        [Authorize]
        public IHttpActionResult Update(Course entity)
        {
            this.repository.Update(entity);
            this.uow.SaveChanges();
            return Ok();
        }
    }
}
