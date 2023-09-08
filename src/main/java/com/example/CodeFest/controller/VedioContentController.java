package com.example.CodeFest.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.CodeFest.model.VedioContent;
import com.example.CodeFest.services.VedioContentService;
import com.example.CodeFest.util.PdfContentUtil;

@RequestMapping("/api/vedio/")
@RestController

public class VedioContentController {

    @Autowired
    private VedioContentService vedioContentService;

    @PostMapping("/insert")
    public ResponseEntity<String> insertVedioContent(@RequestParam("number") int number,
            @RequestParam("language") String language, @RequestParam("title") String title,
            @RequestParam("files") MultipartFile[] files) {

        List<String> errorMessages = new ArrayList<>();
        VedioContent vedio = new VedioContent();
        String uploadDir = "vedios";
        Arrays.asList(files).forEach(file -> {
            long timestamp = System.currentTimeMillis();
            String fileName = timestamp + "_"
                    + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

            if (isValidFileType(file)) {
                try {
                    PdfContentUtil.saveFile(uploadDir, fileName, file);
                    vedio.setUrl(fileName);
                } catch (Exception e) {
                    e.printStackTrace();
                    errorMessages.add("Error saving vedio: " + fileName);
                }
            } else {
                errorMessages.add("Invalid file type: " + fileName + " ------ vedios only..!------");
            }
        });

        if (!errorMessages.isEmpty()) {
            return ResponseEntity.badRequest().body(String.join("\n", errorMessages));
        }

        vedio.setNumber(number);
        vedio.setLanguage(language);
        vedio.setTitle(title);

        vedioContentService.save(vedio);
        return ResponseEntity.ok("Vedio uploaded succesfully..!");
    }

    private boolean isValidFileType(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (contentType.startsWith("video"));
    }

    @GetMapping("/getById/{id}")
    public VedioContent getAllVedios(@PathVariable("id") String id) {
        return vedioContentService.getAll(id);
    }

    @GetMapping("/getByLanguage/{language}")
    public List<VedioContent> getAllByLanguage(@PathVariable("language") List<String> language) {
        return vedioContentService.getByLanguage(language);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateVedioContent(@RequestParam("id") String id, @RequestParam("number") int number,
            @RequestParam("language") String language, @RequestParam("title") String title,
            @RequestParam("files") MultipartFile[] files) {

        List<String> errorMessages = new ArrayList<>();
        VedioContent vedio = new VedioContent();
        String uploadDir = "vedios";
        Arrays.asList(files).forEach(file -> {
            long timestamp = System.currentTimeMillis();
            String fileName = timestamp + "_"
                    + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

            if (isValidFileType(file)) {
                try {
                    PdfContentUtil.saveFile(uploadDir, fileName, file);
                    vedio.setUrl(fileName);
                } catch (Exception e) {
                    e.printStackTrace();
                    errorMessages.add("Error saving vedio: " + fileName);
                }
            } else {
                errorMessages.add("Invalid file type: " + fileName + " ------ vedios only..!------");
            }
        });

        if (!errorMessages.isEmpty()) {
            return ResponseEntity.badRequest().body(String.join("\n", errorMessages));
        }

        vedio.setId(id);
        vedio.setNumber(number);
        vedio.setLanguage(language);
        vedio.setTitle(title);

        vedioContentService.updateVedio(vedio);
        return ResponseEntity.ok("Vedio updated succesfully..!");
    }

    @DeleteMapping("/delete/{id}")
    public boolean pdfDelete(@PathVariable("id") String id) {
        return vedioContentService.deleteVedioContent(id);
    }
}
