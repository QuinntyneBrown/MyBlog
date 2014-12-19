using MyBlog.Server.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Services
{
    public class CacheProvider : ICacheProvider
    {
        public ICache GetCache()
        {
            return MyBlog.Server.Services.MemoryCache.Current;
        }
    }
}