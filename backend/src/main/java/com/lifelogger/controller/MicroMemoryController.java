package com.lifelogger.controller;

import com.lifelogger.model.MicroMemory;
import com.lifelogger.model.Mood;
import com.lifelogger.service.MicroMemoryService;
import com.lifelogger.util.AuthUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/memories")
public class MicroMemoryController {

    @Autowired
    private MicroMemoryService microMemoryService;

    @Autowired
    private AuthUtil authUtil;

    @PostMapping
    public ResponseEntity<MicroMemory> createMicroMemory(
            @Valid @RequestBody MicroMemory microMemory,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        MicroMemory created = microMemoryService.createMicroMemory(microMemory, userId);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMicroMemory(@PathVariable String id, Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        microMemoryService.deleteMicroMemory(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<MicroMemory>> getAllMicroMemories(Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<MicroMemory> memories = microMemoryService.getAllMicroMemories(userId);
        return ResponseEntity.ok(memories);
    }

    @GetMapping("/filter/mood/{mood}")
    public ResponseEntity<List<MicroMemory>> filterByMood(
            @PathVariable Mood mood,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<MicroMemory> memories = microMemoryService.filterByMood(userId, mood);
        return ResponseEntity.ok(memories);
    }

    @GetMapping("/filter/tag/{tag}")
    public ResponseEntity<List<MicroMemory>> filterByTag(
            @PathVariable String tag,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<MicroMemory> memories = microMemoryService.filterByTag(userId, tag);
        return ResponseEntity.ok(memories);
    }

}
