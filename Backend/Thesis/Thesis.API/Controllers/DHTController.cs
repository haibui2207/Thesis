using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Thesis.API.Context;
using Thesis.API.Models.DHTModel;

namespace Thesis.API.Controllers
{
    [Produces("application/json")]
    [Route("api/DHT")]
    public class DHTController : Controller
    {
        private readonly IDHTRepo _repository;

        public DHTController(ThesisAPIContext context)
        {
            this._repository = new DHTRepo(context);
        }

        // method GET: api/dht
        [HttpGet]
        public IActionResult Get()
        {
            var data = _repository.GetAllData();

            return Ok(data);
        }

        // method GET: api/dht/lastestrecord
        [HttpGet]
        [Route("lastestrecord")]
        public IActionResult GetLastestRecord()
        {
            var data = _repository.GetLastestRecord();

            return Ok(data);
        }

        // method POST: api/dht
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DHT dt)
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

                var data = await _repository.Add(dt);

                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest();
                throw e;
            }
        }

        // method DELETE: api/dht
        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            try
            {
                bool check = await _repository.RemoveData();
                if (check) return Ok("Remove all data!");
                else return BadRequest("Error remove data");

            }
            catch (Exception e)
            {
                return BadRequest();
                throw e;
            }
        }
    }
}