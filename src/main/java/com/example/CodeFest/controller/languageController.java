package com.example.CodeFest.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.CodeFest.model.Languages;
import com.example.CodeFest.services.LanguageService;
import com.example.CodeFest.util.PdfContentUtil;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequestMapping("/api/languages")
@RestController
@CrossOrigin
public class languageController {

    @Autowired
    private LanguageService languageService;

    @PostMapping("/insert")
    public ResponseEntity<String> insertLanguage(@RequestParam("name") String name, @RequestParam("description") String description,
            @RequestParam("files") MultipartFile[] files , @RequestParam("pageTitle") String pageTitle, @RequestParam("pageSubTitle") String pageSubTitle, @RequestParam("coverImage") MultipartFile[]  coverImage) {
        List<String> errorMessages = new ArrayList<>();
        Languages languageObj = new Languages();
        String uploadDir = "LanguageImages";

        System.out.println("\n\n\n\n\n\n\n"+coverImage+ "\n\n\n\n\n\n\n\n" );

        //language image upload
        Arrays.asList(files).forEach(file -> {
            long timestamp = System.currentTimeMillis();
            String fileName = timestamp + "_"
                    + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

            if (isValidFileType(file)) {
                try {
                    PdfContentUtil.saveFile(uploadDir, fileName, file);
                    languageObj.setImageUrl(fileName);
                } catch (Exception e) {
                    e.printStackTrace();
                    errorMessages.add("Error saving Image: " + fileName);
                }
            } else {
                errorMessages.add("Invalid file type: " + fileName + " ------ Images only..!------");
            }
        });

        //cover image upload
            Arrays.asList(coverImage).forEach(file -> {
            long timestamp = System.currentTimeMillis();
            String fileName = timestamp + "_"
                    + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

            if (isValidFileType(file)) {
                try {
                    PdfContentUtil.saveFile(uploadDir, fileName, file);
                    languageObj.setCoverImageUrl(fileName);;
                } catch (Exception e) {
                    e.printStackTrace();
                    errorMessages.add("Error saving Cover Image: " + fileName);
                }
            } else {
                errorMessages.add("Invalid file type: " + fileName + " ------ Images only..!------");
            }
        });



        if (!errorMessages.isEmpty()) {
            return ResponseEntity.badRequest().body(String.join("\n", errorMessages));
        }

        languageObj.setName(name);
        languageObj.setDescription(description);
        languageObj.setPageTitle(pageTitle);
        languageObj.setPageSubTitle(pageSubTitle);

        languageService.save(languageObj);
        return ResponseEntity.ok("Image uploaded successfully.");
    }

    private boolean isValidFileType(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (contentType.startsWith("image"));
    }

    @GetMapping("/getAll")
    public List<Languages> getAll() {
        return languageService.retriveLanguages();
    }

    @GetMapping("/getById/{id}")
    public Languages getById(@PathVariable("id") String id) {
        return languageService.getOne(id);
    }

    @DeleteMapping("/delete/{id}")
    public boolean languageDelete(@PathVariable("id") String id) {
       
        return languageService.deleteLanguages(id);
    }

}

