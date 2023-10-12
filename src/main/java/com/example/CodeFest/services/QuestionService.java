package com.example.CodeFest.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CodeFest.model.Question;

import com.example.CodeFest.repo.QuestionRepository;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public Question askQuestion(Question question) {
        // You can implement validation and other business logic here
        return questionRepository.save(question);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question save(Question question) {
        return questionRepository.save(question);
    }

    public Question getQuestionById(String questionId) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        return questionOptional.orElse(null);
    }

    public Question editQuestion(String questionId, Question updatedQuestion) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isPresent()) {
            Question existingQuestion = questionOptional.get();
            existingQuestion.setTitle(updatedQuestion.getTitle());
            existingQuestion.setContent(updatedQuestion.getContent());
            // Update other fields as needed
            return questionRepository.save(existingQuestion);
        } else {
            return null; // Question not found
        }
    }

    public void deleteQuestion(String questionId) {
        questionRepository.deleteById(questionId);
    }

    public List<Question> getQuestionsByUserId(String userId) {
        return questionRepository.findByUser_Id(userId);
    }

}
