package com.example.CodeFest.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.CodeFest.model.Admin;
import com.example.CodeFest.repo.AdminRepo;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminrepo;

    public Admin register(Admin admin) {
        // Check if an admin with the provided email already exists
        if (adminrepo.findByEmail(admin.getEmail()) != null) {
            throw new IllegalArgumentException("Email already registered..!");
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(hashedPassword);

        return adminrepo.save(admin);
    }

    public Admin login(Admin admin) {
        Admin registeredAdmin = adminrepo.findByEmail(admin.getEmail());

        if (registeredAdmin != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(admin.getPassword(), registeredAdmin.getPassword())) {
                return registeredAdmin;
            }
        }
        throw new UsernameNotFoundException("Invalid credintial.");
    }
}
