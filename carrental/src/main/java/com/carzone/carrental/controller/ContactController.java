package com.carzone.carrental.controller;

import com.carzone.carrental.model.Contact;
import com.carzone.carrental.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping("/send")
    public ResponseEntity<?> receiveInquiry(@RequestBody Contact contact) {
        try {
            contactRepository.save(contact);
            Map<String, String> response = new HashMap<>();
            
            response.put("message", "Inquiry sent successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving inquiry");
        }
    }

}
