package com.example.CodeFest.model;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "games")
public class Game_Puzzle {

    @Id
    private String gameId;
    private String gameModuleName;
    private String gameModuleTopic;
    private HashMap<Integer,String> images = new HashMap<Integer,String>();
    private ArrayList<String> discussion = new ArrayList<>();


    public void setImage(int no, String name){
        images.put(no, name);
    }

    public String getImageValue(int key){
        return images.get(key);
    } 
    
    public void setValueDiscussion(String msg){
        discussion.add(msg);
    }
    
}
