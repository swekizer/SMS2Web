package com.swekit.backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF since this is a stateless REST API
                .cors(Customizer.withDefaults()) // Enable CORS integration so your frontend config is respected
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/sms").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/sms").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/sms/**").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/register").permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults()); // Use Basic Authentication

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Spring Security requires hashing passwords using BCrypt
        return new BCryptPasswordEncoder();
    }
}