package com.lifelogger.service;

import com.lifelogger.exception.ResourceNotFoundException;
import com.lifelogger.model.Mood;
import com.lifelogger.model.Photo;
import com.lifelogger.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PhotoService {

    @Autowired
    private PhotoRepository photoRepository;

    @Value("${file.upload.dir}")
    private String uploadDir;

    public Photo uploadPhoto(MultipartFile file, Photo photoMetadata, String userId) throws IOException {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : "";
        String filename = UUID.randomUUID().toString() + extension;

        // Save file
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Save metadata
        photoMetadata.setUserId(userId);
        photoMetadata.setImageUrl("/uploads/photos/" + filename);
        photoMetadata.setDateUploaded(LocalDateTime.now());

        return photoRepository.save(photoMetadata);
    }

    public void deletePhoto(String id, String userId) throws IOException {
        Photo photo = photoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Photo", "id", id));

        if (!photo.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to delete this photo");
        }

        // Delete file from filesystem
        String filename = photo.getImageUrl().substring(photo.getImageUrl().lastIndexOf("/") + 1);
        Path filePath = Paths.get(uploadDir).resolve(filename);
        Files.deleteIfExists(filePath);

        // Delete from database
        photoRepository.delete(photo);
    }

    public List<Photo> getAllPhotos(String userId) {
        return photoRepository.findByUserIdOrderByDateUploadedDesc(userId);
    }

    public Photo getPhotoById(String id, String userId) {
        Photo photo = photoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Photo", "id", id));

        if (!photo.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to view this photo");
        }

        return photo;
    }

    public List<Photo> filterByMood(String userId, Mood mood) {
        return photoRepository.findByUserIdAndMoodOrderByDateUploadedDesc(userId, mood);
    }

    public List<Photo> filterByTag(String userId, String tag) {
        return photoRepository.findByUserIdAndTagsContainingOrderByDateUploadedDesc(userId, tag);
    }

    public List<Photo> filterByLifePhase(String userId, String lifePhaseName) {
        return photoRepository.findByUserIdAndLifePhaseNameOrderByDateUploadedDesc(userId, lifePhaseName);
    }
}
