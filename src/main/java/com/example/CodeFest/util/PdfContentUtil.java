package com.example.CodeFest.util;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.web.multipart.MultipartFile;

public class PdfContentUtil {
    public static void saveFile(String uploadDir1, String uploadDir2, String fileName,
            MultipartFile multipartFile) throws IOException {
        Path uploadPath1 = Paths.get(
                "F:\\sliit studies\\Y03S02\\SPM\\SPM-CodeMerge-Online-Coding-for-beginers\\front_end\\public\\uploads\\"
                        + uploadDir1);
        Path uploadPath2 = Paths.get(
                "F:\\sliit studies\\Y03S02\\SPM\\SPM-CodeMerge-Online-Coding-for-beginers\\admin-panel\\public\\uploads\\"
                        + uploadDir2);

        if (!Files.exists(uploadPath1)) {
            Files.createDirectories(uploadPath1);
        }

        if (!Files.exists(uploadPath2)) {
            Files.createDirectories(uploadPath2);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath1 = uploadPath1.resolve(fileName);
            Path filePath2 = uploadPath2.resolve(fileName);

            Files.copy(inputStream, filePath1, StandardCopyOption.REPLACE_EXISTING);

            // Create a new input stream for the second copy operation
            try (InputStream inputStream2 = multipartFile.getInputStream()) {
                Files.copy(inputStream2, filePath2, StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
