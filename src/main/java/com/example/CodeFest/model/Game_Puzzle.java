package com.example.CodeFest.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

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
    private String question;
    private HashMap<Integer,String> texts = new HashMap<Integer,String>();
    private ArrayList<String> discussion = new ArrayList<>();


    public void setTexts(int no, String name){
        texts.put(no, name);
    }

    public String getTextValue(int key){
        return texts.get(key);
    } 
    
    public void setValueDiscussion(String msg){
        discussion.add(msg);
    }

}
