using cpi.zamanimyok.com.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cpi.zamanimyok.com.Controllers
{
    public class FileController : Controller
    {
        [HttpGet]
        public string Init()
        {
            string compilation = "";

            FileStream stream = new FileStream(Server.MapPath("/Files/js/init.js"), FileMode.Open, FileAccess.Read);
            StreamReader reader = new StreamReader(stream);

            compilation += "var version = '" + Cache.Last_Refresh.Ticks + "';\r\n\r\n";
            compilation += reader.ReadToEnd();

            stream.Flush();
            stream.Close();

            stream.Dispose();
            reader.Dispose();

            Response.ContentType = "text/javascript";
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetMaxAge(TimeSpan.FromSeconds(0));
            Response.Cache.SetRevalidation(HttpCacheRevalidation.None);

            return compilation;
        }
    }
}