﻿using MyBlog.Data.Contracts;
using MyBlog.Dtos;
using MyBlog.Models;
using MyBlog.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyBlog.Controllers
{
    public class UserController : BaseApiController
    {

        protected readonly IRepository<User> repository;

        public UserController(ISessionService sessionService, IUow uow)
            : base(sessionService)
        {
            this.repository = uow.Users;
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult GetCurrentUser()
        {
            return Ok(repository.GetAll().Where(x=>x.Username == User.Identity.Name).Include(x=>x.Roles).Single());
        }


    }
}