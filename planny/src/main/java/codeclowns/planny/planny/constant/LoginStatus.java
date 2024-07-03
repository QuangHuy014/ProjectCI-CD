package codeclowns.planny.planny.constant;

import lombok.Getter;
import lombok.Setter;

@Getter
public enum LoginStatus {

    NOT_EXISTED("Tài khoản không tồn tại, vui lòng thử lại!"),
    FAILED_PASSWORD("Mật khẩu không đúng, vui lòng thử lại!"),
    SUCCEED(null),
    ERROR("Phát sinh lỗi ngoài mong muốn!");

    private String stateDescription;

    LoginStatus(String stateDescription) {
        this.stateDescription = stateDescription;
    }
    public void setStateDescription(String stateDescription) {
        this.stateDescription = stateDescription;
    }
}
