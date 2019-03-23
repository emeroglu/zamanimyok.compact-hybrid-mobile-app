using api.zamanimyok.com.Abstract.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Abstract.Json
{
    public class JsonPricing : CoreJson
    {
        public string key { get; set; }
        public float value { get; set; }        
    }
}