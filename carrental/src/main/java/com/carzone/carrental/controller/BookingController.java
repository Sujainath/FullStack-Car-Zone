package com.carzone.carrental.controller;

import com.carzone.carrental.model.Booking;
import com.carzone.carrental.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*") // Frontend JS fetch connect aaga idhu romba mukkiyam
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            // Frontend-la irundhu vara data-va database-la save panrom
            Booking savedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(savedBooking);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}