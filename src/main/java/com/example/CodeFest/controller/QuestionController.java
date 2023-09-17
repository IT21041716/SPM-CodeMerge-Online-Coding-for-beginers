package com.example.CodeFest.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.CodeFest.model.Question;
import com.example.CodeFest.services.QuestionService;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @PostMapping("/ask")
    public Question askQuestion(@RequestBody Question question) {
        return questionService.askQuestion(question);
    }

    @GetMapping("/all")
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/{questionId}")
    public Question getQuestionById(@PathVariable String questionId) {
        return questionService.getQuestionById(questionId);
    }

    @PutMapping("/edit/{questionId}")
    public Question editQuestion(@PathVariable String questionId, @RequestBody Question question) {
        return questionService.editQuestion(questionId, question);
    }

    @DeleteMapping("/delete/{questionId}")
    public void deleteQuestion(@PathVariable String questionId) {
        questionService.deleteQuestion(questionId);
    }
}