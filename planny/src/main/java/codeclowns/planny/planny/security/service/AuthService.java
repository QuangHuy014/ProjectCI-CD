package codeclowns.planny.planny.security.service;

import codeclowns.planny.planny.data.entity.AccountE;
import codeclowns.planny.planny.security.data.CustomUserDetails;
import codeclowns.planny.planny.security.data.dto.LoginResponseDTO;
import codeclowns.planny.planny.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public LoginResponseDTO authenticate(String username, String password) {
        var authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var userDetails = (CustomUserDetails) authentication.getPrincipal();
        var token = jwtTokenProvider.generateToken(userDetails);
        return LoginResponseDTO.builder()
                .accessToken(token)
                .build();
    }

    public AccountE getCurrentUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            var userDetails = (CustomUserDetails) authentication.getPrincipal();
            return userDetails.getAccountE();
        }
        return null;
    }
}
