using Data.Context;
using Data.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Data.ManagerClasses
{
    public class SecurityManager
    {

        private ChatContext _db = null;
        private UserAuthBase _auth = null;
        private JwtSettings _settings = null;

        public SecurityManager(ChatContext db, UserAuthBase auth, JwtSettings settings)
        {
            _db = db;
            _auth = auth;
            _settings = settings;
        }

       

        public UserAuthBase ValidateUser(string username, string password)
        {
            List<UserBase> list = new List<UserBase>();

            try
            {
                list = _db.UserBases.Where(u => u.Username.ToLower() == username.ToLower() && u.Password.ToLower() == password.ToLower()).ToList();

                if (list.Count() > 0)
                {
                    _auth = BuildUserAuthObject(list[0].UserId, username);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Exception while trying to retrieve user.", ex);
            }
            return _auth;
        }
        protected UserAuthBase BuildUserAuthObject(Guid userId, string username)
        {
            List<UserClaim> claims = new List<UserClaim>();
            Type _authType = _auth.GetType();

            // Set User Properties
            _auth.UserId = userId;
            _auth.UserName = username;
            _auth.IsAuthenticated = true;

            // Get all claims for this user
            _auth.Claims = GetUserClaims(userId);

            // Create JWT Bearer Token
            _auth.BearerToken = BuildJwtToken(_auth.Claims, username);

            return _auth;
        }
        protected List<UserClaim> GetUserClaims(Guid userId)
        {
            List<UserClaim> list = new List<UserClaim>();

            try
            {
                list = _db.Claims.Where(u => u.UserId == userId).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(
                    "Exception trying to retrieve user Claims", ex);
            }
            return list;
        }

        protected string BuildJwtToken(IList<UserClaim> claims, string username)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_settings.Key));

            // Create standard JWT claims
            List<Claim> jwtClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti,
                Guid.NewGuid().ToString())
            };

            // Add Custom claims
            foreach (UserClaim claim in claims)
            {
                jwtClaims.Add(new Claim(claim.ClaimType,
                    claim.ClaimValue));
            }

            // Create the JwtSecurityToken object
            var token = new JwtSecurityToken(
                audience: _settings.Audience,
                issuer: _settings.Issuer,
                claims: jwtClaims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddMinutes(
                    _settings.MinutesToExpiration),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
