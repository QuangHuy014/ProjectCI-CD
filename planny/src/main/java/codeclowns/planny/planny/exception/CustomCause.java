package codeclowns.planny.planny.exception;

import lombok.Getter;

@Getter
public enum CustomCause {
    BOARD404(1001, "Không tìm thấy bảng tương ứng"),
    UNAUTHORIZED_MEMBER(1003, "Thiếu quyền truy cập, vui lòng liên hệ người sở hữu"),
    DUPLICATE_TITLE(1002, "Tên danh sách đã được sử dụng, vui lòng thử lại!");
    private final int code;
    private final String message;

    CustomCause(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
