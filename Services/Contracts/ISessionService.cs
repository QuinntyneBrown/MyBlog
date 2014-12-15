using MyBlog.Dto;
using MyBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace MyBlog.Services.Contracts
{
    public interface ISessionService
    {
        TokenDto StartSession(int id);

        TokenDto StartSession(User user);

        void EndSession(int sessionId);

        Session GetSession(int sessionId);

        Session GetSession(User user);

        void UpdateSession(Session session);

        UserDto GetCurrentUser(int sessionId);

        Task<UserDto> GetCurrentUser(string username);
    }
}