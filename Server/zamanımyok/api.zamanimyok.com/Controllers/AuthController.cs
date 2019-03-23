using api.zamanimyok.com.Abstract;
using api.zamanimyok.com.Abstract.Core;
using api.zamanimyok.com.Agents;
using api.zamanimyok.com.Agents.Welcomers.Auth;
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
    public class AuthController : Controller
    {
        [HttpPost]
        public void Login()
        {
            new LoginWelcomer() { Material = new WebMaterial() { Request = Request, Response = Response } }.Welcome();
        }
        
        [HttpPost]
        public void Forgot_Password()
        {
            new ForgotPasswordWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Check_OTP()
        {
            new CheckOTPWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Update_Password()
        {
            new UpdatePasswordWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Verify_Email()
        {
            new VerifyEmailWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }

        [HttpPost]
        public void Signup()
        {
            new SignupWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }        

        [HttpPost]
        public void Logout()
        {
            new LogoutWelcomer() { Material = new PostLoginWebMaterial() { Request = Request, Response = Response } }.Welcome();
        }
    }
}