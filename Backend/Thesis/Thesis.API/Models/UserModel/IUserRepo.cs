using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Thesis.API.Models.UserModel
{
    interface IUserRepo
    {
        Task<User> Add(User dt);    // Thêm một User
        User Remove(User dt);   // Xóa một User
        User GetDataByRFID(string RFID);    // Lấy thông tin User dựa vào mã RFID
    }
}
