using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Models
{
    public class Configuration : BaseEntity
    {
        public string Name { get; set; }
        public string Theme { get; set; }
    }
}