$(document).ready(() => {
    const logoutLink = $('#logout');

    logoutLink.on('click', (event) => {
        event.preventDefault();

        Swal.fire({
            title: 'Bạn có chắc chắn muốn đăng xuất không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, đăng xuất!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/logout';
            }
        });
    });
});