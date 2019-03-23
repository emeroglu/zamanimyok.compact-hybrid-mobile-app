using api.zamanimyok.com.Abstract.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Abstract.Json
{
    public class JsonCard : CoreJson
    {
        public string name { get; set; }
        public string fullname { get; set; }
        public string number { get; set; }
        public string expirydate { get; set; }
        public int ccv { get; set; }
    }
}