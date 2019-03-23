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
    public class NewAddressWelcomer : CorePostLoginWebAgent<NewAddressPayload, NewAddressDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            userAddress address = new userAddress()
            {
                Name = Package.payload.name,
                Value = Package.payload.value,
                Extras = "",
                CreateDate = DateTime.Now,
                CreatedBy = "NewAddressWelcomer",
                UpdateDate = DateTime.Now,
                UpdatedBy = "",
                RemovalDate = DateTime.Now,
                RemovedBy = "",
                Present = true
            };

            User.userAddresses.Add(address);
            Entities.SaveChanges();
            
            Delivery.meta.status = "success";
            Delivery.meta.message = "Address added for your user";
        }
    }

    public class NewAddressPayload : CorePayload
    {
        public string name { get; set; }
        public string value { get; set; }
    }

    public class NewAddressDelivery : CorePayload
    {

    }
}