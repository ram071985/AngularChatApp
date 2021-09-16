using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public partial class UserClaims
    {
        public Guid ClaimId { get; set; }
        public Guid UserId { get; set; }
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
    }
}
