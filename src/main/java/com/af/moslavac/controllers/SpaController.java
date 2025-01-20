package com.af.moslavac.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.af.moslavac.Env;

@Controller
public class SpaController {

    // Explicit mapping for the root path
    @GetMapping(value = "/")
    public String forwardRoot(Model model) {
        // String log = "BASE URL: " + Env.getBaseUrl() + " " + Env.getEnv() + " " +
        // Env.getGoogleApiKey();
        model.addAttribute("env", Env.getEnv());
        // model.addAttribute("log", log);

        return "index";
    }

    // Mapping for all other paths excluding certain patterns
    @GetMapping(value = "/{path:^(?!api|swagger|oauth2|firebase-messaging-sw|images|public|index\\.js|index\\.css).*$}/**")
    public String forwardIndex(Model model) {
        // String log = "BASE URL: " + Env.getBaseUrl() + " " + Env.getEnv() + " " +
        model.addAttribute("env", Env.getEnv());
        // model.addAttribute("log", log);

        return "index";
    }
}
