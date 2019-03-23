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
    public class RemoveAddressWelcomer : CorePostLoginWebAgent<RemoveAddressPayload, RemoveAddressDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            userAddress address = User.userAddresses.FirstOrDefault(a => a.Present && a.PK == Package.payload.addressFk);

            address.RemovalDate = DateTime.Now;
            address.RemovedBy = "RemoveAddressWelcomer";
            address.Present = false;            

            Entities.SaveChanges();

            Delivery.meta.status = "success";
            Delivery.meta.message = "Address removed";
        }
    }

    public class RemoveAddressPayload : CorePayload
    {
        public int addressFk { get; set; }        
    }

    public class RemoveAddressDelivery : CorePayload
    {
        
    }
}