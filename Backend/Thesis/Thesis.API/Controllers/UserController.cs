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

        // method GET: api/User/{RFID}
        [HttpGet("{RFID}")]
        public IActionResult Get(string RFID)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                return Ok(_repository.GetDataByRFID(RFID));
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // method POST: api/user
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User newUser)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var data = await _repository.Add(newUser);
                return Ok("Add User Successed.");
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // method DELETE api/user
        [HttpDelete]
        public IActionResult Delete([FromBody] User deletedUser)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                try
                {
                    var data = _repository.Remove(deletedUser);
                    return Ok(data);
                }
                catch
                {
                    return NotFound();
                }

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}