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
    public class UpdateAddressWelcomer : CorePostLoginWebAgent<UpdateAddressPayload, UpdateAddressDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            userAddress address = User.userAddresses.FirstOrDefault(a => a.Present && a.PK == Package.payload.addressFk);

            address.Name = Package.payload.name;
            address.Value = Package.payload.value;

            address.UpdateDate = DateTime.Now;
            address.UpdatedBy = "UpdateAddressWelcomer";

            Entities.SaveChanges();

            Delivery.meta.status = "success";
            Delivery.meta.message = "Address updated";
        }
    }

    public class UpdateAddressPayload : CorePayload
    {
        public int addressFk { get; set; }
        public string name { get; set; }
        public string value { get; set; }
    }

    public class UpdateAddressDelivery : CorePayload
    {
        
    }
}