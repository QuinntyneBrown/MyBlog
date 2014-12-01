﻿using MyBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Dto
{
    public class UserDto
    {
        public UserDto(User user)
        {
            this.Username = user.Username;
            this.Roles = user.Roles.Select(x => new RoleDto(x)).ToList();
        }
        public string Username { get; set; }
        public ICollection<RoleDto> Roles { get; set; }
    }
}