using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    class UserAuthBase
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string BearerToken { get; set; }
        public bool IsAuthenticated { get; set; }
    }
}
