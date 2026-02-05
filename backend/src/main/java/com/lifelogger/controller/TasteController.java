package com.lifelogger.controller;

import com.lifelogger.model.Taste;
import com.lifelogger.model.TasteType;
import com.lifelogger.service.TasteService;
import com.lifelogger.util.AuthUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tastes")
public class TasteController {

    @Autowired
    private TasteService tasteService;

    @Autowired
    private AuthUtil authUtil;

    @PostMapping
    public ResponseEntity<Taste> createTaste(@Valid @RequestBody Taste taste, Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        Taste created = tasteService.createTaste(taste, userId);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Taste> updateTaste(
            @PathVariable String id,
            @Valid @RequestBody Taste taste,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        Taste updated = tasteService.updateTaste(id, taste, userId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaste(@PathVariable String id, Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        tasteService.deleteTaste(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Taste>> getAllTastes(Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Taste> tastes = tasteService.getAllTastes(userId);
        return ResponseEntity.ok(tastes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Taste> getTasteById(@PathVariable String id, Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        Taste taste = tasteService.getTasteById(id, userId);
        return ResponseEntity.ok(taste);
    }

    @GetMapping("/filter/type/{type}")
    public ResponseEntity<List<Taste>> filterByType(
            @PathVariable TasteType type,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Taste> tastes = tasteService.filterByType(userId, type);
        return ResponseEntity.ok(tastes);
    }

    @GetMapping("/sort/rating")
    public ResponseEntity<List<Taste>> sortByRating(Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Taste> tastes = tasteService.sortByRating(userId);
        return ResponseEntity.ok(tastes);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Taste>> searchTastes(
            @RequestParam String q,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Taste> tastes = tasteService.searchTastes(userId, q);
        return ResponseEntity.ok(tastes);
    }

    @GetMapping("/filter/tag/{tag}")
    public ResponseEntity<List<Taste>> filterByTag(
            @PathVariable String tag,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Taste> tastes = tasteService.filterByTag(userId, tag);
        return ResponseEntity.ok(tastes);
    }

}
