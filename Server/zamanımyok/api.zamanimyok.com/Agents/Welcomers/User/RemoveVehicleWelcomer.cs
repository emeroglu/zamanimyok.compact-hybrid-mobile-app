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
    public class RemoveVehicleWelcomer : CorePostLoginWebAgent<RemoveVehiclePayload, RemoveVehicleDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            userVehicle userVehicle = Entities.userVehicles.FirstOrDefault(v => v.Present && v.PK == Package.payload.userVehicleFk);

            userVehicle.RemovalDate = DateTime.Now;
            userVehicle.RemovedBy = "RemoveVehicleWelcomer";
            userVehicle.Present = false;

            Entities.SaveChanges();

            Delivery.meta.status = "success";
            Delivery.meta.message = "Vehicle removed";
        }
    }

    public class RemoveVehiclePayload : CorePayload
    {
        public int userVehicleFk { get; set; }        
    }

    public class RemoveVehicleDelivery : CorePayload
    {
        
    }
}