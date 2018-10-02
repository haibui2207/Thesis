using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Thesis.API.Context;
using Thesis.API.Models.PinModel;

namespace Thesis.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Pin")]
    public class PinController : Controller
    {
        private readonly IPinRepo _repository;

        public PinController(ThesisAPIContext context)
        {
            this._repository = new PinRepo(context);
        }

        // Method GET: api/pin
        [HttpGet]
        public IActionResult Get()
        {
            var data = _repository.GetAll();

            return Ok(data);
        }

        // Method GET: api/pin/getpinnumber
        [HttpGet]
        [Route("getpinnumber")]
        public IActionResult GetPin(int pin, string key)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(_repository.GetStateByPin(pin, key));
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                return NotFound();
                throw e;
            }
        }

        // method PUT: api/pin
        [HttpPut]
        public async Task<IActionResult> UpdatePinNumber([FromBody] Pin dt)
        {
            try
            {
                if (dt == null)
                {
                    return BadRequest(ModelState);
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var data = await _repository.ChangData(dt);

                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest();
                throw e;
            }
        }

        // method POST: api/pin/resetallpin
        [HttpPost]
        [Route("resetallpin")]
        public async Task<IActionResult> ResetAllPin()
        {
            try
            {
                bool check = await _repository.ResetAllPin();
                if (check) return Ok("Reset all pin success!");
                else return BadRequest("Error reset all pin");

            }
            catch (Exception e)
            {
                return BadRequest();
                throw e;
            }
        }
    }
}