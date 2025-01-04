package com.af.moslavac.controllers;

import com.af.moslavac.services.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/validate-password")
    public ResponseEntity<Map<String, Boolean>> validatePassword(@RequestBody Map<String, String> payload) {
        String password = payload.get("password");
        boolean isValid = adminService.validatePassword(password);

        Map<String, Boolean> response = new HashMap<>();
        response.put("isValid", isValid);

        return ResponseEntity.ok(response);
    }

}
