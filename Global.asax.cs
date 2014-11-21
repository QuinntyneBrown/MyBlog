using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace MyBlog
{
    public class WebApiApplication : System.Web.HttpApplication
    {

        protected void Application_Start()
        {
            var jSettings = new JsonSerializerSettings();
            var config = GlobalConfiguration.Configuration;
            jSettings.Formatting = Formatting.Indented;
            jSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.Remove(config.Formatters.XmlFormatter);
            config.Formatters.JsonFormatter.SerializerSettings = jSettings;
            UnityConfig.RegisterComponents();
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
