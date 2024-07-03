class ChangePass {
    constructor() {
        this.confirmationCode = null;
    }
    confirmEmail = () => {
        const email = document.getElementById('email').value;
        // Kiểm tra email hợp lệ
        if (!this.isValidEmail(email)) {
            swal.fire({
                text: "Email không hợp lệ",
                icon: "error"
            });
            return;
        }
        // Tạo mã xác nhận tạm thời
        this.confirmationCode = Math.floor(1000 + Math.random() * 9000);
        console.log(this.confirmationCode);
        // Gửi mã xác nhận đến email của người dùng
        swal.fire({
            text: `Mã xác nhận đã được gửi đến ${email}`,
            icon: "success"
        });
        // Chuyển đến tab "Đổi Mật Khẩu"
        var tab = new bootstrap.Tab(document.getElementById('nav-profile-tab'));
        tab.show();
    };
    changePassword = () => {
        const code = document.getElementById('xacNhanMail').value;
        const newPassword = document.getElementById('matKhauMoi').value;
        // Kiểm tra mã xác nhận
        if (parseInt(code) !== this.confirmationCode) {
            swal.fire({
                text: "Mã xác nhận không đúng",
                icon: "error"
            });
            return;
        }
        // đổi mật khẩu
        swal.fire({
            text: "Mật khẩu đã được thay đổi",
            icon: "success"
        });
        // Đặt lại mã xác nhận
        this.confirmationCode = null;
    };
    isValidEmail = (email) => {
        // Kiểm tra định dạng email
        return /\S+@\S+\.\S+/.test(email);
    };
}
