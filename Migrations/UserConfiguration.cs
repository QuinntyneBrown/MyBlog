﻿using MyBlog.Models;
using MyBlog.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Migrations
{
    public class UserConfiguration
    {
        public static void Seed(MyBlog.Data.DbContext context)
        {
            if (context.Users.Count() < 1)
            {
                var encryptionService = new EncryptionService();

                var password = encryptionService.TransformPassword("password");

                User user = new User() { Firstname = "Demo", Lastname = "User", Username = "Demo", Password = password, IsActive = true };

                context.Users.Add(user);

                context.SaveChanges();
            }
        }
    }
}