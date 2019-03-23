using cms.zamanimyok.com.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace cms.zamanimyok.com
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();            
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            DateTime now = DateTime.Now;

            Cache.Start = now;
            Cache.Last_Alive = now;
            Cache.Last_Refresh = now;
        }
    }
}
