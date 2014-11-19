using MyBlog.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MyBlog.Data
{
    public class DbContext : System.Data.Entity.DbContext
    {
        public DbContext()
            : base(nameOrConnectionString: "MyBlog")
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
            Configuration.AutoDetectChangesEnabled = false;
        }

        public DbSet<Article> Articles { get; set; }

        public int SaveChanges()
        {
            return base.SaveChanges();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {


        }
    }
}