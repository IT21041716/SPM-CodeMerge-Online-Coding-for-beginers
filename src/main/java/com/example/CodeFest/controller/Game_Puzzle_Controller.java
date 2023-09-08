package com.example.CodeFest.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.Objects;
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
    public void addGamePuzzle(@RequestParam("files") MultipartFile[] files,@RequestParam("gameModule") String gameModule, @RequestParam("GMTopic") String GMTopic, @RequestParam("gameId") String gameId){
        String uploadDir = "G";
        AtomicInteger count = new AtomicInteger(0);

        Game_Puzzle GP = new Game_Puzzle();

        Arrays.asList(files).stream().forEach(file->{
             String fileName = (Objects.requireNonNull(file.getOriginalFilename()));
             GP.setImage(count.incrementAndGet(), fileName);
             System.out.println(fileName);   
             try{
                Game_Puzzle_Util.saveImage(uploadDir, fileName, file); 
            }catch(IOException e){

            }

        });

        GP.setGameId(gameId);
        GP.setGameModuleName(gameModule);
        GP.setGameModuleTopic(GMTopic);
        GP.setDiscussion(null);;

        gamePuzzleRepo.save(GP);

    }

    @GetMapping("/result/{gameId}")
    public boolean checkResult(@PathVariable("gameId") String gameId, @RequestParam("files") MultipartFile[] files){
        
        Game_Puzzle GP = gamePuzzleRepo.findById(gameId).get();
        AtomicInteger count = new AtomicInteger(0);
        AtomicBoolean r = new AtomicBoolean(true);
        
        Arrays.asList(files).stream().forEach(file->{
             String fileName = (Objects.requireNonNull(file.getOriginalFilename()));
             
            if(!fileName.equalsIgnoreCase(GP.getImageValue(count.incrementAndGet()))){
                r.set(false);
            }

        });

        boolean result = r.get();
        return result;

    }

    @PutMapping("/update/{gameId}")
    public void updateGame(@PathVariable("gameId") String gameId,@RequestParam("files") MultipartFile[] files,@RequestParam("gameModule") String gameModule, @RequestParam("GMTopic") String GMTopic){

        String uploadDir = "G";
        AtomicInteger count = new AtomicInteger(0);

        Game_Puzzle GP = gamePuzzleRepo.findById(gameId).get();

        Arrays.asList(files).stream().forEach(file->{
             String fileName = (Objects.requireNonNull(file.getOriginalFilename()));
             GP.setImage(count.incrementAndGet(), fileName);
             System.out.println(fileName);   
             try{
                Game_Puzzle_Util.saveImage(uploadDir, fileName, file); 
            }catch(IOException e){

            }

        });

        GP.setDiscussion(GP.getDiscussion());
        GP.setGameId(gameId);
        GP.setGameModuleName(gameModule);
        GP.setGameModuleTopic(GMTopic);

        gamePuzzleRepo.save(GP);
    }

    @DeleteMapping("/delete/{gameId}")
    public void deleteGame(@PathVariable("gameId") String gameId){

        gamePuzzleRepo.deleteById(gameId);

    }

    @PutMapping("/discussion/{gameId}")
    public void addDiscussion(@PathVariable("gameId") String gameId, @RequestBody String dis){

        Game_Puzzle GP = gamePuzzleRepo.findById(gameId).get();

        GP.setValueDiscussion(dis);

    }

    @GetMapping("/view/{gameId}")
    public Game_Puzzle getOnGame_Puzzle(@PathVariable("gameId") String gameId){
        Game_Puzzle GP = gamePuzzleRepo.findById(gameId).get();
        return GP;
    }
    
}
