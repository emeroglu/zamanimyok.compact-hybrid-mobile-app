using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace app.zamanimyok.com
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Route",
                url: "{controller}/{action}",
                defaults: new { controller = "Main", action = "Index" }
            );

            routes.MapRoute(
                name: "Route 2",
                url: "{controller}/{action}/{p1}"                
            );

            routes.MapRoute(
                name: "Route 3",
                url: "{controller}/{action}/{p1}/{p2}"
            );
        }
    }
}

