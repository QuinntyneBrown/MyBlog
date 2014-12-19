using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Models
{
    public class FeedBack: BaseEntity
    {
        public int? UserId { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
    }
}