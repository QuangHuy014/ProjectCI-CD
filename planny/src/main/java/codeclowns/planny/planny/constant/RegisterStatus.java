package codeclowns.planny.planny.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RegisterStatus {
    ACCOUNT_EXISTED("Tài khoản đã tồn tại"),
    SUCCEED("Đăng ký thành công"),
    FAILED("Đăng ký thất bại"),
    ERROR("Phát sinh lỗi"),
    PENDING("Đang chờ xác nhận"),
    VERIFY_SUCCESS("Xác thực thành công");
    private final String stateDescription;

}
