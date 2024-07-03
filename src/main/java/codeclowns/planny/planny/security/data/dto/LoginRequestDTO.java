package codeclowns.planny.planny.security.data.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {
    @NotBlank
    @NotNull
    private String username;
    @NotBlank
    @NotNull
    private String password;
}
