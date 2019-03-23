using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api.zamanimyok.com.Abstract.Core
{
    public class CoreDelivery<PayloadType> where PayloadType : CorePayload
    {
        public CoreDeliveryMeta meta { get; set; }
        public PayloadType payload { get; set; }
    }

    public class CoreDeliveryMeta
    {
        public string status { get; set; }
        public string message { get; set; }
    }

    public class CorePayload
    {
        
    }

    public class PostLoginPayload<PayloadType> : CorePayload where PayloadType : CorePayload
    {
        public string key { get; set; }
        public PayloadType payload { get; set; }
    }
}