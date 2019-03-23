using app.zamanimyok.com.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace app.zamanimyok.com.Controllers
{
    public class SysController : Controller
    {
        private string Date_Format = "yyyy-MM-dd HH:mm:ss";

        [HttpGet]
        public string Start()
        {
            return Cache.Start.ToString(Date_Format);
        }

        [HttpGet]
        public string Last_Alive()
        {
            return Cache.Last_Alive.ToString(Date_Format);
        }

        [HttpGet]
        public string Last_Refresh()
        {
            return Cache.Last_Refresh.ToString(Date_Format);
        }

        [HttpGet]
        public string Keep_Alive(int seconds)
        {
            Cache.Last_Alive = DateTime.Now;

            string html = "";

            html += "<html>";
            html += "   <head>";
            html += "       <title>App - Keep Alive</title>";
            html += "   </head>";
            html += "   <body>";
            html += "       Last Alive: " + Cache.Last_Alive.ToString(Date_Format) + "<br />";
            html += "       Last Refresh: " + Cache.Last_Refresh.ToString(Date_Format);
            html += "       <script type='text/javascript'>";
            html += "           setTimeout(function() { location.href='/Sys/Keep_Alive/" + seconds + "';}, " + seconds + "000);";
            html += "       </script>";
            html += "   </body>";
            html += "</html>";

            Response.ContentType = "text/html";
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetMaxAge(TimeSpan.FromSeconds(0));
            Response.Cache.SetRevalidation(HttpCacheRevalidation.None);

            return html;
        }

        [HttpGet]
        public string Refresh()
        {
            DateTime now = DateTime.Now;

            Cache.Last_Refresh = now;

            Cache.Script = "";
            Cache.Modules = new Dictionary<string, string>();

            return "Version: " + Cache.Last_Refresh.Ticks;
        }
    }
}