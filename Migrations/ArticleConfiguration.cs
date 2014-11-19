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
                context.Articles.Add(new Models.Article() { 
                    Title = "Rememberance Day!", 
                    HtmlBody = "A Great Day To Remember!"
                });

                context.Articles.Add(new Models.Article()
                {
                    Title = "Chistmas Day!",
                    HtmlBody = "Holiday after Rememberance Day!"
                });

                context.SaveChanges();
            }
        }
    }
}