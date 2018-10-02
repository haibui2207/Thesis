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

        // Triển khai phương thức GetAllData
        public IEnumerable<DHT> GetAllData()
        {
            try
            {
                return _context.DHTs.ToArray();
            }
            catch (Exception e)
            {
                return null;
                throw e;
            }
        }

        // Triển khai phương thức GetLastestRecord
        public DHT GetLastestRecord()
        {
            try
            {
                var lastestRecord = from dht in _context.DHTs
                                    orderby dht.id descending
                                    select dht;
                return lastestRecord.ToArray()[0];
            }
            catch (Exception e)
            {
                return null;
                throw e;
            }
        }

        // Triển khai phương thức RemoveData
        public async Task<bool> RemoveData()
        {
            try
            {
                var data = from dht in _context.DHTs
                           select dht;
                _context.DHTs.RemoveRange(data);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception e)
            {
                return false;
                throw e;
            }
        }
    }
}
