package com.swekit.backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
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
                        // 1. Only the android app (ANDROID role) can POST new SMS messages
                        .requestMatchers(HttpMethod.POST, "/sms").hasRole("ANDROID")

                        // 2. Only you (ADMIN role) can GET all SMS or DELETE them
                        .requestMatchers(HttpMethod.GET, "/sms").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/sms/**").hasRole("ADMIN")

                        // 3. All other requests must be authenticated
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults()); // Use Basic Authentication

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        // Create you as the Admin user
        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("admin123")) // Replace with a local password for now
                .roles("ADMIN")
                .build();

        // Create the Android App user
        UserDetails androidApp = User.builder()
                .username("android_device")
                .password(passwordEncoder.encode("android123")) // Replace with a local password for now
                .roles("ANDROID")
                .build();

        return new InMemoryUserDetailsManager(admin, androidApp);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Spring Security requires hashing passwords using BCrypt
        return new BCryptPasswordEncoder();
    }
}