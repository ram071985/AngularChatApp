using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public partial class AppUserAuth : UserAuthBase
    {
        public AppUserAuth() : base()
        {
            CanAccessChat = false;
        }

        public bool CanAccessChat { get; set; }
    }
}
