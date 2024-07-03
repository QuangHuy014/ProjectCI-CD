package codeclowns.planny.planny.data.dto;

import lombok.Data;

@Data
public class ChangePasswordDto {
    private String currentPassword;
    private String newPassword;
    private String confirmNewPassword;
}
