package com.swekit.backend.Repository;

import com.swekit.backend.Model.Sms;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SmsRepository extends JpaRepository<Sms, Integer> {

}
