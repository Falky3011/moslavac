package com.af.moslavac.controllers;

import com.af.moslavac.services.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    private final Map<String, Boolean> validTokens = new HashMap<>();

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/validate-password")
    public ResponseEntity<Map<String, String>> validatePassword(@RequestBody Map<String, String> request) {
        String password = request.get("password");
        if (password == null || !adminService.validatePassword(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String token = UUID.randomUUID().toString();
        validTokens.put(token, true);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate-token")
    public ResponseEntity<Boolean> validateToken(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        if (token != null && validTokens.containsKey(token)) {
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
    }
}
