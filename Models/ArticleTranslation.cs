using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Models
{
    public class ArticleTranslation
    {
        public int Id { get; set; }
        public int? ArticleId { get; set; }
        public string Title { get; set; }
        public string HtmlBody { get; set; }
        public int? CultureCodeId { get; set; }
    }
}