namespace MyBlog.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MyBlog.Server.Data.DbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(MyBlog.Server.Data.DbContext context)
        {
            context.Database.Delete();

            context.Database.Create();

            ConfigurationConfiguration.Seed(context);

            ArticleConfiguration.Seed(context);

            RoleConfiguration.Seed(context);

            UserConfiguration.Seed(context);
        }
    }
}
