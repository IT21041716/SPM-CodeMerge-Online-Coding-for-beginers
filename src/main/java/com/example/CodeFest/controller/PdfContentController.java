package com.example.CodeFest.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.CodeFest.model.PdfContent;
import com.example.CodeFest.services.PdfContentService;
import com.example.CodeFest.util.PdfContentUtil;

@RequestMapping("/api/pdf/")
@RestController
@CrossOrigin
public class PdfContentController {

    @Autowired
    private PdfContentService pdfContentService;

    @PostMapping("/insert")
    public ResponseEntity<String> insertPdfContent(@RequestParam("number") int number,
            @RequestParam("language") String language, @RequestParam("title") String title,
            @RequestParam("pdf") MultipartFile[] pdfFiles, @RequestParam("vedio") MultipartFile[] vedioFiles) {
        List<String> errorMessages = new ArrayList<>();
        PdfContent pdf = new PdfContent();
        // pdf upload part
        String uploadDir = "pdf";
        Arrays.asList(pdfFiles).forEach(file -> {
            long timestamp = System.currentTimeMillis();
            String fileName = timestamp + "_"
                    + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

            if (isValidFileType(file)) {
                try {
                    PdfContentUtil.saveFile(uploadDir, fileName, file);
                    pdf.setPdfUrl(fileName);
                } catch (Exception e) {
                    e.printStackTrace();
                    errorMessages.add("Error saving file: " + fileName);
                }
            } else {
                errorMessages.add("Invalid file type: " + fileName + " ------ pdf only..!------");
            }
        });

        if (!errorMessages.isEmpty()) {
            return ResponseEntity.badRequest().body(String.join("\n", errorMessages));
        }

        pdf.setNumber(number);
        pdf.setLanguage(language);
        pdf.setTitle(title);

        // vedio upload part
        String uploadDirV = "vedios";
        Arrays.asList(vedioFiles).forEach(file -> {
            long timestamp = System.currentTimeMillis();
            String fileName = timestamp + "_"
                    + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

            if (isValidFileTypeVedio(file)) {
                try {
                    PdfContentUtil.saveFile(uploadDirV, fileName, file);
                    pdf.setVedioUrl(fileName);
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

        pdfContentService.save(pdf);
        return ResponseEntity.ok("Files uploaded successfully.");
    }

    private boolean isValidFileType(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (contentType.equals("application/pdf"));
    }

    private boolean isValidFileTypeVedio(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (contentType.startsWith("video"));
    }

    @GetMapping("/getById/{id}")
    public PdfContent getPdfById(@PathVariable("id") String id) {
        return pdfContentService.getOne(id);
    }

    @GetMapping("/getByLanguage/{language}")
    public List<PdfContent> getAllByLanguage(@PathVariable("language") List<String> language) {
        return pdfContentService.getByLanguage(language);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updatePdfContent(@RequestParam("id") String id, @RequestParam("number") int number,
            @RequestParam("language") String language, @RequestParam("title") String title,
            @RequestParam("pdf") MultipartFile[] pdfFiles, @RequestParam("vedio") MultipartFile[] vedioFiles) {
        List<String> errorMessages = new ArrayList<>();
        PdfContent pdf = new PdfContent();
        // pdf upload part
        String uploadDir = "pdf";
        Arrays.asList(pdfFiles).forEach(file -> {
            long timestamp = System.currentTimeMillis();
            String fileName = timestamp + "_"
                    + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

            if (isValidFileType(file)) {
                try {
                    PdfContentUtil.saveFile(uploadDir, fileName, file);
                    pdf.setPdfUrl(fileName);
                } catch (Exception e) {
                    e.printStackTrace();
                    errorMessages.add("Error saving file: " + fileName);
                }
            } else {
                errorMessages.add("Invalid file type: " + fileName + " ------ pdf only..!------");
            }
        });

        if (!errorMessages.isEmpty()) {
            return ResponseEntity.badRequest().body(String.join("\n", errorMessages));
        }
        pdf.setId(id);
        pdf.setNumber(number);
        pdf.setLanguage(language);
        pdf.setTitle(title);

        // vedio upload part
        String uploadDirV = "vedios";
        Arrays.asList(vedioFiles).forEach(file -> {
            long timestamp = System.currentTimeMillis();
            String fileName = timestamp + "_"
                    + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

            if (isValidFileTypeVedio(file)) {
                try {
                    PdfContentUtil.saveFile(uploadDirV, fileName, file);
                    pdf.setVedioUrl(fileName);
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

        pdfContentService.updatePdf(pdf);
        return ResponseEntity.ok("files updated successfully.");
    }

    @DeleteMapping("/delete/{id}")
    public boolean pdfDelete(@PathVariable("id") String id) {
        return pdfContentService.deletePdfContent(id);
    }


    @DeleteMapping("/deleteAll/{language}")
    public void deleteAll(@PathVariable("language") String language){
        pdfContentService.deleteAllByLanguage(language);
    }
}
