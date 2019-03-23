using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Repository
{
    public static class Config
    {
        public static string Azure_Account = "zamanimyok";
        public static string Azure_Access_Key = "JWz0KEDrcjvYEgD56TGmdCPCgXvlJyRN0BpJHfSvU+USO5gb1JnAyc8XBdWL8gUeLhqEfJRWCHvRHJulyYMywA==";

        public static string Azure_Photoshoot_Container = "photoshoot";

        public static string Azure_Temp_Path = "/Files/Uploads";
        public static string Azure_Temp_FileName = "/upload_{ticks}.png";
    }
}