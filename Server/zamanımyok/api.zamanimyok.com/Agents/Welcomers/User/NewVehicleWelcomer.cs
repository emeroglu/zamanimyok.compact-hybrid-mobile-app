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
    public class NewVehicleWelcomer : CorePostLoginWebAgent<NewVehiclePayload, NewVehicleDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            userVehicle userVehicle = new userVehicle()
            {
                UserFK = User.PK,
                VehicleFK = Package.payload.vehicleFk,
                Extras = "",
                CreateDate = DateTime.Now,
                CreatedBy = "NewVehicleWelcomer",
                UpdateDate = DateTime.Now,
                UpdatedBy = "",
                RemovalDate = DateTime.Now,
                RemovedBy = "",
                Present = true
            };

            Entities.userVehicles.Add(userVehicle);
            Entities.SaveChanges();

            userVehicleDetail userVehicleDetail = new userVehicleDetail()
            {
                UserVehicleFK = userVehicle.PK,
                KeyFK = 1,
                Value = Package.payload.plate,
                Extras = "",
                CreateDate = DateTime.Now,
                CreatedBy = "NewVehicleWelcomer",
                UpdateDate = DateTime.Now,
                UpdatedBy = "",
                RemovalDate = DateTime.Now,
                RemovedBy = "",
                Present = true
            };

            Entities.userVehicleDetails.Add(userVehicleDetail);
            Entities.SaveChanges();

            Delivery.meta.status = "success";
            Delivery.meta.message = "Vehicle added for your user";
        }
    }

    public class NewVehiclePayload : CorePayload
    {
        public int vehicleFk { get; set; }
        public string plate { get; set; }
    }

    public class NewVehicleDelivery : CorePayload
    {

    }
}