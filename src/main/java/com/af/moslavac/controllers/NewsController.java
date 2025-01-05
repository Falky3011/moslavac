package com.af.moslavac.controllers;

import com.af.moslavac.entities.News;
import com.af.moslavac.services.NewsSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import static com.af.moslavac.constants.Constant.NEWS_PHOTO_DIRECTORY;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private NewsSevice newsSevice;

    @GetMapping()
    public Page<News> getAllNews(@RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return newsSevice.getAllNews(page, size);
    }

    @GetMapping("/{id}")
    public Optional<News> getNews(@PathVariable int id) {
        return newsSevice.getNewsById(id);
    }

    @PostMapping()
    public ResponseEntity<News> addNews(@RequestBody News news) {
        News createdNews = newsSevice.save(news);
        // subscriberService.sendNewsletter(news.getTitle(), news.getContent());
        return ResponseEntity.ok(createdNews);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable int id) {
        newsSevice.deleteNewsById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<News> updateNews(
            @PathVariable int id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail,
            @RequestParam(value = "files", required = false) List<MultipartFile> files) {
        // Update the news entity using the service
        News updatedNews = newsSevice.updateNews(id, title, content, thumbnail, files);
        return ResponseEntity.ok(updatedNews);
    }

    @PutMapping("/thumbnail/{id}")
    public ResponseEntity<String> uploadThumbnail(@PathVariable("id") Integer id,
            @RequestParam("thumbnail") MultipartFile file) {
        try {
            String thumbnailUrl = newsSevice.uploadThumbnail(id, file);

            return ResponseEntity.ok(thumbnailUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading thumbnail: " + e.getMessage());
        }
    }

    @PutMapping("/photos/{id}")
    public ResponseEntity<String> uploadMultiplePhotos(@PathVariable("id") Integer id,
            @RequestParam("files") List<MultipartFile> files) {

        StringBuilder responseMessage = new StringBuilder();
        for (MultipartFile file : files) {
            try {
                String photoResponse = newsSevice.uploadPhoto(id, file);
                responseMessage.append(photoResponse).append("\n");
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Error uploading files: " + e.getMessage());
            }
        }
        return ResponseEntity.ok("All files uploaded successfully: \n" + responseMessage.toString());
    }

    @GetMapping("/latest")
    public ResponseEntity<List<News>> getLatestNews() {
        return ResponseEntity.ok(newsSevice.getLatestNews());
    }

    @GetMapping("/image/{filename}")
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
