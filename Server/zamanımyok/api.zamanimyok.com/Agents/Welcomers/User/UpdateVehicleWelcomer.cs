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
    public class UpdateVehicleWelcomer : CorePostLoginWebAgent<UpdateVehiclePayload, UpdateVehicleDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            userVehicle userVehicle = Entities.userVehicles.FirstOrDefault(v => v.Present && v.PK == Package.payload.userVehicleFk);
            userVehicleDetail userVehicleDetail = userVehicle.userVehicleDetails.FirstOrDefault(d => d.Present && d.KeyFK == 1);

            userVehicleDetail.Value = Package.payload.plate;

            userVehicleDetail.UpdateDate = DateTime.Now;
            userVehicleDetail.UpdatedBy = "UpdateVehicleWelcomer";

            Entities.SaveChanges();

            Delivery.meta.status = "success";
            Delivery.meta.message = "Vehicle detail updated";
        }
    }

    public class UpdateVehiclePayload : CorePayload
    {
        public int userVehicleFk { get; set; }
        public string plate { get; set; }
    }

    public class UpdateVehicleDelivery : CorePayload
    {
        
    }
}