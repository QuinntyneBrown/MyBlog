using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Models
{
    public class Page: BaseEntity
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public string HtmlBody { get; set; }
    }
}