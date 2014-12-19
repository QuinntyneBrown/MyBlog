using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Models
{
    public class Tag: BaseEntity
    {
        public Tag()
        {
            this.Translations = new HashSet<TagTranslation>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<TagTranslation> Translations { get; set; }
    }
}