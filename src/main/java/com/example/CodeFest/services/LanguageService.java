package com.example.CodeFest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.CodeFest.model.Languages;
import com.example.CodeFest.repo.LanguagesRepo;

@Service
@Transactional
public class LanguageService {
    @Autowired
    private LanguagesRepo languageRepo;

    // save languages
    public Languages save(Languages languages) {
        return languageRepo.save(languages);
    }

    public List<Languages> retriveLanguages() {
        List<Languages> languageList = languageRepo.findAll();
        return languageList;
    }

    public boolean deleteLanguages(String id) {
        if (languageRepo.existsById(id)) {
            languageRepo.deleteById(id);
            return true;
        } else
            return false;
    }

    public Languages getOne(String id) {
        Languages languageObj = languageRepo.findById(id).get();
        return languageObj;
    }
}
