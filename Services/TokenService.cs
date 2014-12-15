using MyBlog.Services.Contracts;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Web;

namespace MyBlog.Services
{
    public class TokenService: ITokenService
    {
        public JwtSecurityToken CreateToken(IEnumerable<Claim> claims)
        {
            var token = new JwtSecurityToken(
                issuer:"",
                audience:"",
                claims: claims,
                signingCredentials: new X509SigningCredentials(null)

                );


            return token;
        }
    }
}