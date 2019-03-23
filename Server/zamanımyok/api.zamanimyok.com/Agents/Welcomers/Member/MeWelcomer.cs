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

namespace api.zamanimyok.com.Agents.Welcomers.Member
{
    public class MeWelcomer : CorePostLoginWebAgent<MePayload, MeDelivery>
    {
        protected override void On_Instance_Invalidated()
        {
            
        }

        protected override void On_Instance_Validated()
        {
            Delivery.payload.member = new JsonMember();
            Delivery.payload.member.pk = Instance.authMember.PK;
            Delivery.payload.member.role = Instance.authMember.authRole.Value;

            Delivery.meta.status = "success";
            Delivery.meta.message = "";
        }
    }

    public class MePayload : CorePayload
    {

    }

    public class MeDelivery : CorePayload
    {
        public JsonMember member { get; set; }
    }
}