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

namespace api.zamanimyok.com.Agents.Welcomers.Brands
{
    public class BrandWelcomer : CorePostLoginWebAgent<BrandPayload, BrandDelivery>
    {
        protected override void On_Instance_Invalidated()
        {
            
        }

        protected override void On_Instance_Validated()
        {
            List<vhcSelf> listVehicles = Entities.vhcSelves.Where(m => m.Present && m.BrandFK == Package.payload.brandFk).ToList();

            List<JsonModel> json = new List<JsonModel>();
            JsonModel jsonModel;

            foreach (vhcSelf vehicle in listVehicles)
            {
                jsonModel = new JsonModel()
                {
                    pk = vehicle.PK,
                    name = vehicle.Model
                };

                json.Add(jsonModel);
            }

            Delivery.meta.status = "success";
            Delivery.meta.message = "Here are the models for your brand";

            Delivery.payload.models = json;
        }
    }

    public class BrandPayload : CorePayload
    {
        public int brandFk { get; set; }
    }

    public class BrandDelivery : CorePayload
    {
        public List<JsonModel> models { get; set; }
    }
}