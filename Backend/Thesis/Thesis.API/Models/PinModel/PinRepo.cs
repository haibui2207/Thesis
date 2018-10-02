using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thesis.API.Context;

namespace Thesis.API.Models.PinModel
{
    public class PinRepo : IPinRepo
    {
        private readonly ThesisAPIContext _context; // DbContext để truy xuất dữ liệu từ CSDL

        public PinRepo(ThesisAPIContext context)
        {
            this._context = context;
        }

        // Triển khai phương thức GetAll
        public IEnumerable<Pin> GetAll()
        {
            try
            {
                return _context.Pins.ToArray();
            }
            catch (Exception e)
            {
                return null;
                throw e;
            }
        }

        // Triển khai phương thức Add
        public async Task<Pin> Add(Pin data)
        {
            try
            {
                await _context.AddAsync(data);
                await _context.SaveChangesAsync();

                return data;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // Triển khai phương thức ChangeDate
        public async Task<Pin> ChangData(Pin data)
        {
            try
            {
                var oldData = _context.Pins.Single(item => item.pin == data.pin && item.key == data.key);
                oldData.state = data.state;
                _context.Update(oldData);
                await _context.SaveChangesAsync();

                return data;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // Triển khai phương thức ResetAllPin
        public async Task<bool> ResetAllPin()
        {
            try
            {
                foreach (var item in _context.Pins)
                {
                    item.state = 0;
                    _context.Update(item);
                }
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception e)
            {
                return false;
                throw e;
            }
        }

        // Triển khai phương thức GetStateByPin
        public Pin GetStateByPin(int pin, string key)
        {
            try
            {
                return _context.Pins.Single(item => item.pin == pin && item.key == key);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
