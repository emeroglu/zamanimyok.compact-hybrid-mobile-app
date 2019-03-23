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

namespace api.zamanimyok.com.Agents.Welcomers.Affiliates
{
    public class AllWelcomer : CorePostLoginWebAgent<AllPayload, AllDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            List<affSelf> listAffiliates = Entities.affSelves.Where(b => b.Present).ToList();

            List<JsonAffiliate> json = new List<JsonAffiliate>();
            JsonAffiliate jsonAffiliate;

            affLocation location;            

            foreach (affSelf affiliate in listAffiliates)
            {
                location = affiliate.affLocation;

                jsonAffiliate = new JsonAffiliate()
                {
                    pk = affiliate.PK,
                    icon = affiliate.affDetails.FirstOrDefault(d => d.Present && d.KeyFK == 1).Value,
                    address = location.Address,
                    latitude = location.Latitude,
                    longitude = location.Longitude,
                    name = affiliate.Name,
                    distance = 30,
                    price = float.Parse(affiliate.affServices.FirstOrDefault().affPricings.FirstOrDefault().affPricingDetails.FirstOrDefault().Value)
                };

                json.Add(jsonAffiliate);
            }

            Delivery.meta.status = "success";
            Delivery.meta.message = "Here are all affiliates";

            Delivery.payload.affiliates = json;
        }
    }

    public class AllPayload : CorePayload
    {

    }

    public class AllDelivery : CorePayload
    {
        public List<JsonAffiliate> affiliates { get; set; }
    }
}