package com.example.CodeFest.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.CodeFest.model.Admin;

public interface AdminRepo extends MongoRepository<Admin, String> {
    Admin findByEmail(String email);
}
