package com.example.CodeFest.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.CodeFest.model.pdfView;

public interface pdfViewRepo extends MongoRepository<pdfView, String> {

}
