package com.af.moslavac.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Value("${spring.admin.password}")
    private  String admin_password;

    public boolean validatePassword(String password) {
        System.out.println("Expected password: " + admin_password);
        System.out.println("Received password: " + password);
        return admin_password.equals(password.trim());
    }

}
