using MyBlog.Server.Models;
using MyBlog.Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Migrations
{
    public class UserConfiguration
    {
        public static void Seed(MyBlog.Server.Data.DbContext context)
        {
            if (context.Users.Count() < 1)
            {
                var encryptionService = new EncryptionService();

                var password = encryptionService.TransformPassword("password");

                context.Users.Add(new User() { Firstname = "System", Lastname = "System", Username = "System", Password = password, IsActive = true, Roles = context.Roles.Where(x => x.Name == "System").ToList() });
                context.Users.Add(new User() { Firstname = "Demo", Lastname = "User", Username = "Demo", Password = password, IsActive = true, Roles = context.Roles.Where(x=>x.Name=="Admin").ToList() });
                context.Users.Add(new User() { Firstname = "Quinntyne", Lastname = "Brown", Username = "Quinntyne", Password = password, IsActive = true, Roles = context.Roles.Where(x => x.Name == "Author").ToList() });
                context.Users.Add(new User() { Firstname = "Philippa", Lastname = "Brown", Username = "Philippa", Password = password, IsActive = true, Roles = context.Roles.Where(x => x.Name == "Author" || x.Name == "Publisher").ToList() });

                context.SaveChanges();
            }
        }
    }
}