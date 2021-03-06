﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Migrations
{
    // Entity Configuration Class for the Configuration Entities. 
    // A little confusing but consistent
    public class ConfigurationConfiguration
    {
        public static void Seed(MyBlog.Server.Data.DbContext context)
        {
            if (context.Configurations.Count() < 1)
            {
                context.Configurations.Add(new MyBlog.Server.Models.Configuration() { Name = "ngBlog", TenantId = 1, Theme = "Winter" });

                context.SaveChanges();
            }
        }
    }
}