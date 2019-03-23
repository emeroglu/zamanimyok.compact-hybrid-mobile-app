using api.zamanimyok.com.Abstract;
using api.zamanimyok.com.Abstract.Core;
using api.zamanimyok.com.Abstract.Json;
using api.zamanimyok.com.Abstract.Tools;
using api.zamanimyok.com.Agents;
using api.zamanimyok.com.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace api.zamanimyok.com.Agents.Welcomers.Auth
{
    public class LoginWelcomer : CoreWebProcessor<AuthenticatorPayload, AuthenticatorDelivery>
    {                
        protected override List<Task> Tasks()
        {
            return new List<Task>()
            {
                new Task()
                {
                    Mission = "Look_For_Username_Or_Email_Match",
                    Action = (seekTo, currentTask, nextTask, delivery) =>
                    {
                        authCredentialDetail credentialDetail = Entities.authCredentialDetails.FirstOrDefault
                        (
                            d => d.Present
                            && d.KeyFK == 1 | d.KeyFK == 2
                            && d.Value == Payload.username
                        );

                        if (credentialDetail == null)
                            seekTo("Failure", null);
                        else
                            nextTask(credentialDetail.authCredential);
                    }
                },
                new Task()
                {
                    Mission = "Look_For_Password_Match",
                    Action = (seekTo, currentTask, nextTask, delivery) =>
                    {
                        authCredential credential = (authCredential) delivery;

                        authCredentialDetail credentialDetail = credential.authCredentialDetails.FirstOrDefault
                        (
                            d => d.Present
                            && d.KeyFK == 3
                            && d.Value == Payload.password
                        );

                        if (credentialDetail == null)
                            seekTo("Failure", null);
                        else
                            nextTask(credential.authMember);
                    }
                },
                new Task()
                {
                    Mission = "Save_Login",
                    Action = (seekTo, currentTask, nextTask, delivery) =>
                    {
                        authMember member = (authMember) delivery;

                        authLogin login = new authLogin()
                        {
                            DeviceFK = 0,
                            StatusFK = 1,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "Authenticator",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        Entities.authLogins.Add(login);
                        Entities.SaveChanges();

                        Dictionary<string,object> package = new Dictionary<string, object>();
                        package["member"] = member;
                        package["login"] = login;

                        nextTask(package);
                    }
                },
                new Task()
                {
                    Mission = "Save_Login_Details",
                    Action = (seekTo, currentTask, nextTask, delivery) =>
                    {
                        Dictionary<string,object> package = (Dictionary<string,object>) delivery;

                        authMember member = (authMember) package["member"];
                        authLogin login = (authLogin) package["login"];

                        authLoginDetail detail;

                        detail = new authLoginDetail()
                        {
                            LoginFK = login.PK,
                            KeyFK = 1,
                            Value = Payload.username,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "Authenticator",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        Entities.authLoginDetails.Add(detail);

                        detail = new authLoginDetail()
                        {
                            LoginFK = login.PK,
                            KeyFK = 2,
                            Value = Payload.password,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "Authenticator",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        Entities.authLoginDetails.Add(detail);
                        Entities.SaveChanges();

                        if (login.StatusFK == 1)
                            nextTask(delivery);
                    }
                },
                new Task()
                {
                    Mission = "Instantiate",
                    Action = (seekTo, currentTask, nextTask, delivery) =>
                    {
                        Dictionary<string,object> package = (Dictionary<string,object>) delivery;

                        authMember member = (authMember) package["member"];
                        authLogin login = (authLogin) package["login"];

                        authInstance instance = new authInstance()
                        {
                            LoginFK = login.PK,
                            MemberFK = member.PK,
                            Key = Guid.NewGuid().ToString(),
                            StatusFK = 1,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "Authenticator",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        Entities.authInstances.Add(instance);
                        Entities.SaveChanges();

                        Delivery.payload.key = instance.Key;

                        nextTask(instance);
                    }
                },
                new Task()
                {
                    Mission = "Success",
                    Action = (seekTo, currentTask, nextTask, delivery) =>
                    {
                        authInstance instance = (authInstance) delivery;

                        Delivery.meta.status = "success";
                        Delivery.meta.message = "Welcome :)";

                        Delivery.payload.key = instance.Key;                        
                    }
                },
                new Task()
                {
                    Mission = "Failure",
                    Action = (seekTo, currentTask, nextTask, delivery) =>
                    {
                        authLogin login = new authLogin()
                        {
                            DeviceFK = 0,
                            StatusFK = 2,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "Authenticator",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        Entities.authLogins.Add(login);
                        Entities.SaveChanges();

                        Dictionary<string,object> package = new Dictionary<string, object>();
                        package["member"] = null;
                        package["login"] = login;

                        seekTo("Save_Login_Details", package);

                        Delivery.meta.status = "fail";
                        Delivery.meta.message = "Username or password is invalid";

                        Delivery.payload = null;
                    }
                }
            };
        }
    }

    public class AuthenticatorPayload : CorePayload
    {
        public string username { get; set; }
        public string password { get; set; }
    }

    public class AuthenticatorDelivery : CorePayload
    {
        public string key { get; set; }
    }
}