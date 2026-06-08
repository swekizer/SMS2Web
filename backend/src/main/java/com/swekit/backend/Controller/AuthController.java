package com.swekit.backend.Controller;

import com.swekit.backend.Model.User;
import com.swekit.backend.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "https://sms-2-web.vercel.app/")

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
        userRepository.save(user);
        return "User saved successfully";
    }


}
