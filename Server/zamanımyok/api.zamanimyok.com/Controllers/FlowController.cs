using api.zamanimyok.com.Abstract;
using api.zamanimyok.com.Abstract.Core;
using api.zamanimyok.com.Agents;
using api.zamanimyok.com.Agents.Welcomers.Brands;
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
    public class FlowController : Controller
    {        
        [HttpPost]
        public void Reservations()
        {
            new ReservationsWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Approveds()
        {
            new ApprovedsWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Reserve()
        {
            new ReserveWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Requests()
        {
            new RequestsWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Approve()
        {
            new ApproveWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Reject()
        {
            new RejectWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void State_Machine()
        {
            new StateMachineWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Upload()
        {
            new UploadWelcomer() { Material = new PostLoginWebFormMaterial() { Server = Server, Request = Request, Response = Response } }.Welcome();
        }
    }
}