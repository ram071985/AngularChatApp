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
