package com.example.CodeFest.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Admin")
public class Admin {
    @Id
    private String id;
    private String name;
    private String email;
    private String contactNo;
    private String password;

}
