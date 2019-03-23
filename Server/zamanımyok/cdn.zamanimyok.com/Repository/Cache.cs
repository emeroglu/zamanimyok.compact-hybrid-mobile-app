using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cdn.zamanimyok.com.Repository
{
    public class Cache
    {
        public static DateTime Start;
        public static DateTime Last_Alive;
        public static DateTime Last_Refresh;

        public static class File
        {
            public static Dictionary<string, FileContentResult> Images;
            public static Dictionary<string, FileContentResult> FontAwesome;
            public static Dictionary<string, FileContentResult> Fonts;
            public static string Styles;
            public static string Angular;
            public static string Script;            
        }

        public static class Web
        {
            public static string Script;
            public static Dictionary<string, string> Templates;
        }
    }
}