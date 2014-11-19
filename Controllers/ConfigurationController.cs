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
    public class ConfigurationController : ApiController
    {
        private readonly IUow _uow;
        private readonly IRepository<Configuration> _repository;

        public ConfigurationController(IUow uow)
        {
            this._uow = uow;
            this._repository = uow.Configurations;
        }

        [HttpPost]
        public IHttpActionResult Add(Configuration entity)
        {
            this._repository.Add(entity);
            this._uow.SaveChanges();
            return Ok();
        }

        [HttpPost]
        public IHttpActionResult Update(Configuration entity)
        {
            this._repository.Update(entity);
            this._uow.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public IHttpActionResult Delete(int id)
        {
            this._repository.Delete(id);
            this._uow.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {

            return Ok(this._repository.GetAll().ToList());
        }

        [HttpGet]
        public IHttpActionResult GetById(int id)
        {
            return Ok(_repository.GetById(id));
        }

        [HttpGet]
        public IHttpActionResult GetPaginated(int setSize = 5, int offSet = 0)
        {
            var entities = _repository.GetAll().OrderBy(p => p.Id).Skip(offSet).Take(setSize).ToList();
            return Ok(entities);
        }

        [HttpGet]
        public IHttpActionResult Search(dynamic criteria)
        {
            return Ok(this._repository.GetAll().ToList());
        }
    }
}

