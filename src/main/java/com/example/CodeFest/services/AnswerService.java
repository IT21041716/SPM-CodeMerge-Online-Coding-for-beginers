package com.example.CodeFest.services;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CodeFest.model.Answer;
import com.example.CodeFest.repo.AnswerRepository;



@Service
public class AnswerService {
    @Autowired
    private AnswerRepository answerRepository;

    public Answer postAnswer(Answer answer) {
        // You can implement validation and other business logic here
        return answerRepository.save(answer);
    }

    public List<Answer> getAnswersByQuestionId(String questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    public Answer getAnswerById(String answerId) {
        Optional<Answer> answerOptional = answerRepository.findById(answerId);
        return answerOptional.orElse(null);
    }

    public Answer editAnswer(String answerId, Answer updatedAnswer) {
        Optional<Answer> answerOptional = answerRepository.findById(answerId);
        if (answerOptional.isPresent()) {
            Answer existingAnswer = answerOptional.get();
            existingAnswer.setContent(updatedAnswer.getContent());
            // Update other fields as needed
            return answerRepository.save(existingAnswer);
        } else {
            return null; // Answer not found
        }
    }

    public void deleteAnswer(String answerId) {
        answerRepository.deleteById(answerId);
    }

    // Add more methods for retrieving, updating, and deleting answers
}
