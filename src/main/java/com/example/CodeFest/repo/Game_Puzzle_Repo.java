package com.example.CodeFest.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.CodeFest.model.Game_Puzzle;

@Repository
public interface Game_Puzzle_Repo extends MongoRepository<Game_Puzzle,String>{
    
}
