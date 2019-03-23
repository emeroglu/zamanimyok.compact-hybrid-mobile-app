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
    public class RequestsWelcomer : CorePostLoginWebAgent<RequestsPayload, RequestsDelivery>
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

            affSelf affiliate = Servant.affSelf;

            List<flowRequest> listRequests = affiliate.flowRequests.Where(r => r.Present && r.ServantFK == 0 && r.StatusFK == 1).ToList();

            List<JsonRequest> json = new List<JsonRequest>();
            JsonRequest jsonRequest;

            affLocation location;
            affService service;            
            userVehicle vehicle;
            vhcBrand brand;
            userAddress takeOverAddress, deliveryAddress;
            string note;

            foreach (flowRequest request in listRequests)
            {
                location = affiliate.affLocation;
                service = request.affService;                
                int userVehicleFK = int.Parse(request.flowRequestDetails.FirstOrDefault(r => r.Present && r.KeyFK == 1).Value);
                vehicle = Entities.userVehicles.FirstOrDefault(v => v.Present && v.PK == userVehicleFK);
                brand = vehicle.vhcSelf.vhcBrand;
                int takeOverAddressFk = int.Parse(request.flowRequestDetails.FirstOrDefault(d => d.Present && d.KeyFK == 2).Value);
                int deliveryAddressFk = int.Parse(request.flowRequestDetails.FirstOrDefault(d => d.Present && d.KeyFK == 3).Value);
                takeOverAddress = Entities.userAddresses.FirstOrDefault(a => a.Present && a.PK == takeOverAddressFk);
                deliveryAddress = Entities.userAddresses.FirstOrDefault(a => a.Present && a.PK == deliveryAddressFk);
                note = request.flowRequestDetails.FirstOrDefault(d => d.Present && d.KeyFK == 4).Value;

                jsonRequest = new JsonRequest()
                {
                    pk = request.PK,
                    number = request.flowReservations.FirstOrDefault().Number,
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
                    servant = new JsonServant()
                    {
                        pk = 0
                    },
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
                    note = note,
                    status = request.flowRequestState.Value,
                    date = request.CreateDate.ToString("dd.MM.yyyy HH:mm")
                };

                json.Add(jsonRequest);
            }

            Delivery.meta.status = "success";
            Delivery.meta.message = "Here are the reservation requests for your servant";

            Delivery.payload.requests = json;
        }
    }

    public class RequestsPayload : CorePayload
    {

    }

    public class RequestsDelivery : CorePayload
    {
        public List<JsonRequest> requests { get; set; }
    }
}