package com.af.moslavac.controllers;

import com.af.moslavac.services.AdminService;
import com.af.moslavac.config.JwtService;
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
    private final JwtService jwtService; // Dodano: JwtService za generiranje i validaciju JWT-a

    public AdminController(AdminService adminService, JwtService jwtService) {
        this.adminService = adminService;
        this.jwtService = jwtService; // Injektiranje JwtService-a
    }

    @PostMapping("/validate-password")
    public ResponseEntity<Map<String, String>> validatePassword(@RequestBody Map<String, String> request) {
        String password = request.get("password");
        if (password == null || !adminService.validatePassword(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        // Generiranje JWT-a
        String token = jwtService.generateToken("admin");
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate-token")
    public ResponseEntity<Map<String, String>> validateToken(@RequestHeader("Authorization") String authorizationHeader) {
        Map<String, String> response = new HashMap<>();

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.replace("Bearer ", "");
            String validationResult = jwtService.validateToken(token);

            switch (validationResult) {
                case "VALID":
                    response.put("status", "success");
                    response.put("message", "Token is valid");
                    return ResponseEntity.ok(response);
                case "EXPIRED":
                    response.put("status", "error");
                    response.put("message", "Token is expired");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
                case "MALFORMED":
                    response.put("status", "error");
                    response.put("message", "Token is malformed");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                case "INVALID_SIGNATURE":
                    response.put("status", "error");
                    response.put("message", "Invalid token signature");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
                default:
                    response.put("status", "error");
                    response.put("message", "Invalid token");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        }

        response.put("status", "error");
        response.put("message", "Authorization header is missing or invalid");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

}
