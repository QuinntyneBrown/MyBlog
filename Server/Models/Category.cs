using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Models
{
    public class Category: BaseEntity
    {
        public Category()
        {
            this.Translations = new HashSet<CategoryTranslation>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<CategoryTranslation> Translations { get; set; }
    }
}