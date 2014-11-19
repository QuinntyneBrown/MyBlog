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

        void SaveChanges();
    }
}
