package codeclowns.planny.planny.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountDto {
    private String username;
    private String password;
    private String email;
    private String sub;
    private Boolean isEnabled;
    private String fullName;
}
