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
    public class UserController : Controller
    {        
        [HttpPost]
        public void Me()
        {
            new MeWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }        

        [HttpPost]
        public void Vehicles()
        {
            new VehiclesWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void New_Vehicle()
        {
            new NewVehicleWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Update_Vehicle()
        {
            new UpdateVehicleWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Remove_Vehicle()
        {
            new RemoveVehicleWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Addresses()
        {
            new AddressesWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void New_Address()
        {
            new NewAddressWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Update_Address()
        {
            new UpdateAddressWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Remove_Address()
        {
            new RemoveAddressWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }
    }
}