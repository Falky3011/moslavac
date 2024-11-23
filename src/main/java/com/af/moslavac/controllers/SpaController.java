package com.af.moslavac.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping()
    public String forwardIndex() {
        System.out.println("Testing");
        return "index";
    }

}