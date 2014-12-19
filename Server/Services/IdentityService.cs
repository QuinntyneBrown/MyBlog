using MyBlog.Server.Data.Contracts;
using MyBlog.Server.Dto;
using MyBlog.Server.Models;
using MyBlog.Server.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.Server.Services
{
    public class IdentityService: IIdentityService
    {
        protected readonly IUow uow;

        protected readonly IEncryptionService encryptionService;

        protected readonly ISessionService sessionService;

        public IdentityService(IUow uow, IEncryptionService encryptionService, ISessionService sessionService)
        {
            this.uow = uow;
            this.sessionService = sessionService;
            this.encryptionService = encryptionService;
        }

        public TokenDto SignIn(SignInDto signInDto)
        {
            User user = this.uow.Users.GetAll().Where(x => x.Username == signInDto.Username).FirstOrDefault();

            if (user != null && user.IsActive == false)
                return null;


            string transformedPassword = this.encryptionService.TransformPassword(signInDto.Password);

            if (ValidateUser(signInDto.Username, transformedPassword))
            {
                return sessionService.StartSession(user);
            }

            throw new InvalidOperationException();

        }

        public void SignOut(User user)
        {

        }
        public bool ValidateUser(string usermame, string password)
        {
            return this.uow.Users.GetAll().Where(x => x.Username == usermame && x.Password == password).Count() > 0;

        }
    }
}