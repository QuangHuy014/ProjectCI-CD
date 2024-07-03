const validateForm = () => {
    let fullName = $('#fullName').val();
    let username = $('#username').val();
    let password = $('#password').val();
    let confirmPassword = $('#confirmpassword').val();
    let email = $('#email').val();
    if (!fullName || fullName === '') {
        Swal.fire({
            text: 'Họ tên không được trống',
            icon: 'error'
        });
        return false;
    }
    if (!username || username === '') {
        Swal.fire({
            text: 'Tên đăng nhập không được trống',
            icon: 'error'
        });
        return false;
    }
    if (!password || password === '') {
        Swal.fire({
            text: 'Mật khẩu không được trống',
            icon: 'error'
        });
        return false;
    }
    if (!email || email === '') {
        Swal.fire({
            text: 'Email không được trống',
            icon: 'error'
        });
        return false;
    }
    if (password !== confirmPassword) {
        Swal.fire({
            text: 'Mật khẩu không khớp',
            icon: 'error'
        });
        return false;
    }
    return true;
}
const btnRegister = async () => {
    if (!validateForm()) {
        return;
    }
    let dataApiRegister = {
        fullName: $('#fullName').val(),
        username: $('#username').val(),
        password: $('#password').val(),
        confirmpassword: $('#confirmpassword').val(),
        email: $('#email').val(),
    }
    const btnDangKi = $('#btnDangKi');
    btnDangKi.prop('disabled', true); // Vô hiệu hóa nút đăng ký
    btnDangKi.html('<span class="spinner-border" role="status" aria-hidden="true"></span> Đang xử lý...'); // Hiển thị spinner
    try {
        let {data: response} = await axios.post('/api-public/account/register', dataApiRegister);
        if (response.status === 'PENDING') {
            Swal.fire({
                title: 'Thành công!',
                text: response.message,
                icon: 'success'
            });
        } else if (response.status === 'FAILED') {
            Swal.fire({
                title: 'Đăng ký thất bại',
                text: response.message,
                icon: 'error'
            });
        } else {
            Swal.fire({
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi thực hiện đăng ký',
                icon: 'error'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Đã xảy ra lỗi',
            text: 'Vui lòng thử lại sau',
            icon: 'error'
        });
    }
}
$('#signupForm').on('submit', (event) => {
    event.preventDefault();
    btnRegister();
});
