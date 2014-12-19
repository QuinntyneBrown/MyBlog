using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Models
{
    public class Course: BaseEntity
    {
        public Course()
        {
            this.YouTubeVideos = new HashSet<YouTubeVideo>();
            this.Books = new HashSet<Book>();
        }

        public string Name { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public virtual ICollection<YouTubeVideo> YouTubeVideos { get; set; }
        public virtual ICollection<Book> Books { get; set; }
    }
}