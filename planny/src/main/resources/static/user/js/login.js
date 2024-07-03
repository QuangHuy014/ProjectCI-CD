const status = {
    succeed: 'Thành công',
    failed: 'Thất bại',
    error: 'Phát sinh lỗi'
}
$(document).ready(() => {
    let href = window.location.href;
    if (href.toLowerCase().includes("login=true")) {
        Swal.fire({
            title: status.succeed,
            text: 'Chào mừng trở lại!',
            icon: 'success'
        })
    } else if (href.toLowerCase().includes("error=true")){
        Swal.fire({
            title: status.failed,
            text: 'Sai thông tin đăng nhập, thử lại!',
            icon: 'warning'
        })
    } else if (href.toLowerCase().includes("logout=true")) {
        Swal.fire({
            title: status.succeed,
            text: 'Đăng xuất thành công!',
            icon: 'success'
        })
    }
})