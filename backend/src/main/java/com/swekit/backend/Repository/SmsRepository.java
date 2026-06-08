package com.swekit.backend.Repository;

import com.swekit.backend.Model.Sms;
import com.swekit.backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SmsRepository extends JpaRepository<Sms, Integer> {

    List<Sms> findByUser(User user);
}
