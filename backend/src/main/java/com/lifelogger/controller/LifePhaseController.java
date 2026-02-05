package com.lifelogger.controller;

import com.lifelogger.model.LifePhase;
import com.lifelogger.service.LifePhaseService;
import com.lifelogger.util.AuthUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phases")
public class LifePhaseController {

    @Autowired
    private LifePhaseService lifePhaseService;

    @Autowired
    private AuthUtil authUtil;

    @PostMapping
    public ResponseEntity<LifePhase> createLifePhase(
            @Valid @RequestBody LifePhase lifePhase,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        LifePhase created = lifePhaseService.createLifePhase(lifePhase, userId);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LifePhase> updateLifePhase(
            @PathVariable String id,
            @Valid @RequestBody LifePhase lifePhase,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        LifePhase updated = lifePhaseService.updateLifePhase(id, lifePhase, userId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLifePhase(@PathVariable String id, Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        lifePhaseService.deleteLifePhase(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<LifePhase>> getAllLifePhases(Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<LifePhase> lifePhases = lifePhaseService.getAllLifePhases(userId);
        return ResponseEntity.ok(lifePhases);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LifePhase> getLifePhaseById(@PathVariable String id, Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        LifePhase lifePhase = lifePhaseService.getLifePhaseById(id, userId);
        return ResponseEntity.ok(lifePhase);
    }
}
