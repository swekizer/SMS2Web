package com.swekit.backend.Controller;

import com.swekit.backend.Model.User;
import com.swekit.backend.Repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"https://sms-2-web.vercel.app", "https://sms-2-web-abcn.vercel.app"})

@RestController
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }



    @PostMapping("/register")
    public String emailEntry(@RequestBody User user){
        String hashed = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashed);
        String randomCode = java.util.UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        user.setSyncCode(randomCode);
        userRepository.save(user);
        return "User saved successfully";
    }

    @GetMapping("/me")
    public User getMe(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        return userRepository.findByEmail(email).orElse(null);
    }


}
