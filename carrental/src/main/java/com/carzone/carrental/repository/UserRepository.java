package com.carzone.carrental.repository;

import com.carzone.carrental.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Indha line-ah add pannunga, appo dhaan AuthController-la red color pogum
    Optional<User> findByEmail(String email);

    Optional<User> findByEmailOrUsername(String email, String username);
}