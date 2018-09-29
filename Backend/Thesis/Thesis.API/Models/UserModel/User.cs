using System.ComponentModel.DataAnnotations;

namespace Thesis.API.Models.UserModel
{
    public class User
    {
        public int id { get; set; } // Id bắt buộc để tạo khóa chính

        [Required]
        [MaxLength(20)]
        public string name { get; set; }    // Tên người dùng

        [Required]
        [StringLength(8)]
        public string RFID { get; set; }    // Mã số RFID tương ứng

        public User() { }   // Hàm khởi tạo không tham số

        // Hàm khởi tạo có tham số
        public User(string name, string RFID)
        {
            this.name = name;
            this.RFID = RFID;
        }
    }
}
