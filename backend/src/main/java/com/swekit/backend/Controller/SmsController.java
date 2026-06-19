package com.swekit.backend.Controller;

import com.swekit.backend.Model.Sms;
import com.swekit.backend.Model.SmsRequest;
import com.swekit.backend.Model.User;
import com.swekit.backend.Repository.UserRepository;
import com.swekit.backend.Service.SmsService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://sms-2-web.vercel.app")

@RestController
public class SmsController {

    private final SmsService smsService;
    private final UserRepository userRepository;

    public SmsController(SmsService smsService, UserRepository userRepository){
        this.smsService = smsService;
        this.userRepository = userRepository;
    }



    @GetMapping("/sms")
    public List<Sms> sms(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User currentUser = userRepository.findByEmail(email).orElse(null);
        return smsService.allSms(currentUser);
    }


    @DeleteMapping("/sms/{id}")
    public void deleteSms(@PathVariable int id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User currentUser = userRepository.findByEmail(email).orElse(null);
        smsService.deleteSms(currentUser, id);
    }

    @PostMapping("/sms")
    public Sms addSms(@RequestBody SmsRequest smsRequest){
        String code = smsRequest.getSyncCode();
        User currentUser = userRepository.findBySyncCode(code).orElse(null);
        if (currentUser != null) {
            return smsService.addSms(smsRequest, currentUser);
        } else {
            throw new RuntimeException("Invalid Sync Code!");
        }
    }
}