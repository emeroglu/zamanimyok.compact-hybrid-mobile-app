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
    public class AllWelcomer : CorePostLoginWebAgent<AllPayload, AllDelivery>
    {
        protected override void On_Instance_Invalidated()
        {
            
        }

        protected override void On_Instance_Validated()
        {
            List<vhcBrand> listBrands = Entities.vhcBrands.Where(b => b.Present).ToList();

            List<JsonBrand> json = new List<JsonBrand>();
            JsonBrand jsonBrand;

            foreach (vhcBrand brand in listBrands)
            {
                jsonBrand = new JsonBrand()
                {
                    pk = brand.PK,
                    name = brand.Name,
                    image = brand.Image
                };

                json.Add(jsonBrand);
            }

            Delivery.meta.status = "success";
            Delivery.meta.message = "Here are all brands";

            Delivery.payload.brands = json;
        }
    }

    public class AllPayload : CorePayload
    {

    }

    public class AllDelivery : CorePayload
    {
        public List<JsonBrand> brands { get; set; }
    }
}