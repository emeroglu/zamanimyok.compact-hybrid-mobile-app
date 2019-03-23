using api.zamanimyok.com.Abstract.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Abstract.Json
{
    public class JsonService : CoreJson
    {
        public string name { get; set; }
        public JsonPricing pricing { get; set; }                
    }
}