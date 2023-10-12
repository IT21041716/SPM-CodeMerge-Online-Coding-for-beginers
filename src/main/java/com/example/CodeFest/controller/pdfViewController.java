package com.example.CodeFest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CodeFest.model.pdfView;
import com.example.CodeFest.services.pdfViewService;

@RequestMapping("api/pdfView")
@RestController
@CrossOrigin
public class pdfViewController {

    @Autowired
    private pdfViewService pdfviewService;

    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestBody pdfView view) {
        try {
            pdfView resposeView = pdfviewService.insert(view);
            return new ResponseEntity<>(resposeView, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<pdfView>> retrieveAllPdfViews() {
        List<pdfView> pdfViews = pdfviewService.getAll();
        return ResponseEntity.ok(pdfViews);
    }
}
