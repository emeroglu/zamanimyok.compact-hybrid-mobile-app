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
    public class ReserveWelcomer : CorePostLoginWebAgent<ReservePayload, ReserveDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            if (User == null)
            {
                Delivery.meta.status = "not_allowed";
                Delivery.meta.message = "This endpoint is only allowed for users";

                Delivery.payload = null;

                return;
            }

            affSelf affiliate = Entities.affSelves.FirstOrDefault(a => a.Present && a.PK == Package.payload.affiliateFk);

            flowRequest request = new flowRequest()
            {
                InstanceFK = Instance.PK,
                UserFK = User.PK,
                AffiliateFK = Package.payload.affiliateFk,
                ServantFK = 0,
                ServiceFK = affiliate.affServices.FirstOrDefault().PK,
                StatusFK = 1,
                Extras = "",
                CreateDate = DateTime.Now,
                CreatedBy = "ReserveWelcomer",
                UpdateDate = DateTime.Now,
                UpdatedBy = "",
                RemovalDate = DateTime.Now,
                RemovedBy = "",
                Present = true
            };

            Entities.flowRequests.Add(request);
            Entities.SaveChanges();

            flowRequestDetail requestDetail;
            
            requestDetail = new flowRequestDetail()
            {
                RequestFK = request.PK,
                KeyFK = 1,
                Value = Package.payload.userVehicleFk.ToString(),
                Extras = "",
                CreateDate = DateTime.Now,
                CreatedBy = "ReserveWelcomer",
                UpdateDate = DateTime.Now,
                UpdatedBy = "",
                RemovalDate = DateTime.Now,
                RemovedBy = "",
                Present = true
            };

            Entities.flowRequestDetails.Add(requestDetail);

            requestDetail = new flowRequestDetail()
            {
                RequestFK = request.PK,
                KeyFK = 2,
                Value = Package.payload.takeOverAddressFk.ToString(),
                Extras = "",
                CreateDate = DateTime.Now,
                CreatedBy = "ReserveWelcomer",
                UpdateDate = DateTime.Now,
                UpdatedBy = "",
                RemovalDate = DateTime.Now,
                RemovedBy = "",
                Present = true
            };

            Entities.flowRequestDetails.Add(requestDetail);

            requestDetail = new flowRequestDetail()
            {
                RequestFK = request.PK,
                KeyFK = 3,
                Value = Package.payload.deliveryAddressFk.ToString(),
                Extras = "",
                CreateDate = DateTime.Now,
                CreatedBy = "ReserveWelcomer",
                UpdateDate = DateTime.Now,
                UpdatedBy = "",
                RemovalDate = DateTime.Now,
                RemovedBy = "",
                Present = true
            };

            Entities.flowRequestDetails.Add(requestDetail);

            requestDetail = new flowRequestDetail()
            {
                RequestFK = request.PK,
                KeyFK = 4,
                Value = Package.payload.note.ToString(),
                Extras = "",
                CreateDate = DateTime.Now,
                CreatedBy = "ReserveWelcomer",
                UpdateDate = DateTime.Now,
                UpdatedBy = "",
                RemovalDate = DateTime.Now,
                RemovedBy = "",
                Present = true
            };

            Entities.flowRequestDetails.Add(requestDetail);
            Entities.SaveChanges();

            flowReservation reservation = new flowReservation()
            {
                RequestFK = request.PK,
                StatusFK = 1,
                Number = new Random().Next(100000, 999999).ToString(),
                Extras = "",
                CreateDate = DateTime.Now,
                CreatedBy = "ReserveWelcomer",
                UpdateDate = DateTime.Now,
                UpdatedBy = "",
                RemovalDate = DateTime.Now,
                RemovedBy = "",
                Present = true
            };

            Entities.flowReservations.Add(reservation);
            Entities.SaveChanges();

            flowReservationDetail reservationDetail = new flowReservationDetail()
            {
                ReservationFK = reservation.PK,
                KeyFK = 1,
                Value = request.affService.affPricings.FirstOrDefault(p => p.Present).affPricingDetails.FirstOrDefault(p => p.Present && p.KeyFK == 1).Value,
                Extras = "",
                CreateDate = DateTime.Now,
                CreatedBy = "ReserveWelcomer",
                UpdateDate = DateTime.Now,
                UpdatedBy = "",
                RemovalDate = DateTime.Now,
                RemovedBy = "",
                Present = true
            };

            Entities.flowReservationDetails.Add(reservationDetail);
            Entities.SaveChanges();

            Delivery.meta.status = "success";
            Delivery.meta.message = "Reservation registered";
        }
    }

    public class ReservePayload : CorePayload
    {
        public int affiliateFk { get; set; }
        public int userVehicleFk { get; set; }
        public int takeOverAddressFk { get; set; }
        public int deliveryAddressFk { get; set; }
        public string note { get; set; }
    }

    public class ReserveDelivery : CorePayload
    {

    }
}