package com.af.moslavac.controllers;

import com.af.moslavac.entities.News;
import com.af.moslavac.services.NewsSevice;
import com.af.moslavac.services.SubscriberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import static com.af.moslavac.constants.Constant.NEWS_PHOTO_DIRECTORY;
import static org.springframework.util.MimeTypeUtils.IMAGE_PNG_VALUE;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class NewsController {

    @Autowired
    private NewsSevice newsSevice;

    @Autowired
    private SubscriberService subscriberService;

    @GetMapping("/news")
    public Page<News> getAllNews(@RequestParam(value = "page", defaultValue = "0") int page,
                              @RequestParam(value = "size", defaultValue = "10") int size) {
        return newsSevice.getAllNews(page, size);
    }

    @GetMapping("/news/{newsID}")
    public Optional<News> getNews(@PathVariable int newsID) {
        return newsSevice.getNewsById(newsID);
    }

    @PostMapping("/news")
    public ResponseEntity<News> addNews(@RequestBody News news) {
        News createdNews = newsSevice.save(news);
        subscriberService.sendNewsletter(news.getTitle(), news.getContent());
        return ResponseEntity.ok(createdNews);
    }

    @DeleteMapping("/news/{newsID}")
    public ResponseEntity<Void> deleteNews(@PathVariable int newsID) {
        newsSevice.deleteNewsById(newsID);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/news/{newsID}")
    public ResponseEntity<News> updateNews(@PathVariable int newsID, @RequestBody News news) {
        return ResponseEntity.ok(newsSevice.updateNews(newsID, news));
    }

    @PutMapping("/news/thumbnail/{newsID}")
    public ResponseEntity<String> uploadThumbnail(@PathVariable("newsID") Integer newsID,
                                                       @RequestParam("thumbnail") MultipartFile file) {
        System.out.println(file.getOriginalFilename());
        try {
            newsSevice.uploadThumbnail(newsID, file);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading thumbnail: " + e.getMessage());
        }

        return ResponseEntity.ok("Thumbnail uploaded successfully");
    }

    @PutMapping("/news/photos/{newsID}")
    public ResponseEntity<String> uploadMultiplePhotos(@PathVariable("newsID") Integer newsID,
                                                       @RequestParam("files") List<MultipartFile> files) {

        StringBuilder responseMessage = new StringBuilder();
        for (MultipartFile file : files) {
            try {
                String photoResponse = newsSevice.uploadPhoto(newsID, file);
                responseMessage.append(photoResponse).append("\n");
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Error uploading files: " + e.getMessage());
            }
        }
        return ResponseEntity.ok("All files uploaded successfully: \n" + responseMessage.toString());
    }


    @GetMapping("/news/latest")
    public ResponseEntity<List<News>> getLatestNews() {
        return ResponseEntity.ok(newsSevice.getLatestNews());
    }

    @GetMapping("/news/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path path = Paths.get(NEWS_PHOTO_DIRECTORY).resolve(filename);
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_PNG) // prilagodi MIME tip ovisno o ekstenziji slike
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}

