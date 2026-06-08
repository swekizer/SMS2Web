package com.swekit.backend.Service;

import com.swekit.backend.Model.Sms;
import com.swekit.backend.Model.SmsRequest;
import com.swekit.backend.Model.User;
import com.swekit.backend.Repository.SmsRepository;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class SmsService {

    private final SmsRepository smsRepository;

    public SmsService(SmsRepository smsRepository){
        this.smsRepository = smsRepository;
    }


    public List<Sms> allSms(User user){
        return smsRepository.findByUser(user);
    }

    public void deleteSms(User user, int id){
        Optional<Sms> s = smsRepository.findById(id);
        Sms ss = s.orElse(null);
        if(ss == null){
            System.out.println("SMS does not exist");
            return;
        }

        if(ss.getUser().getUserId() == user.getUserId()){
            smsRepository.deleteById(id);
        }
    }



    public Sms addSms(SmsRequest smsRequest, User user){
        Sms s = new Sms(smsRequest.getReceivedAt(), smsRequest.getSender(), smsRequest.getMessage());
        s.setUser(user);
        return smsRepository.save(s);
    }
}
