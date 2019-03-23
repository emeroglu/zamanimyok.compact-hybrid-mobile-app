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
    public class VehiclesWelcomer : CorePostLoginWebAgent<VehiclesPayload, VehiclesDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            List<JsonVehicle> json = new List<JsonVehicle>();

            List<userVehicle> userVehicles = User.userVehicles.Where(v => v.Present).ToList();

            vhcSelf vehicle;
            vhcBrand brand;            

            JsonVehicle jsonVehicle;

            foreach (userVehicle userVehicle in userVehicles)
            {
                vehicle = userVehicle.vhcSelf;
                brand = vehicle.vhcBrand;                

                jsonVehicle = new JsonVehicle()
                {
                    pk = userVehicle.PK,                    
                    vehicleFk = vehicle.PK,
                    brand = new JsonBrand()
                    {
                        pk = brand.PK,
                        name = brand.Name,
                        image = brand.Image
                    },
                    model = vehicle.Model,
                    plate = userVehicle.userVehicleDetails.FirstOrDefault(d => d.Present && d.KeyFK == 1).Value
                };

                json.Add(jsonVehicle);
            }

            Delivery.meta.status = "success";
            Delivery.meta.message = "Here are all vehicles for your user";

            Delivery.payload.vehicles = json;
        }
    }

    public class VehiclesPayload : CorePayload
    {

    }

    public class VehiclesDelivery : CorePayload
    {
        public List<JsonVehicle> vehicles { get; set; }
    }
}