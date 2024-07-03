package codeclowns.planny.planny.constant;

import lombok.Getter;

@Getter
public enum BasicApiConstant {

    SUCCEED("Thành công"),
    FAILED("Thất bại"),
    ERROR("Phát sinh lỗi");

    private String status;

    BasicApiConstant(String status) {
        this.status = status;
    }
}
