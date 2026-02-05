package com.lifelogger.controller;

import com.lifelogger.model.Journal;
import com.lifelogger.model.Mood;
import com.lifelogger.service.JournalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.lifelogger.repository.UserRepository;
import com.lifelogger.model.User;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/journals")
public class JournalController {

    @Autowired
    private JournalService journalService;

    @Autowired
    private UserRepository userRepository;

    private String getUserId(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }

    @PostMapping
    public ResponseEntity<Journal> createJournal(@Valid @RequestBody Journal journal, Authentication authentication) {
        String userId = getUserId(authentication);
        Journal created = journalService.createJournal(journal, userId);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Journal> updateJournal(
            @PathVariable String id,
            @Valid @RequestBody Journal journal,
            Authentication authentication) {
        String userId = getUserId(authentication);
        Journal updated = journalService.updateJournal(id, journal, userId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJournal(@PathVariable String id, Authentication authentication) {
        String userId = getUserId(authentication);
        journalService.softDeleteJournal(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Journal>> getAllJournals(Authentication authentication) {
        String userId = getUserId(authentication);
        List<Journal> journals = journalService.getAllJournals(userId);
        return ResponseEntity.ok(journals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Journal> getJournalById(@PathVariable String id, Authentication authentication) {
        String userId = getUserId(authentication);
        Journal journal = journalService.getJournalById(id, userId);
        return ResponseEntity.ok(journal);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Journal>> getJournalsByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            Authentication authentication) {
        String userId = getUserId(authentication);
        List<Journal> journals = journalService.getJournalsByDate(userId, date);
        return ResponseEntity.ok(journals);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Journal>> searchJournals(
            @RequestParam String q,
            Authentication authentication) {
        String userId = getUserId(authentication);
        List<Journal> journals = journalService.searchJournals(userId, q);
        return ResponseEntity.ok(journals);
    }

    @GetMapping("/filter/mood/{mood}")
    public ResponseEntity<List<Journal>> filterByMood(
            @PathVariable Mood mood,
            Authentication authentication) {
        String userId = getUserId(authentication);
        List<Journal> journals = journalService.filterByMood(userId, mood);
        return ResponseEntity.ok(journals);
    }

    @GetMapping("/filter/tag/{tag}")
    public ResponseEntity<List<Journal>> filterByTag(
            @PathVariable String tag,
            Authentication authentication) {
        String userId = getUserId(authentication);
        List<Journal> journals = journalService.filterByTag(userId, tag);
        return ResponseEntity.ok(journals);
    }

    @GetMapping("/filter/context/{context}")
    public ResponseEntity<List<Journal>> filterByContext(
            @PathVariable String context,
            Authentication authentication) {
        String userId = getUserId(authentication);
        List<Journal> journals = journalService.filterByContext(userId, context);
        return ResponseEntity.ok(journals);
    }

}
