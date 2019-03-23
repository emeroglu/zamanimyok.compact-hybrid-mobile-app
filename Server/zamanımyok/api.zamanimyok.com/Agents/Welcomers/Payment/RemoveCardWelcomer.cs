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
    public class RemoveCardWelcomer : CorePostLoginWebAgent<RemoveCardPayload, RemoveCardDelivery>
    {
        protected override void On_Instance_Invalidated()
        {

        }

        protected override void On_Instance_Validated()
        {
            payCard card = Entities.payCards.FirstOrDefault(p => p.Present && p.PK == Package.payload.cardFk);

            if (card == null)
            {
                Delivery.meta.status = "not_found";
                Delivery.meta.message = "Card does not exist";

                Delivery.payload = null;
            }
            else
            {
                card.RemovalDate = DateTime.Now;
                card.RemovedBy = "RemoveCardWelcomer";
                card.Present = false;

                Entities.SaveChanges();

                Delivery.meta.status = "success";
                Delivery.meta.message = "Card removed";
            }
        }
    }

    public class RemoveCardPayload : CorePayload
    {
        public int cardFk { get; set; }
    }

    public class RemoveCardDelivery : CorePayload
    {

    }
}