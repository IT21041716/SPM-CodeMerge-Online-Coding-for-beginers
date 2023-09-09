package com.example.CodeFest.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.CodeFest.model.Languages;

@Repository
public interface LanguagesRepo extends MongoRepository<Languages,String>{
    
}
