package com.example.CodeFest.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.CodeFest.model.VedioContent;

@Repository
public interface VedioContentRepo extends MongoRepository<VedioContent, String> {
    List<VedioContent> findByLanguageIn(List<String> languages);
}
