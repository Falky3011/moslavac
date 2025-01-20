package com.af.moslavac;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class Env {

    @Value("${env.env}")
    private String envEnv;
    private static String ENV;

    @PostConstruct
    public void init() {
        ENV = envEnv;
    }

    public static String getEnv() {
        return ENV;
    }

}
