package com.carzone.carrental.controller;

import com.carzone.carrental.model.User;
import com.carzone.carrental.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // To fix the connect error
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        userRepository.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Registered Successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        Optional<User> dbUser = userRepository.findByEmailOrUsername(user.getEmail(), user.getEmail());

        if (dbUser.isPresent() && dbUser.get().getPassword().equals(user.getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("token", "valid-user-token");
            response.put("username", dbUser.get().getUsername()); //  To transfer the username to frontend
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Invalid Username/Email or Password");
        }
    }
    @DeleteMapping("/delete-account")
    public ResponseEntity<?> deleteAccount(@RequestParam String email, @RequestParam String password) {
        // 1. First check email 
        Optional<User> user = userRepository.findByEmail(email);

        // 2. If the user email is there next to check the password is correct
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            userRepository.delete(user.get());
            Map<String, String> response = new HashMap<>();
            response.put("message", "Account deleted successfully");
            return ResponseEntity.ok(response);
        } else {
            // If there is no email,
            return ResponseEntity.status(401).body("Invalid Email or Password. Delete failed!");
        }
    }

}
