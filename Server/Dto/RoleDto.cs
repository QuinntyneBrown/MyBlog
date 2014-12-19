using MyBlog.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Dto
{
    public class RoleDto
    {
        public RoleDto(Role role)
        {
            this.Name = role.Name;
        }

        public string Name { get; set; }
    }
}