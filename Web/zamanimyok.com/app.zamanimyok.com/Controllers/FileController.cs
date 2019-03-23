using app.zamanimyok.com.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace app.zamanimyok.com.Controllers
{
    public class FileController : Controller
    {
        [HttpGet]
        public string Init()
        {
            string compilation = "";

            FileStream stream = new FileStream(Server.MapPath("/Files/init.js"), FileMode.Open, FileAccess.Read);
            StreamReader reader = new StreamReader(stream);

            compilation += "var version = '" + Cache.Last_Refresh.Ticks + "';\r\n";

#if DEV
            compilation += "var cdn = 'https://cdn.zamanimyok.com';\r\n";
            compilation += "var api = 'https://api.zamanimyok.com';\r\n\r\n";
#endif

#if TEST
            compilation += "var cdn = 'https://test-cdn-zamanimyok.azurewebsites.net';\r\n";
            compilation += "var api = 'https://test-api-zamanimyok.azurewebsites.net';\r\n\r\n";
#endif

#if PROD
            compilation += "var cdn = 'https://cdn-zamanimyok.azurewebsites.net';\r\n";
            compilation += "var api = 'https://api-zamanimyok.azurewebsites.net';\r\n\r\n";
#endif

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

        [HttpGet]
        public string Script(string p1)
        {
            string script = "";

            if (Cache.Script != "")
            {
                script = Cache.Script;
            }
            else
            {
                List<string> config;

                FileStream stream;
                StreamReader reader;

                stream = new FileStream(Server.MapPath("/Files/config.json"), FileMode.Open, FileAccess.Read);
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

                Cache.Script = script;
            }

            Response.ContentType = "text/javascript";
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Cache.SetMaxAge(TimeSpan.FromSeconds(31568000));
            Response.Cache.SetRevalidation(HttpCacheRevalidation.None);

            return script;
        }

        [HttpGet]
        public string Module(string p1, string p2)
        {
            string script = "";
            string module = p2.ToLower();

            if (Cache.Modules.Keys.Contains(module))
            {
                script = Cache.Modules[module];
            }
            else
            {
                List<string> config;

                FileStream stream;
                StreamReader reader;

                stream = new FileStream(Server.MapPath("/Files/modules/" + module + "/config.json"), FileMode.Open, FileAccess.Read);
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

                Cache.Modules[module] = script;
            }

            Response.ContentType = "text/javascript";
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Cache.SetMaxAge(TimeSpan.FromSeconds(31568000));
            Response.Cache.SetRevalidation(HttpCacheRevalidation.None);

            return script;
        }

    }

}