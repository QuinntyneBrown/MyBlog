namespace MyBlog.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MyBlog.Data.DbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(MyBlog.Data.DbContext context)
        {
            ConfigurationConfiguration.Seed(context);

            ArticleConfiguration.Seed(context);
        }
    }
}
