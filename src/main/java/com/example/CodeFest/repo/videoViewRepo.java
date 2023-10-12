package com.example.CodeFest.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.CodeFest.model.videoView;

public interface videoViewRepo extends MongoRepository<videoView, String> {

}
