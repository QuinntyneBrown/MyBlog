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
        public DbSet<ArticleTranslation> ArticleTranslations { get; set; }
        public DbSet<Configuration> Configurations { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<User> Users { get; set; }

        public override int SaveChanges()
        {
            foreach (var entry in this.ChangeTracker.Entries()
            .Where(e => e.Entity is ILoggable &&
                ((e.State == EntityState.Added || (e.State == EntityState.Modified)))))
            {

                if (((ILoggable)entry.Entity).CreatedDate == null)
                {
                    ((ILoggable)entry.Entity).CreatedDate = DateTime.UtcNow;
                }

                ((ILoggable)entry.Entity).LastModifiedDate = DateTime.UtcNow;

            }

            return base.SaveChanges();
        }

        public int SaveChanges(User user)
        {
            foreach (var entry in this.ChangeTracker.Entries()
                        .Where(e => e.Entity is ILoggable &&
                            ((e.State == EntityState.Added || (e.State == EntityState.Modified)))))
            {

                if (((ILoggable)entry.Entity).CreatedDate == null)
                {
                    ((ILoggable)entry.Entity).CreatedDate = DateTime.UtcNow;
                }
                
                ((ILoggable)entry.Entity).LastModifiedDate = DateTime.UtcNow;

                if (user != null)
                {
                    ((ILoggable)entry.Entity).LastModifiedByUserId = user.Id;
                    ((ILoggable)entry.Entity).LastModifiedByUserName = user.Username;
                }
            }


            return base.SaveChanges();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {


        }
    }
}