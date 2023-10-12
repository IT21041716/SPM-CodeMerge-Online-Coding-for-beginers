package com.example.CodeFest.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.CodeFest.model.Game_Puzzle;

@Repository
public interface Game_Puzzle_Repo extends MongoRepository<Game_Puzzle,String>{
    @Query("{gameModuleTopic: ?0}")
    List<Game_Puzzle> findByGameModuleTopic(String gameModuleTopic);
}
