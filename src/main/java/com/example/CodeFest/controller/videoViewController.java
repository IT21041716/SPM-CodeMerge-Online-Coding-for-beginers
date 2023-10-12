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

import com.example.CodeFest.model.videoView;
import com.example.CodeFest.services.videoViewService;

@RequestMapping("api/videoView")
@RestController
@CrossOrigin
public class videoViewController {

    @Autowired
    private videoViewService vedioviewService;

    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestBody videoView view) {
        try {
            videoView resposeView = vedioviewService.insert(view);
            return new ResponseEntity<>(resposeView, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<videoView>> retrieveAllPdfViews() {
        List<videoView> videoViews = vedioviewService.getAll();
        return ResponseEntity.ok(videoViews);
    }
}
