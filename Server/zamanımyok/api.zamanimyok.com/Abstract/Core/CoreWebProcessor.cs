using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using api.zamanimyok.com.Abstract.Tools;
using api.zamanimyok.com.Models;

namespace api.zamanimyok.com.Abstract.Core
{
    public abstract class CoreWebProcessor<PayloadType, DeliveryPayloadType> : CoreProcessor<WebMaterial> where PayloadType : CorePayload where DeliveryPayloadType : CorePayload
    {              
        private string Body { get; set; }

        protected Entities Entities { get; set; }

        protected PayloadType Payload { get; set; }
        protected CoreDelivery<DeliveryPayloadType> Delivery { get; set; }

        public void Welcome()
        {
            Perform();
        }

        protected override bool Condition()
        {
            return true;
        }

        protected override void OnInterruption()
        {

        }

        protected override void Job()
        {            
            OnFail = (ex) =>
            {
                Delivery.meta.status = "error";
                Delivery.meta.message = ex.Message;

                Delivery.payload = null;
            };

            Extract_Body();

            Payload = new JavaScriptSerializer().Deserialize<PayloadType>(Body);
            Delivery = (CoreDelivery<DeliveryPayloadType>)Activator.CreateInstance(typeof(CoreDelivery<DeliveryPayloadType>));
            Delivery.meta = new CoreDeliveryMeta();
            Delivery.payload = (DeliveryPayloadType)Activator.CreateInstance(typeof(DeliveryPayloadType));

            Entities = new Entities();

            listTasks = Tasks();

            TakeAction(0, null);

            Material.Response.Headers.Add("Access-Control-Allow-Origin", "*");            

            Material.Response.ContentType = "application/json";
            Material.Response.Write(new JavaScriptSerializer().Serialize(Delivery));          

        }

        private void Extract_Body()
        {
            StreamReader reader = new StreamReader(Material.Request.InputStream, Encoding.UTF8);
            Body = reader.ReadToEnd();
            reader.Close();
        }
    }

    public class WebProcessorMaterial : WebMaterial
    {
        
    }    

}