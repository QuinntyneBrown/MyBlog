using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Models
{
    public class Content: BaseEntity
    {
        public string Title { get; set; }
        public string Slug { get; set; }
        public string HtmlExcerpt { get; set; }
        public string HtmlBody { get; set; }
        public DateTime? PubDate { get; set; }
        public PublishStatus Status { get; set; }
    }
}