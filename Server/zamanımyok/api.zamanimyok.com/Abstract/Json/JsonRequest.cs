using api.zamanimyok.com.Abstract.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Abstract.Json
{
    public class JsonRequest : CoreJson
    {
        public string number { get; set; }
        public JsonAffiliate affiliate { get; set; }
        public JsonServant servant { get; set; }
        public JsonService service { get; set; }
        public JsonVehicle vehicle { get; set; }
        public JsonAddress takeOverAddress { get; set; }
        public JsonAddress deliveryAddress { get; set; }
        public string note { get; set; }
        public string status { get; set; }
        public string date { get; set; }
    }
}