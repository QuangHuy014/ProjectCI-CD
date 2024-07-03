package codeclowns.planny.planny.security.service;

import codeclowns.planny.planny.security.data.CustomUserDetails;
import codeclowns.planny.planny.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final AccountService accountService;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = accountService.findAccountByUsername(username).orElseThrow();
        return CustomUserDetails.builder()
                .accountE(user)
                .build();
    }
}
