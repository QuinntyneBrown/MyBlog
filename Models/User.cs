using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Models
{
    public class User: BaseEntity
    {
        public User()
        {
            this.Roles = new HashSet<Role>();
        }
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        public DateTime? LastLogin { get; set; }
        public virtual ICollection<Role> Roles { get; set; }
    }
}