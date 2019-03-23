using api.zamanimyok.com.Abstract;
using api.zamanimyok.com.Abstract.Core;
using api.zamanimyok.com.Agents;
using api.zamanimyok.com.Agents.Welcomers.Brands;
using api.zamanimyok.com.Agents.Welcomers.User;
using api.zamanimyok.com.Repository;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace api.zamanimyok.com.Controllers
{
    public class PaymentController : Controller
    {        
        [HttpPost]
        public void Cards()
        {
            new CardsWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }        

        [HttpPost]
        public void New_Card()
        {
            new NewCardWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Remove_Card()
        {
            new RemoveCardWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }
    }
}