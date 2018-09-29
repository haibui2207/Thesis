using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Thesis.API.Models.DHTModel
{
    interface IDHTRepo
    {
        IEnumerable<DHT> GetData(); // Lấy dữ liệu cuối cùng được thêm vào
        Task<DHT> Add(DHT dt);  // Thêm dữ liệu mới
        Task<bool> RemoveData();    // Xóa tất cả dữ liệu
    }
}
