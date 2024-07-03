package codeclowns.planny.planny.security.jwt;

import codeclowns.planny.planny.security.data.CustomUserDetails;
import codeclowns.planny.planny.service.AccountService;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtToUserDetailsConverter {
    private final AccountService accountService;

    public CustomUserDetails convert(DecodedJWT decodedJWT) {
        var account = accountService.findAccountByUsername(decodedJWT.getClaim("username").asString());
        return CustomUserDetails.builder()
                .accountE(account.orElseThrow())
                .build();
    }
}
