package com.example.CodeFest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.CodeFest.model.Languages;
import com.example.CodeFest.repo.LanguagesRepo;
import com.example.CodeFest.repo.PdfContentRepo;

@Service
@Transactional
public class LanguageService {
    @Autowired
    private LanguagesRepo languageRepo;
    @Autowired
    private PdfContentRepo pdfContentRepo;

    // save languages
    public Languages save(Languages languages) {
        return languageRepo.save(languages);
    }

    public List<Languages> retriveLanguages() {
        List<Languages> languageList = languageRepo.findAll();
        return languageList;
    }

    public List<Languages> deleteLanguages(String id, String language) {
        if (languageRepo.existsById(id)) {
            languageRepo.deleteById(id);

            pdfContentRepo.deleteAllByLanguage(language);
            List<Languages> languageList = languageRepo.findAll();
            return languageList;
        } else {
            List<Languages> languageList1 = languageRepo.findAll();
            return languageList1;
        }
    }

    public Languages getOne(String id) {
        Languages languageObj = languageRepo.findById(id).get();
        return languageObj;
    }

    public Languages updateLanguage (Languages languages){
        languageRepo.save(languages);
        return languageRepo.findById(languages.getId()).get();
    }
}
