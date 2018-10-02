using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Thesis.API.Models.UserModel
{
    interface IUserRepo
    {
        User Login(User user);    // Đăng nhập
        Task<User> Add(User user);    // Thêm một User
        IEnumerable<User> GetAllUser();  // Lấy tất cả user
        User GetUserInfo(int userId);    // Lấy thông tin User 
        User GetUserByRFID(string rfidCode);    // Lấy thông tin User dựa vào mã RFID
        Task<User> UpdateUser(User user);    // Thay đổi thông tin User
        Task<bool> RemoveUser(int userId);   // Xóa một User
        Task<bool> RemoveAllUser();   // Xóa tất cả User
    }
}
