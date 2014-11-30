using MyBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Dto
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