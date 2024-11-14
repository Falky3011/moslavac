package com.af.moslavac.dtos;


import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public class NewsDTO {
    private String title;
    private String content;
    private List<MultipartFile> images;

    public NewsDTO() {
    }

    public NewsDTO(String title, String content, List<MultipartFile> images) {
        this.title = title;
        this.content = content;
        this.images = images;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<MultipartFile> getImages() {
        return images;
    }

    public void setImages(List<MultipartFile> images) {
        this.images = images;
    }
}
