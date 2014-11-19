using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Models
{
    public class Configuration
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Theme { get; set; }
        public int TenantId { get; set; }
    }
}