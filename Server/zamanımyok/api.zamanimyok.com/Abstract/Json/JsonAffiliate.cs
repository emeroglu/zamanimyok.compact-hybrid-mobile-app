using api.zamanimyok.com.Abstract.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Abstract.Json
{
    public class JsonAffiliate : CoreJson
    {        
        public string icon { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public int distance { get; set; }
        public float price { get; set; }
    }
}