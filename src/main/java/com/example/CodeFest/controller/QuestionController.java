package com.example.CodeFest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.CodeFest.model.Question;
import com.example.CodeFest.model.User;
import com.example.CodeFest.services.QuestionService;
import com.example.CodeFest.services.UserService;
import com.example.CodeFest.util.UserContentUtil;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private UserService userService;

    @PostMapping("/insert")
    public ResponseEntity<String> insertUser(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "image", required = false) MultipartFile[] image,
            @RequestParam("userId") String userId) {

        List<String> errorMessages = new ArrayList<>();
        Question questionObj = new Question();
        String uploadDir = "Question Images";

        // cover image upload
        // UserController newUser = new UserController();
        // User user = userService.getOne1(userId);
        Optional<User> userOptional = userService.getOne(userId);
        User user = userOptional.get();

        if (image == null) {
            questionObj.setImage("");
        } else {
            Arrays.asList(image).forEach(file -> {
                long timestamp = System.currentTimeMillis();
                String fileName = timestamp + "_"
                        + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

                if (isValidFileType(file)) {
                    try {
                        UserContentUtil.saveFile(uploadDir, fileName, file);
                        questionObj.setImage(fileName);

                    } catch (Exception e) {
                        e.printStackTrace();
                        errorMessages.add("Error saving Cover Image: " + fileName);
                    }
                } else {
                    errorMessages.add("Invalid file type in coverImage: " + fileName + " ------ Images only..!------");
                }
            });
        }
        if (!errorMessages.isEmpty()) {
            return ResponseEntity.badRequest().body(String.join("\n", errorMessages));
        }

        questionObj.setTitle(title);
        questionObj.setContent(content);
        questionObj.setUser(user);

        questionService.save(questionObj);
        return ResponseEntity.ok("Image uploaded successfully.");
    }

    private boolean isValidFileType(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (contentType.startsWith("image"));
    }

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

    @GetMapping("/user/{userId}")
    public List<Question> getQuestionsByUserId(@PathVariable String userId) {
        return questionService.getQuestionsByUserId(userId);
    }
}