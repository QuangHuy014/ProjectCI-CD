const validateForm = () => {
        let email = $('#email').val();
        if (!email || email === '') {
            Swal.fire({
                text: 'Email không được trống',
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
        let email = $('#email').val();
        try {
            let response = await axios.get(`/api-public/account/verify?email=${email}`);
            if (response.data.status === "SUCCEED") {
                Swal
                    .fire({
                        title: 'Thành Công',
                        text: 'Xác thực thành công. Vui lòng đăng nhập để sử dụng dịch vụ.',
                        confirmButtonText: 'Đăng nhập ngay',
                        icon: 'success'
                    })
                    .then(result => {
                        if (result.isConfirmed) {
                            window.location.href = '/login';
                        }
                    })
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