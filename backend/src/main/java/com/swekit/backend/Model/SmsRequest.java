package com.swekit.backend.Model;

import java.time.LocalDateTime;

public class SmsRequest {
    private LocalDateTime receivedAt;
    private String sender;
    private String message;


    public SmsRequest(){

    }

    public SmsRequest(LocalDateTime receivedAt, String sender, String message){
        this.receivedAt = receivedAt;
        this.sender = sender;
        this.message = message;
    }


    public LocalDateTime getReceivedAt() {
        return receivedAt;
    }

    public void setReceivedAt(LocalDateTime receivedAt) {
        this.receivedAt = receivedAt;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
