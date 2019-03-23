using api.zamanimyok.com.Abstract.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Abstract.Json
{
    public class JsonAddress : CoreJson
    {
        public string name { get; set; }
        public string value { get; set; }        
    }
}