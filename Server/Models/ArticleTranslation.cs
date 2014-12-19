using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Models
{
    public class ArticleTranslation: BaseEntity
    {
        
        [ForeignKey("Article")]
        public int? ArticleId { get; set; }

        public string Title { get; set; }
        public string HtmlExcerpt { get; set; }
        public string HtmlBody { get; set; }
        public int? CultureCodeId { get; set; }
        
        public virtual Article Article { get; set; }
    }
}