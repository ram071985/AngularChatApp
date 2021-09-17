using ChatAppAPI.Models;
using Data.Context;
using Data.Entities;
using Data.ManagerClasses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAppAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class SecurityController : ControllerBase
    {
        private readonly ChatContext _db;
        private readonly ILogger<SecurityController> _logger;
        public SecurityController(ChatContext db, ILogger<SecurityController> logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] AppUser user)
        {
            IActionResult ret = null;
            AppUserAuth auth = new AppUserAuth();
            SecurityManager mgr = new SecurityManager(_db, auth);

            auth = (AppUserAuth)mgr.ValidateUser(user.Username, user.Password);
            if (auth.IsAuthenticated)
            {
                ret = StatusCode(StatusCodes.Status200OK, auth);

            }
            else
            {
                ret = StatusCode(StatusCodes.Status404NotFound, "Invalid Username/Password");
            }

            return ret;

        }
    }
}
