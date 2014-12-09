using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Models
{
    public class Role : BaseEntity
    {
        public Role()
        {
            this.Users = new HashSet<User>();
        }

        public string Name { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}