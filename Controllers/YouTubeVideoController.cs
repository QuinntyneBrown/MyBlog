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
    public class YouTubeVideoController : BaseApiController
    {
        protected readonly IRepository<YouTubeVideo> repository;

        protected readonly IUow uow;

        public YouTubeVideoController(ISessionService sessionService, IUow uow) :
            base(sessionService)
        {
            this.uow = uow;

            this.repository = uow.YouTubeVideos;
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
            var YouTubeVideo = this.repository.GetById(id);
            YouTubeVideo.IsDeleted = true;
            return Update(YouTubeVideo);
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult Add(YouTubeVideo entity)
        {
            this.repository.Add(entity);
            this.uow.SaveChanges();
            return Ok(entity);
        }

        [HttpPut]
        [Authorize]
        public IHttpActionResult Update(YouTubeVideo entity)
        {
            this.repository.Update(entity);
            this.uow.SaveChanges();
            return Ok();
        }
    }
}
