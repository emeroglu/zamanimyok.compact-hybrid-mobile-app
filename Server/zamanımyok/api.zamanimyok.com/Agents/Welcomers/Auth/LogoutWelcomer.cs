using api.zamanimyok.com.Abstract;
using api.zamanimyok.com.Abstract.Core;
using api.zamanimyok.com.Abstract.Json;
using api.zamanimyok.com.Agents;
using api.zamanimyok.com.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace api.zamanimyok.com.Agents.Welcomers.Auth
{
    public class LogoutWelcomer : CorePostLoginWebAgent<LogoutPayload, LogoutDelivery>
    {
        protected override void On_Instance_Invalidated()
        {
            
        }

        protected override void On_Instance_Validated()
        {
            Instance.StatusFK = 3;
            Instance.UpdateDate = DateTime.Now;
            Instance.UpdatedBy = "LogoutWelcomer";
                        
            Entities.SaveChanges();

            Delivery.meta.status = "success";
            Delivery.meta.message = "Instance closed";
        }
    }

    public class LogoutPayload : CorePayload
    {
        
    }

    public class LogoutDelivery : CorePayload
    {
        
    }
}