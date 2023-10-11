package com.example.CodeFest.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.CodeFest.model.Game_Puzzle;
import com.example.CodeFest.repo.Game_Puzzle_Repo;
import com.example.CodeFest.util.Game_Puzzle_Util;

@RequestMapping("/v1/game")
@RestController
@CrossOrigin
public class Game_Puzzle_Controller {

    @Autowired
    private Game_Puzzle_Repo gamePuzzleRepo;

    @PostMapping("/add")
    public void addGame(@RequestParam("text") List<String> text, @RequestParam("gameModule") String gameModule,
            @RequestParam("GMTopic") String GMTopic, @RequestParam("question") String question) {
        AtomicInteger count = new AtomicInteger(0);
        Game_Puzzle GP = new Game_Puzzle();
        String gameID = UUID.randomUUID().toString();

        for (String tx : text) {
            if (tx != "") {
                GP.setTexts(count.incrementAndGet(), tx);
            }

        }
        GP.setGameId(gameID);
        GP.setGameModuleName(gameModule);
        GP.setGameModuleTopic(GMTopic);
        GP.setDiscussion(null);
        GP.setQuestion(question);

        gamePuzzleRepo.save(GP);
    }

    @PostMapping("/result/{gameId}")
    public boolean checkResult(@PathVariable("gameId") String gameId, @RequestBody List<String> text) {
        boolean result = true;
        Game_Puzzle GP = gamePuzzleRepo.findById(gameId).get();

        System.out.println(text);

        for (int i = 1; i < GP.getTexts().size(); i++) {
            if (!GP.getTextValue(i).equalsIgnoreCase(text.get(i - 1))) {
                result = false;
            }

        }

        return result;
    }

    @PutMapping("/update/{gameId}")
    public void updateGame(@RequestParam("text") List<String> text, @RequestParam("gameModule") String gameModule,
            @RequestParam("GMTopic") String GMTopic, @RequestParam("question") String question,
            @PathVariable("gameId") String gameID) {

        System.out.println("Awa");

        Game_Puzzle GP = gamePuzzleRepo.findById(gameID).get();

        System.out.println(GP);

        GP.setDiscussion(GP.getDiscussion());
        GP.setGameId(gameID);
        GP.setGameModuleName(gameModule);
        GP.setGameModuleTopic(GMTopic);
        GP.setQuestion(question);

        gamePuzzleRepo.save(GP);
    }

    @DeleteMapping("/delete/{gameId}")
    public void deleteGame(@PathVariable("gameId") String gameId) {

        gamePuzzleRepo.deleteById(gameId);

    }

    @PutMapping("/discussion/{gameId}")
    public void addDiscussion(@PathVariable("gameId") String gameId, @RequestBody String dis) {

        Game_Puzzle GP = gamePuzzleRepo.findById(gameId).get();

        GP.setValueDiscussion(dis);

    }

    @GetMapping("/view/{gameId}")
    public Game_Puzzle getOnGame_Puzzle(@PathVariable("gameId") String gameId) {
        Game_Puzzle GP = gamePuzzleRepo.findById(gameId).get();
        return GP;
    }

    @GetMapping("/all")
    public List<Game_Puzzle> allGames() {
        return gamePuzzleRepo.findAll();
    }

    @GetMapping("/one/{gameId}")
    public ArrayList<String> getGameCodeList(@PathVariable("gameId") String gameId) {
        Game_Puzzle GP = gamePuzzleRepo.findById(gameId).get();
        ArrayList<String> t = new ArrayList<>();

        for (int i = 1; i < GP.getTexts().size(); i++) {
            t.add(GP.getTextValue(i));
        }

        return t;
    }

    @GetMapping("/gameModuls")
    public ArrayList<String> getGameModules() {
        List<Game_Puzzle> GP = gamePuzzleRepo.findAll();
        ArrayList<String> moduleTexts = new ArrayList<>();

    for (Game_Puzzle module : GP) {
        moduleTexts.add(module.getGameModuleTopic());
    }

    return moduleTexts;
    }

     @GetMapping("/gameTopic/{gameModuleTopic}")
    public String getGameModules(@PathVariable("gameModuleTopic") String gameModuleTopic) {
        Game_Puzzle GP = gamePuzzleRepo.findByGameModuleTopic(gameModuleTopic).get(0);
        

    return GP.getGameId();
    }

}
