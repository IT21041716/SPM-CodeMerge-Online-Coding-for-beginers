package com.example.CodeFest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.CodeFest.model.Languages;
import com.example.CodeFest.model.User;
import com.example.CodeFest.services.UserService;
import com.example.CodeFest.util.PdfContentUtil;
import com.example.CodeFest.util.UserContentUtil;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/insert")
    public ResponseEntity<String> insertUser(@RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("contactNo") String contactNo,
            @RequestParam("password") String password,
            @RequestParam(value = "image", required = false) MultipartFile[] image) {

        List<String> errorMessages = new ArrayList<>();
        User userObj = new User();
        String uploadDir = "UserImages";

        // cover image upload

        if (image == null) {
            userObj.setImage("");
        } else {
            Arrays.asList(image).forEach(file -> {
                long timestamp = System.currentTimeMillis();
                String fileName = timestamp + "_"
                        + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

                if (isValidFileType(file)) {
                    try {
                        UserContentUtil.saveFile(uploadDir, fileName, file);
                        userObj.setImage(fileName);

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

        userObj.setFirstName(firstName);
        userObj.setLastName(lastName);
        userObj.setEmail(email);
        userObj.setContactNo(contactNo);
        userObj.setPassword(password);

        service.save(userObj);
        return ResponseEntity.ok("Image uploaded successfully.");
    }

    private boolean isValidFileType(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (contentType.startsWith("image"));
    }

    @PostMapping("/")
    public ResponseEntity<User> save(@RequestBody User body) {
        User responseBody = service.save(body);

        if (responseBody == body) {
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new User());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable String id, @RequestBody User body) {
        boolean response = service.update(id, body);

        if (response) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(body);
        } else {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(body);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> delete(@PathVariable String id) {
        boolean response = service.delete(id);

        if (response) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new User());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new User());
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> getAll() {
        List<User> dataSet = service.getAll();

        if (!dataSet.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(dataSet);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getOne(@PathVariable String id) {
        Optional<User> data = service.getOne(id);

        if (data.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(data);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map> login(@RequestBody User body) {
        String login = service.login(body);
        Map<String, Object> response = new HashMap<>();
        if (login.equals("email")) {
            response.put("status", false);
            response.put("message", "NoUser");
            response.put("id", null);
        } else if (login.equals("password")) {
            response.put("status", false);
            response.put("message", "ErrorPassword");
            response.put("id", null);
        } else {
            response.put("status", true);
            response.put("message", "Success");
            response.put("id", login);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}