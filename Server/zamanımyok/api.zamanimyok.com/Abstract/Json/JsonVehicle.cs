using api.zamanimyok.com.Abstract.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Abstract.Json
{
    public class JsonVehicle : CoreJson
    {
        public int vehicleFk { get; set; }
        public JsonBrand brand { get; set; }
        public string model { get; set; }
        public string plate { get; set; }
    }
}