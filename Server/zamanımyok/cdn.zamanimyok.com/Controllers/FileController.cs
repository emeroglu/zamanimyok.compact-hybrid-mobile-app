using cdn.zamanimyok.com.Repository;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cdn.zamanimyok.com.Controllers
{
    public class FileController : Controller
    {
        private static CultureInfo culture = new CultureInfo("en-US");

        [HttpGet]
        public ActionResult Image(string p1, string p2)
        {
            FileContentResult image;

            if (Cache.File.Images.Keys.Contains(p2))
            {
                image = Cache.File.Images[p2];
            }
            else
            {
                List<string> listPaths = new List<string>();

                listPaths.AddRange(Directory.GetFiles(Server.MapPath("/Files/Images/Affiliates")).ToList());
                listPaths.AddRange(Directory.GetFiles(Server.MapPath("/Files/Images/Backgrounds")).ToList());
                listPaths.AddRange(Directory.GetFiles(Server.MapPath("/Files/Images/Brands")).ToList());                
                listPaths.AddRange(Directory.GetFiles(Server.MapPath("/Files/Images/Gifs")).ToList());
                listPaths.AddRange(Directory.GetFiles(Server.MapPath("/Files/Images/Icons")).ToList());
                listPaths.AddRange(Directory.GetFiles(Server.MapPath("/Files/Images/Logo")).ToList());
                listPaths.AddRange(Directory.GetFiles(Server.MapPath("/Files/Images/Servants")).ToList());

                string path = listPaths.FirstOrDefault(p => p.Split('\\').Last().Split('.')[0] == p2.ToLower(culture));

                if (path == null) return null;

                string extension = path.Split('\\').Last().Split('.').Last();

                byte[] bytes = System.IO.File.ReadAllBytes(path);

                string contentType = "image/" + ((extension == "png" || extension == "gif") ? extension : "jpeg");

                image = File(bytes, contentType);

                Cache.File.Images[p2] = image;
            }

            Response.ContentType = image.ContentType;
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Cache.SetMaxAge(TimeSpan.FromSeconds(31568000));
            Response.Cache.SetRevalidation(HttpCacheRevalidation.None);

            return image;
        }

        [HttpGet]
        public ActionResult FontAwesome(string p1, string p2)
        {
            FileContentResult font;

            if (Cache.File.FontAwesome.Keys.Contains(p2))
            {
                font = Cache.File.FontAwesome[p2];
            }
            else
            {
                byte[] bytes = System.IO.File.ReadAllBytes(Server.MapPath("/Files/Fonts/font-awesome/" + p2 + ".woff2"));

                string contentType = "font/x-woff2";

                font = File(bytes, contentType);

                Cache.File.FontAwesome[p2] = font;
            }

            Response.ContentType = font.ContentType;
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Cache.SetMaxAge(TimeSpan.FromSeconds(31568000));
            Response.Cache.SetRevalidation(HttpCacheRevalidation.None);

            return font;
        }

        [HttpGet]
        public ActionResult Font(string p1, string p2)
        {
            FileContentResult font;

            if (Cache.File.Fonts.Keys.Contains(p2))
            {
                font = Cache.File.Fonts[p2];
            }
            else
            {
                byte[] bytes = System.IO.File.ReadAllBytes(Server.MapPath("/Files/Fonts/Exo 2/" + p2.ToLower() + ".woff2"));

                string contentType = "font/x-woff2";

                font = File(bytes, contentType);

                Cache.File.Fonts[p2] = font;
            }

            Response.ContentType = font.ContentType;
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Cache.SetMaxAge(TimeSpan.FromSeconds(31568000));
            Response.Cache.SetRevalidation(HttpCacheRevalidation.None);

            return font;
        }

        [HttpGet]
        public string Styles(string p1)
        {
            string styles = "";

            if (Cache.File.Styles != "")
            {
                styles = Cache.File.Styles;
            }
            else
            {
                List<string> listStyles = new List<string>();

                listStyles.Add("/Files/Styles/font-awesome/fontawesome-all.css");
                listStyles.Add("/Files/Styles/exo2.css");
                listStyles.Add("/Files/Styles/main.css");

                FileStream stream;
                StreamReader reader;

                foreach (string style in listStyles)
                {
                    stream = new FileStream(Server.MapPath(style), FileMode.Open, FileAccess.Read);
                    reader = new StreamReader(stream);

                    styles += reader.ReadToEnd() + "\r\n\r\n";

                    stream.Flush();
                    stream.Close();

                    stream.Dispose();
                    reader.Dispose();
                }

                styles = styles.Replace("{version}", p1);

                Cache.File.Styles = styles;
            }

            Response.ContentType = "text/css";
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Cache.SetMaxAge(TimeSpan.FromSeconds(31568000));
            Response.Cache.SetRevalidation(HttpCacheRevalidation.None);

            return styles;
        }

        [HttpGet]
        public string Angular(string p1)
        {
            string script = "";

            if (Cache.File.Angular != "")
            {
                script = Cache.File.Angular;
            }
            else
            {
                FileStream stream = new FileStream(Server.MapPath("/Files/Scripts/libs/angular.js"), FileMode.Open, FileAccess.Read);
                StreamReader reader = new StreamReader(stream);

                script = reader.ReadToEnd() + "\r\n\r\n";

                stream.Flush();
                stream.Close();

                stream.Dispose();
                reader.Dispose();

                Cache.File.Angular = script;
            }

            Response.ContentType = "text/javascript";
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Cache.SetMaxAge(TimeSpan.FromSeconds(31568000));
            Response.Cache.SetRevalidation(HttpCacheRevalidation.None);

            return script;
        }

        [HttpGet]
        public string Script(string p1)
        {
            string script = "";

            if (Cache.File.Script != "")
            {
                script = Cache.File.Script;
            }
            else
            {
                List<string> listScripts = new List<string>();

                listScripts.Add("/Files/Scripts/libs/angular.js");

                listScripts.Add("/Files/Scripts/proto.js");
                listScripts.Add("/Files/Scripts/app.js");

                listScripts.Add("/Files/Scripts/services/bcast.js");
                listScripts.Add("/Files/Scripts/services/css.js");
                listScripts.Add("/Files/Scripts/services/data.js");
                listScripts.Add("/Files/Scripts/services/eval.js");
                listScripts.Add("/Files/Scripts/services/img.js");
                listScripts.Add("/Files/Scripts/services/lexicon.js");                                
                listScripts.Add("/Files/Scripts/services/platform.js");
                listScripts.Add("/Files/Scripts/services/style.js");                
                listScripts.Add("/Files/Scripts/services/view.js");

                listScripts.Add("/Files/Scripts/directives/attributes/click.js");
                listScripts.Add("/Files/Scripts/directives/attributes/if.js");
                listScripts.Add("/Files/Scripts/directives/attributes/lexicon.js");
                listScripts.Add("/Files/Scripts/directives/attributes/text.js");

                FileStream stream;
                StreamReader reader;

                foreach (string s in listScripts)
                {
                    stream = new FileStream(Server.MapPath(s), FileMode.Open, FileAccess.Read);
                    reader = new StreamReader(stream);

                    script += reader.ReadToEnd() + "\r\n\r\n";

                    stream.Flush();
                    stream.Close();

                    stream.Dispose();
                    reader.Dispose();
                }

                Cache.File.Script = script;
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