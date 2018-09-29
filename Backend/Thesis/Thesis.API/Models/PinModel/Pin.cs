using System.ComponentModel.DataAnnotations;

namespace Thesis.API.Models.PinModel
{
    public class Pin
    {        
        public int id { get; set; } // Id bắt buộc để tạo khóa chính

        [Required]
        [Range(0, 20)]
        public int pin { get; set; }    // Pin number dựa trên Arduino

        [Required]
        [Range(0, 1)]
        public int state { get; set; }  // Trạng thái hoạt động 0 - 1

        [Required]
        public string key { get; set; } // Định danh Arduino

        public Pin() { } // Hàm khởi tạo không tham số

        // Hàm khởi tạo có tham số
        public Pin(int pin, string key, int state)
        {
            this.pin = pin;
            this.key = key;
            this.state = state;
        }
    }
}
