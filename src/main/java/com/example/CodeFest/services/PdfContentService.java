package com.example.CodeFest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.CodeFest.model.PdfContent;
import com.example.CodeFest.repo.PdfContentRepo;

@Service
@Transactional
public class PdfContentService {

    @Autowired
    private PdfContentRepo pdfContentRepo;

    // pdf save/insert crud
    public PdfContent save(PdfContent pdfContent) {
        return pdfContentRepo.save(pdfContent);
    }

    // get pdf by id
    public PdfContent getOne(String id) {
        PdfContent pdfObj = pdfContentRepo.findById(id).get();
        return pdfObj;
    }

    // get video by id
    public PdfContent getOneVideo(String id) {
        PdfContent pdfObj = pdfContentRepo.findById(id).get();
        return pdfObj;
    }

    // get all by languages
    public List<PdfContent> getByLanguage(List<String> language) {
        List<PdfContent> pdfList = pdfContentRepo.findByLanguageIn(language);
        return pdfList;
    }

    // update pdf content
    public PdfContent updatePdf(PdfContent pdfContent) {
        return pdfContentRepo.save(pdfContent);
    }

    // delete pdf content
    public List<PdfContent> deletePdfContent(String id, String language) {
        // if (pdfContentRepo.existsById(id)) {
        //     pdfContentRepo.deleteById(id);
        //     List<PdfContent> pdfList = pdfContentRepo.findByLanguageIn(language);
        //     return pdfList;
        // } else{
        //     List<PdfContent> pdfList = pdfContentRepo.findByLanguageIn(language);
        //     return pdfList; 
        // }
        return null;
    }

    //delete all pdf content
    public void deleteAllByLanguage (String language){
        pdfContentRepo.deleteAllByLanguage(language);
    }


}
