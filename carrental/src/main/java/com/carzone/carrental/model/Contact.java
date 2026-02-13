package com.carzone.carrental.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "contacts")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String phone;
    private String category;

    @Column(columnDefinition = "TEXT")
    private String message;
}