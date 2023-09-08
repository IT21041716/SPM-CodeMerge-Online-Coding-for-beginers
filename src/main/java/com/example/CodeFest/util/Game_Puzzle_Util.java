package com.example.CodeFest.util;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.web.multipart.MultipartFile;

public class Game_Puzzle_Util {

    public static void saveImage(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException{
        Path uploaPath = Paths.get("C:\\Users\\sajindu shamalka\\Desktop\\SPM PROJECT\\CodeFest\\CodeFest\\front_end\\public\\Images" + uploadDir);
        if(!Files.exists(uploaPath)){
            Files.createDirectories(uploaPath);
        }
        try(InputStream inputStream = multipartFile.getInputStream()){
            Path filePath = uploaPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }catch(IOException e){
            
        }
    }
    
}
