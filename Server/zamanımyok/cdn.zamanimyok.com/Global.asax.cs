using cdn.zamanimyok.com.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace cdn.zamanimyok.com
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            DateTime now = DateTime.Now;

            Cache.Start = now;
            Cache.Last_Alive = now;
            Cache.Last_Refresh = now;

            Cache.File.Images = new Dictionary<string, FileContentResult>();
            Cache.File.FontAwesome = new Dictionary<string, FileContentResult>();
            Cache.File.Fonts = new Dictionary<string, FileContentResult>();
            Cache.File.Styles = "";
            Cache.File.Angular = "";
            Cache.File.Script = "";

            Cache.Web.Script = "";
            Cache.Web.Templates = new Dictionary<string, string>();
        }
    }
}
