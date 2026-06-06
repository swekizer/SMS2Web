package com.swekit.backend.Controller;

import com.swekit.backend.Model.Sms;
import com.swekit.backend.Model.SmsRequest;
import com.swekit.backend.Service.SmsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")

@RestController
public class SmsController {

    private final SmsService smsService;

    public SmsController(SmsService smsService){
        this.smsService = smsService;
    }


    @GetMapping("/sms")
    public List<Sms> sms(){
        return smsService.allSms();
    }


    @DeleteMapping("/sms/{id}")
    public void deleteSms(@PathVariable int id){
        smsService.deleteSms(id);
    }

    @PostMapping("/sms")
    public Sms addSms(@RequestBody SmsRequest smsRequest){
        return smsService.addSms(smsRequest);
    }
}
