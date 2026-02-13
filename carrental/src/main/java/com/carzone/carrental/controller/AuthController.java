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
@CrossOrigin(origins = "*") // Idhu dhaan connection error-ah fix pannum
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
        // Inga user anupura 'email' field-la irukura value-ah,
        // namma database-la email-layum check panrom, username-layum check panrom.
        Optional<User> dbUser = userRepository.findByEmailOrUsername(user.getEmail(), user.getEmail());

        if (dbUser.isPresent() && dbUser.get().getPassword().equals(user.getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("token", "valid-user-token");
            response.put("username", dbUser.get().getUsername()); // Username-ah frontend-ku anupuroam
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Invalid Username/Email or Password");
        }
    }
    @DeleteMapping("/delete-account")
    public ResponseEntity<?> deleteAccount(@RequestParam String email, @RequestParam String password) {
        // 1. First email vachu user-ah kandupidippom
        Optional<User> user = userRepository.findByEmail(email);

        // 2. User irundha, password match aagudha-nu check pannuvom
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            userRepository.delete(user.get());
            Map<String, String> response = new HashMap<>();
            response.put("message", "Account deleted successfully");
            return ResponseEntity.ok(response);
        } else {
            // Email thappa irundhaalo illa password match aagala-naalo error kaattum
            return ResponseEntity.status(401).body("Invalid Email or Password. Delete failed!");
        }
    }
}