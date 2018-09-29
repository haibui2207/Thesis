using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thesis.API.Context;

namespace Thesis.API.Models.DHTModel
{
    public class DHTRepo : IDHTRepo
    {
        private readonly ThesisAPIContext _context; // DbContext để truy xuất dữ liệu từ CSDL

        public DHTRepo(ThesisAPIContext context)
        {
            this._context = context;
        }

        // Triển khai phương thức Add
        public async Task<DHT> Add(DHT data)
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

        // Triển khai phương thức GetData
        public IEnumerable<DHT> GetData()
        {
            try
            {
                int max = _context.DHTs.Max(p => p.id);
                return _context.DHTs.Where(p => p.id == max);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Triển khai phương thức RemoveData
        public async Task<bool> RemoveData()
        {
            try
            {
                foreach (var item in _context.DHTs)
                {
                    _context.Remove(item);
                }
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
