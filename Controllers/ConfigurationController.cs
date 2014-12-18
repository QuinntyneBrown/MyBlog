﻿using MyBlog.Data.Contracts;
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
    public class ConfigurationController : BaseApiController
    {
        private readonly IUow _uow;
        private readonly IRepository<Configuration> _repository;

        public ConfigurationController(ISessionService sessionService, IUow uow) 
            :base(sessionService)
        {
            //Contract.Requires<ArgumentNullException>(uow != null);

            this._uow = uow;
            this._repository = uow.Configurations;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(this._repository.GetAll().First());
        }

    }
}

