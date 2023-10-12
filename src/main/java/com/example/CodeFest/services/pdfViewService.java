package com.example.CodeFest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CodeFest.model.pdfView;
import com.example.CodeFest.repo.pdfViewRepo;

@Service
public class pdfViewService {

    @Autowired
    private pdfViewRepo pdfvierRepo;

    public pdfView insert(pdfView pdfview) {
        pdfView savedPdfView = pdfvierRepo.save(pdfview);
        return savedPdfView;
    }

    public List<pdfView> getAll() {
        return pdfvierRepo.findAll();
    }
}
