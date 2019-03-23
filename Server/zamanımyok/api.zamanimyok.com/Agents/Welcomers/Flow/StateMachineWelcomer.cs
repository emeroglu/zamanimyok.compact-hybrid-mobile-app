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
    public class StateMachineWelcomer : CorePostLoginWebAgent<StateMachinePayload, StateMachineDelivery>
    {
        protected override void On_Instance_Invalidated()
        {
            
        }

        protected override void On_Instance_Validated()
        {
            flowReservation reservation = Entities.flowReservations.FirstOrDefault(r => r.Present && r.PK == Package.payload.reservationFk);

            reservation.StatusFK = Package.payload.statusFk;
            reservation.UpdateDate = DateTime.Now;
            reservation.UpdatedBy = "StateMachineWelcomer";

            Entities.SaveChanges();

            Delivery.meta.status = "success";
            Delivery.meta.message = "Reservation status changed";
        }
    }

    public class StateMachinePayload : CorePayload
    {
        public int reservationFk { get; set; }
        public int statusFk { get; set; }
    }

    public class StateMachineDelivery : CorePayload
    {
        
    }
}