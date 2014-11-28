using MyBlog.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Services
{
    public class CacheProvider : ICacheProvider
    {
        public ICache GetCache()
        {
            return MyBlog.Services.MemoryCache.Current;
        }
    }
}