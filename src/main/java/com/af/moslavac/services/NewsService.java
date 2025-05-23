package com.af.moslavac.services;

import com.af.moslavac.entities.News;
import com.af.moslavac.repositories.NewsRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional(rollbackOn = Exception.class)
public class NewsService {

    @Autowired
    private final NewsRepository newsRepository;
    @Autowired
    private final Cloudinary cloudinary;

    @Autowired
    public NewsService(NewsRepository newsRepository, Cloudinary cloudinary) {
        this.newsRepository = newsRepository;
        this.cloudinary = cloudinary;
    }

    public Page<News> getAllNews(int page, int size) {
        return newsRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "date")));
    }

    public Optional<News> getNewsById(int id) {
        return newsRepository.findById(id);
    }

    public void deleteNewsById(int id) {
        newsRepository.deleteById(id);
    }

    public News save(News news) {
        return newsRepository.save(news);
    }

    public News updateNews(int id, String title, String content, MultipartFile thumbnail, List<MultipartFile> files) {
        Optional<News> oldNews = newsRepository.findById(id);
        if (oldNews.isPresent()) {
            News news = oldNews.get();
            news.setTitle(title);
            news.setContent(content);

            // Upload thumbnail if provided
            if (thumbnail != null && !thumbnail.isEmpty()) {
                String thumbnailUrl = uploadImageToCloudinary(thumbnail);
                news.setThumbnailPath(thumbnailUrl);
            } else {
                news.setThumbnailPath(null);
            }

            // Upload additional images if provided
            if (files != null && !files.isEmpty()) {
                for (MultipartFile file : files) {
                    String imageUrl = uploadImageToCloudinary(file);
                    news.getImagePaths().add(imageUrl);
                }
            } else {
                news.getImagePaths().clear();
            }

            return newsRepository.save(news);
        } else {
            throw new RuntimeException("News with ID " + id + " not found");
        }
    }

    public String uploadThumbnail(Integer id, MultipartFile file) {
        News news = getNewsById(id).orElseThrow(() -> new RuntimeException("News not found"));
        String thumbnailUrl = uploadImageToCloudinary(file);
        news.setThumbnailPath(thumbnailUrl);
        newsRepository.save(news);
        return thumbnailUrl;
    }

    public String uploadPhoto(Integer id, MultipartFile file) {
        News news = getNewsById(id).orElseThrow(() -> new RuntimeException("News not found"));
        String imageUrl = uploadImageToCloudinary(file);
        news.getImagePaths().add(imageUrl);
        newsRepository.save(news);
        return imageUrl;
    }

    private String uploadImageToCloudinary(MultipartFile file) {
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Error uploading image to Cloudinary", e);
        }
    }

    public List<News> getLatestNews() {
        List<News> allNews = newsRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));
        return allNews.size() <= 6 ? allNews : allNews.subList(0, 6);
    }
}