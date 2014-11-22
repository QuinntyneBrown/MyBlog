using MyBlog.Data.Contracts;
using MyBlog.Dtos;
using MyBlog.Models;
using MyBlog.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MyBlog.Services
{
    public class SessionService: ISessionService
    {
        protected readonly IUow uow;
        public readonly IEncryptionService encryptionService;

        public SessionService(IEncryptionService encryptionService, IUow uow)
        {
            this.uow = uow;
            this.encryptionService = encryptionService;
        }

        public TokenDto StartSession(int id)
        {
            var session = new Session()
            {
                Start = DateTime.Now,
                Expires = DateTime.Now.AddMinutes(30),
                UserId = id
            };

            uow.Sessions.Add(session);

            uow.SaveChanges();

            return new TokenDto()
                {
                    Token = encryptionService.EncryptString(session.Id.ToString())
                };
        }

        public TokenDto StartSession(User user)
        {
            return StartSession(user.Id);
        }

        public void EndSession(int sessionId)
        {
            var session = uow.Sessions.GetById(sessionId);
            session.IsExpired = true;
            uow.SaveChanges();
        }

        public Session GetSession(int sessionId)
        {
            return uow.Sessions.GetById(sessionId);
        }

        public Session GetSession(User user)
        {
            return uow.Sessions.GetAll().Where(x => x.UserId == user.Id).FirstOrDefault();
        }

        public User GetCurrentUser(int sessionId)
        {
            var session = uow.Sessions.GetById(sessionId);

            var userId = (int)session.UserId;

            return uow.Users.GetAll().Where(x => x.Id == userId).Include(x => x.Roles).FirstOrDefault();
        }

        public void UpdateSession(Session session)
        {
            throw new NotImplementedException();
        }
    }
}