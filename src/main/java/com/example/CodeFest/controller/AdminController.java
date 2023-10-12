package com.example.CodeFest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CodeFest.model.Admin;
import com.example.CodeFest.services.AdminService;

@RequestMapping("/api/admin")
@RestController
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/signup")
    public ResponseEntity<?> adminSignup(@RequestBody Admin admin) {
        try {
            Admin registeredAdmin = adminService.register(admin);
            return new ResponseEntity<>(registeredAdmin, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> adminSignin(@RequestBody Admin admin) {
        try {
            Admin registeredAdmin = adminService.login(admin);

            return new ResponseEntity<>(registeredAdmin, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
