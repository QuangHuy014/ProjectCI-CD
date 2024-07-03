package codeclowns.planny.planny.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LayoutController {
    @GetMapping("/workspace")
    public String doGetBang() {
        return "user/layout/body/managerbang/bang";
    }

    @GetMapping({"/", "/home"})
    public String doGetHome() {
        return "user/layout/body/home/home";
    }

    @GetMapping("/b/**")
    public String doGetViewBoard() {
        return "user/layout/body/singleBoard/board";
    }

    @GetMapping("/login")
    public String doGetLogin() {
        return "user/layout/body/login/login";
    }

    @GetMapping("/register")
    public String doGetRegister() {
        return "user/layout/body/login/register";
    }

    @GetMapping("/doimatkhau")
    public String doGetChangePass() {
        return "user/layout/body/accountmanager/changepassword";
    }
    @GetMapping("/login/success")
    public String doGetLoginSuccess() {
        return "redirect:/";
    }

//    @GetMapping("/b/{slugUrl}/{shortName}")
//    public String doGetBoardBySLugUrl(@PathVariable String slugUrl, @PathVariable String shortName) {
//
//        return "user/layout/body/singleBoard/board";
//    }

     @GetMapping("/verify")
    public String doGetVery() {
        return "user/layout/body/login/verify";
    }
}

