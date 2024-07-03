package codeclowns.planny.planny.security.jwt;

import codeclowns.planny.planny.security.CustomUserDetailsAuthenticationToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthentication extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtToUserDetailsConverter jwtToUserDetailsConverter;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        extractToken(request)
                .map(jwtTokenProvider::decodeToken)
                .map(jwtToUserDetailsConverter::convert)
                .map(CustomUserDetailsAuthenticationToken::new)
                .ifPresent(authentication -> SecurityContextHolder.getContext().setAuthentication(authentication))
        ;
        filterChain.doFilter(request, response);
    }

    private Optional<String> extractToken(HttpServletRequest request) {
        var token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            return Optional.of(token.substring(7));
        }
        return Optional.empty();
    }
}
