package com.example.CodeFest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CodeFest.model.videoView;
import com.example.CodeFest.repo.videoViewRepo;


@Service
public class videoViewService {

    @Autowired
    private videoViewRepo repo;

    public videoView insert(videoView video) {
        videoView savedPdfView = repo.save(video);
        return savedPdfView;
    }

    public List<videoView> getAll() {
        return repo.findAll();
    }
}
