using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Models
{
    public class Session : BaseEntity
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public bool IsExpired { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? Expires { get; set; }
    }
}