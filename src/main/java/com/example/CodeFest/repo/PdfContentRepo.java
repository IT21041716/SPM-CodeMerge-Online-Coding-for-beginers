package com.example.CodeFest.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.CodeFest.model.PdfContent;

@Repository
public interface PdfContentRepo extends MongoRepository<PdfContent, String> {
    List<PdfContent> findByLanguageIn(List<String> language);
    void deleteAllByLanguage(String language);
}
