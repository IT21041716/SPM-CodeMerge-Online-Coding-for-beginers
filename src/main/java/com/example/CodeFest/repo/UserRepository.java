package com.example.CodeFest.repo;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.example.CodeFest.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
