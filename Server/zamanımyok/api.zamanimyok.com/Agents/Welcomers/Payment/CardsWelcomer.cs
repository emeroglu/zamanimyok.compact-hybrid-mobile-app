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
    public class CardsWelcomer : CorePostLoginWebAgent<CardsPayload, CardsDelivery>
    {
        protected override void On_Instance_Invalidated()
        {
            
        }

        protected override void On_Instance_Validated()
        {
            List<payCard> cards = Entities.payCards.Where(c => c.Present && c.MemberFK == User.MemberFK).ToList();

            List<JsonCard> json = new List<JsonCard>();
            JsonCard jsonCard;

            foreach (payCard card in cards)
            {
                jsonCard = new JsonCard()
                {
                    pk = card.PK,
                    name = card.Name,
                    fullname = card.FullName,
                    number = card.Number,
                    expirydate = card.ExpiryDate,
                    ccv = card.CCV
                };

                json.Add(jsonCard);
            }

            Delivery.meta.status = "success";
            Delivery.meta.message = "Here are your cards";

            Delivery.payload.cards = json;
        }
    }

    public class CardsPayload : CorePayload
    {

    }

    public class CardsDelivery : CorePayload
    {
        public List<JsonCard> cards { get; set; }
    }
}