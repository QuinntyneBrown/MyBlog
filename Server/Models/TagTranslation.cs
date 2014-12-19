using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Models
{
    public class TagTranslation: BaseEntity
    {
        [ForeignKey("Culture")]
        public int CultureId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public virtual Culture Culture { get; set; }
    }
}