package com.af.moslavac.services;

import com.af.moslavac.entities.News;
import com.af.moslavac.repositories.NewsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.af.moslavac.constants.Constant.NEWS_PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Transactional(rollbackOn = Exception.class)
public class NewsSevice {

    @Autowired
    private NewsRepository newsRepository;


    public Page<News> getAllNews(int page, int size) {
        return newsRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC,"date")));
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

    public News updateNews(int newsID, String title, String content, MultipartFile thumbnail, List<MultipartFile> files) {
        Optional<News> oldNews = newsRepository.findById(newsID);

        if (oldNews.isPresent()) {
            News news = oldNews.get();
            news.setTitle(title);
            news.setContent(content);

            // Update thumbnail if provided
            if (thumbnail != null && !thumbnail.isEmpty()) {
                String thumbnailUrl = imageFunction.apply(newsID, thumbnail);
                news.setThumbnailPath(thumbnailUrl);
            }

            // Update additional images if provided
            if (files != null && !files.isEmpty()) {
                for (MultipartFile file : files) {
                    String imageUrl = imageFunction.apply(newsID, file);
                    news.getImagePaths().add(imageUrl);
                }
            }

            return newsRepository.save(news);
        } else {
            throw new RuntimeException("News with ID " + newsID + " not found");
        }
    }

    public String uploadThumbnail(Integer newsID, MultipartFile file) {
        News news = getNewsById(newsID).orElse(null);
        String thumbnailUrl = imageFunction.apply(newsID, file);

        news.setThumbnailPath(thumbnailUrl);
        newsRepository.save(news);

        return thumbnailUrl;
    }

    public String uploadPhoto(Integer newsID, MultipartFile file) {
        News news = getNewsById(newsID).orElse(null);
        String imageUrl = imageFunction.apply(newsID, file);

        news.getImagePaths().add(imageUrl);
        newsRepository.save(news);

        return imageUrl;
    }

    private final Function<String, String> fileExstension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<Integer, MultipartFile, String> imageFunction = (id, image) -> {
        String filename = id + "_" + System.currentTimeMillis() + fileExstension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(NEWS_PHOTO_DIRECTORY).toAbsolutePath().normalize();

            if (!Files.exists(fileStorageLocation))
                Files.createDirectory(fileStorageLocation);

            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);

            return ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/news/image/" + filename).toUriString();
        } catch (Exception e) {
            throw new RuntimeException("Unable to save image");
        }
    };

    public List<News> getLatestNews() {
        List<News> allNews = newsRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));
        return allNews.size() <= 6 ? allNews : allNews.subList(0, 6);
    }
}
