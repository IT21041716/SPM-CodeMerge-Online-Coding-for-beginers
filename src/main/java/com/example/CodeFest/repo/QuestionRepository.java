package com.example.CodeFest.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.CodeFest.model.Question;



@Repository
public interface QuestionRepository extends MongoRepository<Question, String>{
    List<Question> findByUserId(String userId);
}
