using MyBlog.Server.Models;
using MyBlog.Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Migrations
{
    public class RoleConfiguration
    {
        public static void Seed(MyBlog.Server.Data.DbContext context)
        {
            if (context.Roles.Count() < 1)
            {
                context.Roles.Add(new Role() { Name = "System" });

                context.Roles.Add(new Role() { Name = "Admin" });

                context.Roles.Add(new Role() { Name = "Author" });

                context.Roles.Add(new Role() { Name = "Publisher" });

                context.SaveChanges();
            }
        }
    }
}