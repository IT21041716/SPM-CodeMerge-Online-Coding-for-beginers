package com.example.CodeFest.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.CodeFest.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}