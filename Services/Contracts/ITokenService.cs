using MyBlog.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace MyBlog.Services.Contracts
{
    public interface ITokenService
    {
        JwtSecurityToken CreateToken(IEnumerable<Claim> claims);
    }
}