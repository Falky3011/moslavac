package com.af.moslavac;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class Moslavac {

	public static void main(String[] args) {
		SpringApplication.run(Moslavac.class, args);
	}

}
