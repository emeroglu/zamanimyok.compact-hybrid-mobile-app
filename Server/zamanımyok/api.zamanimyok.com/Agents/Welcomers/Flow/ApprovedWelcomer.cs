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
    public class ApprovedsWelcomer : CorePostLoginWebAgent<ApprovedsPayload, ApprovedsDelivery>
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

            DateTime limit = DateTime.Now.Subtract(new TimeSpan(3, 0, 0, 0));
            List<flowReservation> listReservations = Entities.flowReservations.Where(r => r.Present && r.flowRequest.ServantFK == Servant.PK && r.StatusFK != 1 && r.StatusFK != 3 && limit < r.CreateDate).OrderByDescending(r => r.CreateDate).ToList();

            List<JsonReservation> json = new List<JsonReservation>();
            JsonReservation jsonReservation;

            flowRequest request;
            affSelf affiliate;
            affLocation location;
            affService service;
            serSelf servant;
            userVehicle vehicle;
            vhcBrand brand;
            userAddress takeOverAddress, deliveryAddress;

            JsonServant jsonServant;

            foreach (flowReservation reservation in listReservations)
            {
                request = reservation.flowRequest;
                affiliate = request.affSelf;
                location = affiliate.affLocation;
                service = request.affService;                
                int userVehicleFK = int.Parse(request.flowRequestDetails.FirstOrDefault(r => r.Present && r.KeyFK == 1).Value);
                vehicle = Entities.userVehicles.FirstOrDefault(v => v.Present && v.PK == userVehicleFK);
                brand = vehicle.vhcSelf.vhcBrand;
                int takeOverAddressFk = int.Parse(request.flowRequestDetails.FirstOrDefault(d => d.Present && d.KeyFK == 2).Value);
                int deliveryAddressFk = int.Parse(request.flowRequestDetails.FirstOrDefault(d => d.Present && d.KeyFK == 3).Value);
                takeOverAddress = Entities.userAddresses.FirstOrDefault(a => a.Present && a.PK == takeOverAddressFk);
                deliveryAddress = Entities.userAddresses.FirstOrDefault(a => a.Present && a.PK == deliveryAddressFk);

                if (request.ServantFK == 0)
                {
                    jsonServant = new JsonServant()
                    {
                        pk = 0
                    };
                }
                else
                {
                    servant = request.serSelf;

                    jsonServant = new JsonServant()
                    {
                        pk = servant.PK,
                        name = servant.serDetails.FirstOrDefault(s => s.KeyFK == 1).Value,
                        email = servant.serDetails.FirstOrDefault(s => s.KeyFK == 2).Value,
                        phone = servant.serDetails.FirstOrDefault(s => s.KeyFK == 3).Value,
                        photo = servant.serDetails.FirstOrDefault(s => s.KeyFK == 4).Value
                    };
                }

                jsonReservation = new JsonReservation()
                {
                    pk = reservation.PK,
                    number = reservation.Number,
                    request = new JsonRequest()
                    {
                        pk = request.PK,
                        number = reservation.Number,
                        affiliate = new JsonAffiliate()
                        {
                            pk = affiliate.PK,
                            icon = affiliate.affDetails.FirstOrDefault(d => d.Present && d.KeyFK == 1).Value,
                            address = location.Address,
                            latitude = location.Latitude,
                            longitude = location.Longitude,
                            name = affiliate.Name,
                            distance = 30,
                            price = float.Parse(affiliate.affServices.FirstOrDefault().affPricings.FirstOrDefault().affPricingDetails.FirstOrDefault().Value)
                        },
                        service = new JsonService()
                        {
                            pk = service.PK,
                            name = service.Name,
                            pricing = new JsonPricing()
                            {
                                pk = service.affPricings.FirstOrDefault().PK,
                                key = service.affPricings.FirstOrDefault().affPricingDetails.FirstOrDefault().affPricingKey.Value,
                                value = float.Parse(service.affPricings.FirstOrDefault().affPricingDetails.FirstOrDefault().Value)
                            }
                        },
                        servant = jsonServant,
                        vehicle = new JsonVehicle()
                        {
                            pk = vehicle.PK,
                            vehicleFk = vehicle.vhcSelf.PK,
                            brand = new JsonBrand()
                            {
                                pk = brand.PK,
                                name = brand.Name,
                                image = brand.Image
                            },
                            model = vehicle.vhcSelf.Model,
                            plate = vehicle.userVehicleDetails.FirstOrDefault(d => d.Present && d.KeyFK == 1).Value
                        },
                        takeOverAddress = new JsonAddress()
                        {
                            pk = takeOverAddress.PK,
                            name = takeOverAddress.Name,
                            value = takeOverAddress.Value
                        },
                        deliveryAddress = new JsonAddress()
                        {
                            pk = deliveryAddress.PK,
                            name = deliveryAddress.Name,
                            value = deliveryAddress.Value
                        },
                        status = request.flowRequestState.Value,
                        date = request.CreateDate.ToString("dd.MM.yyyy HH:mm")
                    },
                    price = float.Parse(reservation.flowReservationDetails.FirstOrDefault(d => d.Present && d.KeyFK == 1).Value),
                    status = reservation.flowState.Value,
                    date = reservation.CreateDate.ToString("dd.MM.yyyy HH:mm")
                };

                json.Add(jsonReservation);
            }

            Delivery.meta.status = "success";
            Delivery.meta.message = "Here are active approved reservations for your servant";

            Delivery.payload.reservations = json;
        }
    }

    public class ApprovedsPayload : CorePayload
    {

    }

    public class ApprovedsDelivery : CorePayload
    {
        public List<JsonReservation> reservations { get; set; }
    }
}