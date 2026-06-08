package com.swekit.backend.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Sms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private LocalDateTime receivedAt;
    private String sender;
    private String message;

    @ManyToOne
    @JoinColumn(name = "user_user_id")
    private User user;


    public Sms(){
    }

    public Sms(LocalDateTime receivedAt, String sender, String message) {
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }



}
