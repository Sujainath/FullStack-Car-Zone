package com.carzone.carrental.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fname;
    private String lname;
    private String email;
    private String dob;
    private String contact;
    private String state;
    private String district;
    private String city;
    private String startDate;
    private String returnDate;
    private String carCategory;
    private String carModel;
    private int members;
}