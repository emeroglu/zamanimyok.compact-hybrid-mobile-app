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

namespace api.zamanimyok.com.Agents.Welcomers.User
{
    public class MeWelcomer : CorePostLoginWebAgent<MePayload, MeDelivery>
    {
        protected override void On_Instance_Invalidated()
        {
            
        }

        protected override void On_Instance_Validated()
        {
            Delivery.payload.user = new JsonUser();

            List<userDetail> details = User.userDetails.ToList();

            foreach (userDetail detail in details)
            {
                if (detail.KeyFK == 1)
                    Delivery.payload.user.name = detail.Value;
                else if (detail.KeyFK == 2)
                    Delivery.payload.user.email = detail.Value;
                else if (detail.KeyFK == 3)
                    Delivery.payload.user.phone = detail.Value;
            }

            Delivery.meta.status = "success";
            Delivery.meta.message = "Here you are";
        }
    }

    public class MePayload : CorePayload
    {

    }

    public class MeDelivery : CorePayload
    {
        public JsonUser user { get; set; }
    }
}