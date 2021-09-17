using Data.Context;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Data.ManagerClasses
{
    public class SecurityManager
    {
        public SecurityManager(ChatContext db, UserAuthBase auth)
        {
            _db = db;
            _auth = auth;
        }

        private ChatContext _db = null;
        private UserAuthBase _auth = null;

        public UserAuthBase ValidateUser(string username, string password)
        {
            List<UserBase> list = new List<UserBase>();

            try
            {
                list = _db.UserBases.Where(u => u.Username.ToLower() == username.ToLower() && u.Password.ToLower() == password.ToLower()).ToList();
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
            claims = GetUserClaims(userId);

            // Loop through all claims and 
            // set properties of user object
            foreach (UserClaim claim in claims)
            {
                try
                {
                    // Use reflection to set property
                    _authType.GetProperty(claim.ClaimType)
                        .SetValue(_auth, Convert.ToBoolean(claim.ClaimValue),
                            null);
                }
                catch
                {

                }
            }

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
    }
}
