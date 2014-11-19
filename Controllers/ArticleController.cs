﻿using MyBlog.Data.Contracts;
using MyBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyBlog.Controllers
{
    public class ArticleController : ApiController
    {
        protected readonly IRepository<Article> repository;

        public ArticleController(IUow uow)
        {
            this.repository = uow.Articles;
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {
            return Ok(repository.GetAll());
        }
    }
}