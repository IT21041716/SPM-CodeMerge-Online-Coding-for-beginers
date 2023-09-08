package com.example.CodeFest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.CodeFest.model.VedioContent;
import com.example.CodeFest.repo.VedioContentRepo;

@Service
@Transactional
public class VedioContentService {
    @Autowired
    private VedioContentRepo vedioContentRepo;

    // insert vedio lessons
    public VedioContent save(VedioContent vedioContent) {
        return vedioContentRepo.save(vedioContent);
    }

    // get vedio by id
    public VedioContent getAll(String id) {
        VedioContent vedioObj = vedioContentRepo.findById(id).get();
        return vedioObj;
    }

    // get all by languages
    public List<VedioContent> getByLanguage(List<String> language) {
        List<VedioContent> vedioList = vedioContentRepo.findByLanguageIn(language);
        return vedioList;
    }

    // update vedio content
    public VedioContent updateVedio(VedioContent vedioContent) {
        return vedioContentRepo.save(vedioContent);
    }

    // delete vedio content
    public boolean deleteVedioContent(String id) {
        if (vedioContentRepo.existsById(id)) {
            vedioContentRepo.deleteById(id);
            return true;
        } else
            return false;
    }
}
