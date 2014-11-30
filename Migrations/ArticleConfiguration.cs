using MyBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Migrations
{
    public class ArticleConfiguration
    {
        public static void Seed(MyBlog.Data.DbContext context)
        {
            if (context.Articles.Count() < 1)
            {
                var configuration = context.Configurations.First();

                context.Articles.Add(new Article() { 
                    Title = "Rememberance Day!", 
                    HtmlBody = "A Great Day To Remember!",
                    TenantId = configuration.TenantId,
                    PubDate = DateTime.UtcNow,
                    Status = ArticleStatus.Published
                });

                context.Articles.Add(new Models.Article()
                {
                    Title = "Chistmas Day!",
                    HtmlBody = "Holiday after Rememberance Day!",
                    TenantId = configuration.TenantId,
                    PubDate = DateTime.UtcNow,
                    Status = ArticleStatus.Published
                });

                context.SaveChanges();
            }
        }
    }
}