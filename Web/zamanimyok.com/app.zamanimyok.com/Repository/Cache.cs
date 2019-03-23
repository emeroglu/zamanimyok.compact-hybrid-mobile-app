using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace app.zamanimyok.com.Repository
{
    public class Cache
    {
        public static DateTime Start;
        public static DateTime Last_Alive;
        public static DateTime Last_Refresh;

        public static string Script;
        public static Dictionary<string,string> Modules;
    }
}