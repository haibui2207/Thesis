using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Thesis.API.Context;
using Thesis.API.Models.UserModel;

namespace Thesis.API.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly IUserRepo _repository;

        public UserController(ThesisAPIContext context)
        {
            this._repository = new UserRepo(context);
        }


        // method POST: api/User/login
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] User newUser)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                return Ok(_repository.Login(newUser));
            }
            catch (Exception e)
            {
                return NotFound("User not found");
                throw e;
            }
        }

        // method POST: api/user/create
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> AddNewUser([FromBody] User newUser)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var data = await _repository.Add(newUser);
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest();
                throw e;
            }
        }

        // method GET: api/User
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_repository.GetAllUser());
            }
            catch (Exception e)
            {
                return BadRequest();
                throw e;
            }
        }

        // method GET: api/User/info/{userId}
        [HttpGet]
        [Route("info/{userId}")]
        public IActionResult GetUserInfo(int userId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                return Ok(_repository.GetUserInfo(userId));
            }
            catch (Exception e)
            {
                return NotFound("User not found");
                throw e;
            }
        }

        // method GET: api/User/rfid/{rfidCode}
        [HttpGet]
        [Route("rfid/{rfidCode}")]
        public IActionResult GetUserByRFID(string rfidCode)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                return Ok(_repository.GetUserByRFID(rfidCode));
            }
            catch (Exception e)
            {
                return NotFound("User not found");
                throw e;
            }
        }

        // method PUT: api/user
        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] User user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var data = await _repository.UpdateUser(user);
                if (data != null)
                {
                    return Ok(data);
                }
                return NotFound("UserId is required");
            }
            catch (Exception e)
            {
                return BadRequest("UserId is required");
                throw e;
            }
        }

        // method DELETE: api/user/{userId}
        [HttpDelete]
        [Route("{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool removed = await _repository.RemoveUser(userId);

                if (removed)
                {
                    return Ok("User deleted");
                }

                return NotFound("User not found");
            }
            catch (Exception e)
            {
                return BadRequest();
                throw e;
            }
        }

        // method DELETE: api/user
        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                bool removed = await _repository.RemoveAllUser();

                if (removed)
                {
                    return Ok("All users deleted");
                }

                return NotFound("User not found");
            }
            catch (Exception e)
            {
                return BadRequest();
                throw e;
            }
        }
    }
}