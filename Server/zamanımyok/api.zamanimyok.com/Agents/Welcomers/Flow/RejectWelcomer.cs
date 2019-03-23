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
    public class RejectWelcomer : CorePostLoginWebAgent<RejectPayload, RejectDelivery>
    {
        protected override void On_Instance_Invalidated()
        {
            
        }

        protected override void On_Instance_Validated()
        {
            if (Servant == null)
            {
                Delivery.meta.status = "not_allowed";
                Delivery.meta.message = "This endpoint is only allowed for servants";

                Delivery.payload = null;

                return;
            }

            flowRequest request = Entities.flowRequests.FirstOrDefault(r => r.Present && r.PK == Package.payload.requestFk);

            request.ServantFK = Servant.PK;
            request.StatusFK = 3;
            request.UpdateDate = DateTime.Now;
            request.UpdatedBy = "RejectWelcomer";

            flowReservation reservation = request.flowReservations.FirstOrDefault();

            reservation.StatusFK = 3;
            reservation.UpdateDate = DateTime.Now;
            reservation.UpdatedBy = "RejectWelcomer";

            Entities.SaveChanges();

            string email = request.userSelf.userDetails.FirstOrDefault(d => d.Present && d.KeyFK == 2).Value;

            new Postman()
            {
                Material = new PostmanMaterial()
                {
                    To = email,
                    Subject = "zamanımyok - (" + reservation.Number + ") Rezervasyon Onayı",
                    Body = "Rezervasyonunuz onaylanmadı..."
                },
                OnFinish = () =>
                {
                    Delivery.meta.status = "success";
                    Delivery.meta.message = "Reservation request rejected";
                },
                OnFail = (ex) =>
                {
                    Delivery.meta.status = "fail";
                    Delivery.meta.message = "Rejection mail could not be sent";
                }
            }
            .Send();
        }
    }

    public class RejectPayload : CorePayload
    {
        public int requestFk { get; set; }
    }

    public class RejectDelivery : CorePayload
    {
        
    }
}