package com.example.CodeFest.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.CodeFest.model.Answer;


@Repository
public interface AnswerRepository extends MongoRepository<Answer, String>{
 List<Answer> findByQuestionId(String questionId);
}
