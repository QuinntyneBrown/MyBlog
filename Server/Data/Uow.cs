using MyBlog.Server.Data.Contracts;
using MyBlog.Server.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Data
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
        public IRepository<Course> Courses { get { return GetStandardRepo<Course>(); } }
        public IRepository<Session> Sessions { get { return GetStandardRepo<Session>();  } }
        public IRepository<User> Users { get { return GetStandardRepo<User>(); } }       
        public IRepository<YouTubeVideo> YouTubeVideos { get { return GetStandardRepo<YouTubeVideo>(); } }
        public IRepository<FeedBack> FeedBacks { get { return GetStandardRepo<FeedBack>(); } }
        public IRepository<TrainingPlan> TrainingPlans { get { return GetStandardRepo<TrainingPlan>(); } }

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
