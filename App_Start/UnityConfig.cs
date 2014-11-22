using Microsoft.Practices.Unity;
using MyBlog.Data;
using MyBlog.Data.Contracts;
using MyBlog.Services;
using MyBlog.Services.Contracts;
using System.Web.Http;
using Unity.WebApi;

namespace MyBlog
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = GetContainer();
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }

        public static UnityContainer GetContainer()
        {
            var container = new UnityContainer();
            container.RegisterType<IUow, Uow>();
            container.RegisterType<IRepositoryProvider, RepositoryProvider>();
            container.RegisterType<ISessionService, SessionService>();
            container.RegisterType<IIdentityService, IdentityService>();
            container.RegisterType<IEncryptionService, EncryptionService>();
            return container;
        }
    }
}