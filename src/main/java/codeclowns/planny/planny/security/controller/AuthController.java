package codeclowns.planny.planny.security.controller;

import codeclowns.planny.planny.security.data.dto.LoginRequestDTO;
import codeclowns.planny.planny.security.data.dto.LoginResponseDTO;
import codeclowns.planny.planny.security.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @GetMapping("/secured")
    public String secured() {
        var userDetails = authService.getCurrentUser();
        System.out.println("/secured");
        return "If you see this, then you are logged in as user: "
                + userDetails.getUsername();
    }

    @PostMapping("/auth/login")
    public LoginResponseDTO login(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        return authService.authenticate(loginRequestDTO.getUsername(), loginRequestDTO.getPassword());
    }

    @DeleteMapping("/deleteMethod")
    public String doDelete() {
        return "deleted";
    }
    @PostMapping("/post")
    public Integer doPost() {
        return 1;
    }

}
