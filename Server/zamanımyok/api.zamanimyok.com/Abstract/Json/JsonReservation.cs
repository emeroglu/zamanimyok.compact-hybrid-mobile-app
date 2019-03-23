using api.zamanimyok.com.Abstract.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Abstract.Json
{
    public class JsonReservation : CoreJson
    {
        public string number { get; set; }
        public JsonRequest request { get; set; }
        public float price { get; set; }
        public string status { get; set; }
        public string date { get; set; }
    }
}