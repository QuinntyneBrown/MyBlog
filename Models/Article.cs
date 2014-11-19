using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string HtmlBody { get; set; }
    }
}