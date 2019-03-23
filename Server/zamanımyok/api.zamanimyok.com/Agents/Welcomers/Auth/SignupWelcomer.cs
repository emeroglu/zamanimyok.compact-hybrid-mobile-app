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
    public class SignupWelcomer : CoreWebProcessor<SignupPayload, SignupDelivery>
    {
        protected override List<Task> Tasks()
        {
            return new List<Task>()
            {
                new Task()
                {
                    Mission = "Insert_Auth_User",
                    Action = (seekTo, currentTask, nextTask, delivery) =>
                    {
                        authMember member = new authMember()
                        {
                            RoleFK = 1,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "SignupWelcomer",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        Entities.authMembers.Add(member);
                        Entities.SaveChanges();

                        nextTask(member);
                    }
                },
                new Task()
                {
                    Mission = "Insert_Credentials",
                    Action = (seekTo, currentTask, nextTask, delivery) =>
                    {
                        authMember member = (authMember) delivery;

                        authCredential credential = new authCredential()
                        {
                            MemberFK = member.PK,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "SignupWelcomer",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        Entities.authCredentials.Add(credential);
                        Entities.SaveChanges();

                        authCredentialDetail credentialDetail;

                        if (Payload.email.Contains("@"))
                        {
                            string username = Payload.email.Split('@')[0];

                            credentialDetail = Entities.authCredentialDetails.FirstOrDefault(d => d.Present && d.KeyFK == 1 && d.Value == username);

                            if (credentialDetail == null)
                            {
                                credentialDetail = new authCredentialDetail()
                                {
                                    CredentialFK = credential.PK,
                                    KeyFK = 1,
                                    Value = username,
                                    Extras = "",
                                    CreateDate = DateTime.Now,
                                    CreatedBy = "SignupWelcomer",
                                    UpdateDate = DateTime.Now,
                                    UpdatedBy = "",
                                    RemovalDate = DateTime.Now,
                                    RemovedBy = "",
                                    Present = true
                                };

                                Entities.authCredentialDetails.Add(credentialDetail);
                            }
                        }

                        credentialDetail = new authCredentialDetail()
                        {
                            CredentialFK = credential.PK,
                            KeyFK = 2,
                            Value = Payload.email,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "SignupWelcomer",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        Entities.authCredentialDetails.Add(credentialDetail);

                        credentialDetail = new authCredentialDetail()
                        {
                            CredentialFK = credential.PK,
                            KeyFK = 3,
                            Value = Payload.password,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "SignupWelcomer",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        Entities.authCredentialDetails.Add(credentialDetail);
                        Entities.SaveChanges();

                        nextTask(member);
                    }
                },
                 new Task()
                {
                    Mission = "Insert_Corresponding_User",
                    Action = (seekTo, currentTask, nextTask, delivery) =>
                    {
                        authMember member = (authMember) delivery;

                        userSelf user = new userSelf()
                        {
                            MemberFK = member.PK,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "SignupWelcomer",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        Entities.userSelves.Add(user);
                        Entities.SaveChanges();

                        nextTask(user);
                    }
                },
                new Task()
                {
                    Mission = "Insert_User_Details",
                    Action = (seekTo, currentTask, nextTask, delivery) =>
                    {
                        userSelf user = (userSelf) delivery;

                        userDetail userDetail;

                        userDetail = new userDetail()
                        {
                            UserFK = user.PK,
                            KeyFK = 1,
                            Value = Payload.name,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "SignupWelcomer",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        user.userDetails.Add(userDetail);

                        userDetail = new userDetail()
                        {
                            UserFK = user.PK,
                            KeyFK = 2,
                            Value = Payload.email,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "SignupWelcomer",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        user.userDetails.Add(userDetail);

                        userDetail = new userDetail()
                        {
                            UserFK = user.PK,
                            KeyFK = 3,
                            Value = Payload.phone,
                            Extras = "",
                            CreateDate = DateTime.Now,
                            CreatedBy = "SignupWelcomer",
                            UpdateDate = DateTime.Now,
                            UpdatedBy = "",
                            RemovalDate = DateTime.Now,
                            RemovedBy = "",
                            Present = true
                        };

                        user.userDetails.Add(userDetail);

                        Entities.SaveChanges();

                        nextTask(null);
                    }
                },
                new Task()
                {
                    Mission = "Delivery",
                    Action = (seekTo, currentTask, nextTask, delivery) =>
                    {
                        Delivery.meta.status = "success";
                        Delivery.meta.message = "New User added";
                    }
                }
            };
        }
    }

    public class SignupPayload : CorePayload
    {
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string password { get; set; }
    }

    public class SignupDelivery : CorePayload
    {

    }
}