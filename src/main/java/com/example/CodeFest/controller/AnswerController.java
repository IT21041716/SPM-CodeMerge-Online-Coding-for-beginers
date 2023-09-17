package com.example.CodeFest.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.CodeFest.model.Answer;
import com.example.CodeFest.services.AnswerService;

import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {
    @Autowired
    private AnswerService answerService;

    @PostMapping("/post")
    public Answer postAnswer(@RequestBody Answer answer) {
        return answerService.postAnswer(answer);
    }

    @GetMapping("/question/{questionId}")
    public List<Answer> getAnswersByQuestionId(@PathVariable String questionId) {
        return answerService.getAnswersByQuestionId(questionId);
    }

    @GetMapping("/{answerId}")
    public Answer getAnswerById(@PathVariable String answerId) {
        return answerService.getAnswerById(answerId);
    }

    @PutMapping("/edit/{answerId}")
    public Answer editAnswer(@PathVariable String answerId, @RequestBody Answer answer) {
        return answerService.editAnswer(answerId, answer);
    }

    @DeleteMapping("/delete/{answerId}")
    public void deleteAnswer(@PathVariable String answerId) {
        answerService.deleteAnswer(answerId);
    }
}
