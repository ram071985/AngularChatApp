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
        private readonly JwtSettings _settings;

        public SecurityController(ChatContext db, ILogger<SecurityController> logger, JwtSettings settings)
        {
            _db = db;
            _logger = logger;
            _settings = settings;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] AppUser user)
        {
            IActionResult ret = null;
            AppUserAuth auth = new AppUserAuth();
            SecurityManager mgr = new SecurityManager(_db, auth, _settings);

            auth = (AppUserAuth)mgr.ValidateUser(user.Username, user.Password);
            try
            {
                if (auth.IsAuthenticated)
                {
                    ret = StatusCode(StatusCodes.Status200OK, auth);

                    var userRecord = _db.UserBases.First(x => x.Username == user.Username);
                    userRecord.Active = "true";
                    _db.SaveChanges();



                }
                else
                {
                    ret = StatusCode(StatusCodes.Status404NotFound, "Invalid Username/Password");
                }

                return Ok(ret);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }

        [HttpPost("logout")]
        public IActionResult Logout([FromBody] AppUser user)
        {
            try
            {
                var userRecord = _db.UserBases.First(x => x.Username == user.Username);
                userRecord.Active = "false";
                _db.SaveChanges();

                return Ok(userRecord);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }
    }
}
