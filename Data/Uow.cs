using MyBlog.Data.Contracts;
using MyBlog.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MyBlog.Data
{
    public class Uow: IUow
    {
        protected DbContext DbContext;

        protected IRepositoryProvider RepositoryProvider { get; set; } 

        public Uow(IRepositoryProvider repositoryProvider)
        {
            CreateDbContext();

            repositoryProvider.DbContext = DbContext;

            RepositoryProvider = repositoryProvider;
        }

        protected void CreateDbContext()
        {
            DbContext = new DbContext();
            DbContext.Configuration.ProxyCreationEnabled = false;
            DbContext.Configuration.LazyLoadingEnabled = false;
            DbContext.Configuration.ValidateOnSaveEnabled = false;
        }

        public IRepository<Article> Articles { get { return GetStandardRepo<Article>(); } }
        public IRepository<Book> Books { get { return GetStandardRepo<Book>(); } }
        public IRepository<Configuration> Configurations { get { return GetStandardRepo<Configuration>(); } }
        public IRepository<Session> Sessions { get { return GetStandardRepo<Session>();  } }
        public IRepository<User> Users { get { return GetStandardRepo<User>(); } }       
        public IRepository<YouTubeVideo> YouTubeVideos { get { return GetStandardRepo<YouTubeVideo>(); } }
        public void SaveChanges()
        {
            this.DbContext.SaveChanges();
        }

        private IRepository<T> GetStandardRepo<T>() where T : class
        {
            return RepositoryProvider.GetRepositoryForEntityType<T>();
        }

        private T GetRepo<T>() where T : class
        {
            return RepositoryProvider.GetRepository<T>();
        }

        #region IDisposable

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (DbContext != null)
                {
                    DbContext.Dispose();
                }
            }
        }

        #endregion

    }
}
