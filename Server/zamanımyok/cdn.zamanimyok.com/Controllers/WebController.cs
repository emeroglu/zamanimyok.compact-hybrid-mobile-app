using cdn.zamanimyok.com.Repository;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace cdn.zamanimyok.com.Controllers
{
    public class WebController : Controller
    {
        private static CultureInfo culture = new CultureInfo("en-US");

        [HttpGet]
        public string Script(string p1)
        {
            string script = "";

            if (Cache.Web.Script != "")
            {
                script = Cache.Web.Script;
            }
            else
            {               
                List<string> config;

                FileStream stream;
                StreamReader reader;

                stream = new FileStream(Server.MapPath("/Files/Web/config.json"), FileMode.Open, FileAccess.Read);
                reader = new StreamReader(stream);

                config = new JavaScriptSerializer().Deserialize<List<string>>(reader.ReadToEnd());

                stream.Flush();
                stream.Close();

                stream.Dispose();
                reader.Dispose();

                foreach (string s in config)
                {
                    stream = new FileStream(Server.MapPath(s), FileMode.Open, FileAccess.Read);
                    reader = new StreamReader(stream);

                    script += reader.ReadToEnd() + "\r\n\r\n";

                    stream.Flush();
                    stream.Close();

                    stream.Dispose();
                    reader.Dispose();
                }

                Cache.Web.Script = script;
            }

            Response.ContentType = "text/javascript";
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Cache.SetMaxAge(TimeSpan.FromSeconds(31568000));
            Response.Cache.SetRevalidation(HttpCacheRevalidation.None);

            return script;
        }

        [HttpGet]
        public string Template(string p1, string p2)
        {
            string html = "";

            if (Cache.Web.Templates.Keys.Contains(p2))
            {
                html = Cache.Web.Templates[p2];
            }
            else
            {
                FileStream stream = new FileStream(Server.MapPath("/Files/Web/html/templates/" + p2.ToLower(culture) + ".html"), FileMode.Open, FileAccess.Read);
                StreamReader reader = new StreamReader(stream);

                html = reader.ReadToEnd();

                stream.Flush();
                stream.Close();

                stream.Dispose();
                reader.Dispose();

                Cache.Web.Templates[p2] = html;
            }

            Response.ContentType = "text/html";
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Cache.SetMaxAge(TimeSpan.FromSeconds(31568000));
            Response.Cache.SetRevalidation(HttpCacheRevalidation.None);

            return html;
        }
    }
}