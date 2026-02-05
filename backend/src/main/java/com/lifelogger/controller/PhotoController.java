package com.lifelogger.controller;

import com.lifelogger.model.Mood;
import com.lifelogger.model.Photo;
import com.lifelogger.service.PhotoService;
import com.lifelogger.util.AuthUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/photos")
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<Photo> uploadPhoto(
            @RequestParam("file") MultipartFile file,
            @RequestParam("metadata") String metadataJson,
            Authentication authentication) throws IOException {

        String userId = authUtil.getUserId(authentication);
        Photo metadata = objectMapper.readValue(metadataJson, Photo.class);
        Photo created = photoService.uploadPhoto(file, metadata, userId);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable String id, Authentication authentication) throws IOException {
        String userId = authUtil.getUserId(authentication);
        photoService.deletePhoto(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Photo>> getAllPhotos(Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Photo> photos = photoService.getAllPhotos(userId);
        return ResponseEntity.ok(photos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Photo> getPhotoById(@PathVariable String id, Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        Photo photo = photoService.getPhotoById(id, userId);
        return ResponseEntity.ok(photo);
    }

    @GetMapping("/filter/mood/{mood}")
    public ResponseEntity<List<Photo>> filterByMood(
            @PathVariable Mood mood,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Photo> photos = photoService.filterByMood(userId, mood);
        return ResponseEntity.ok(photos);
    }

    @GetMapping("/filter/tag/{tag}")
    public ResponseEntity<List<Photo>> filterByTag(
            @PathVariable String tag,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Photo> photos = photoService.filterByTag(userId, tag);
        return ResponseEntity.ok(photos);
    }

    @GetMapping("/filter/phase/{lifePhaseName}")
    public ResponseEntity<List<Photo>> filterByLifePhase(
            @PathVariable String lifePhaseName,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Photo> photos = photoService.filterByLifePhase(userId, lifePhaseName);
        return ResponseEntity.ok(photos);
    }
}
