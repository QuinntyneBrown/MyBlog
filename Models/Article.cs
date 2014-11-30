using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Models
{
    public class Article : BaseEntity
    {
        public Article()
        {
            this.Translations = new HashSet<ArticleTranslation>();
            this.Categories = new HashSet<Category>();
            this.Tags = new HashSet<Tag>();
        }

        public string Title { get; set; }
        public string Slug { get; set; }
        public DateTime? PubDate { get; set; }
        public string HtmlBody { get; set; }
        public string Version { get; set; }
        public ArticleStatus Status { get; set; } 
        public ICollection<ArticleTranslation> Translations { get; set; }
        public ICollection<Category> Categories { get; set; }
        public ICollection<Tag> Tags { get; set; }
    }
}