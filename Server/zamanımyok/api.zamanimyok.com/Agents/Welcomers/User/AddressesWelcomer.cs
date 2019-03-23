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
    public class AddressesWelcomer : CorePostLoginWebAgent<AddressesPayload, AddressesDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            List<JsonAddress> json = new List<JsonAddress>();

            List<userAddress> addresses = User.userAddresses.Where(a => a.Present).ToList();

            JsonAddress jsonAddress;

            foreach (userAddress address in addresses)
            {
                jsonAddress = new JsonAddress()
                {
                    pk = address.PK,
                    name = address.Name,
                    value = address.Value
                };

                json.Add(jsonAddress);
            }

            Delivery.meta.status = "success";
            Delivery.meta.message = "Here are all addresses for your user";

            Delivery.payload.addresses = json;
        }
    }

    public class AddressesPayload : CorePayload
    {

    }

    public class AddressesDelivery : CorePayload
    {
        public List<JsonAddress> addresses { get; set; }
    }
}