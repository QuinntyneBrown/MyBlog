using MyBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;


namespace MyBlog.Data.Contracts
{
    public interface IUow
    {
        IRepository<Article> Articles { get; }
        IRepository<Configuration> Configurations { get; }
        IRepository<Course> Courses { get; }
        IRepository<Session> Sessions { get; }
        IRepository<User> Users { get; }
        IRepository<YouTubeVideo> YouTubeVideos { get; }
        IRepository<Book> Books { get; }
        IRepository<FeedBack> FeedBacks { get; }
        IRepository<TrainingPlan> TrainingPlans { get; }

        void SaveChanges();
    }
}
