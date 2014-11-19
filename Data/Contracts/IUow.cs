using MyBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Data.Contracts
{
    public interface IUow
    {
        IRepository<Article> Articles { get; }

        void SaveChanges();
    }
}