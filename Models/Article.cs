using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Models
{
    public class Article : Content
    {
        public Article()
        {
            this.Translations = new HashSet<ArticleTranslation>();
            this.Categories = new HashSet<Category>();
            this.Tags = new HashSet<Tag>();
        }

        public string Version { get; set; }
        public PublishStatus Status { get; set; } 
        public ICollection<ArticleTranslation> Translations { get; set; }
        public ICollection<Category> Categories { get; set; }
        public ICollection<Tag> Tags { get; set; }
    }
}