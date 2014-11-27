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
        }

        public string Title { get; set; }
        public string HtmlBody { get; set; }
        public string Version { get; set; }
        public ArticleStatus Status { get; set; } 
        public ICollection<ArticleTranslation> Translations { get; set; }
    }
}