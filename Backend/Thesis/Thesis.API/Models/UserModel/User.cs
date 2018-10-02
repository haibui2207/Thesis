using System.ComponentModel.DataAnnotations;

namespace Thesis.API.Models.UserModel
{
    public class User
    {
        public int id { get; set; } // Id bắt buộc để tạo khóa chính

        [MaxLength(20)]
        public string name { get; set; }    // Tên người dùng

        [MaxLength(20)]
        public string username { get; set; }    // Tên đăng nhập

        [MaxLength(40)]
        public string password { get; set; }    // Mật khẩu

        [MaxLength(10)]
        public string role { get; set; }    // role

        [StringLength(8)]
        public string RFID { get; set; }    // Mã số RFID tương ứng

        public User() { }   // Hàm khởi tạo không tham số

        // Hàm khởi tạo có tham số
        public User(string name, string username, string password, string RFID, string role)
        {
            this.name = name;
            this.username = username;
            this.password = password;
            this.RFID = RFID;
            this.role = role;
        }
    }
}
