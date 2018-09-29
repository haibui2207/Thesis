using System.Collections.Generic;
using System.Threading.Tasks;

namespace Thesis.API.Models.PinModel
{
    interface IPinRepo
    {
        IEnumerable<Pin> GetAll();  // Lấy tất cả dữ liệu
        Task<Pin> Add(Pin dt);      // Thêm một Pin và CSDL
        Task<Pin> ChangData(Pin dt);    // Thay đổi trạng thái Pin
        Pin GetStateByPin(int pin, string key); // Lấy thông tin của Pin dựa vào Pin number
        Task<bool> ResetAllPin(); // Đặt lại trạng thái tất cả Pin number như lúc mới khởi tạo
    }
}
