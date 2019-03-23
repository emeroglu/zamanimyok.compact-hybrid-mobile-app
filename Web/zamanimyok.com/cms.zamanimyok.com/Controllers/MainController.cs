using cms.zamanimyok.com.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cms.zamanimyok.com.Controllers
{
    public class MainController : Controller
    {
        [HttpGet]
        public string Index()
        {
            string html = "";

            html += "<html>";
            html += "   <head>";
            html += "       <title>Content Management System</title>";
            html += "       <meta charset='UTF-8' />";
            html += "   </head>";
            html += "   <body>";                        
            html += "       <script type='text/javascript' src='/File/Init'></script>";
            html += "   </body>";
            html += "</html>";

            html = html.Replace("       <", "<").Replace("   <", "<");

            Response.ContentType = "text/html";
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Cache.SetMaxAge(TimeSpan.FromSeconds(31568000));
            Response.Cache.SetRevalidation(HttpCacheRevalidation.None);

            return html;
        }
    }
}