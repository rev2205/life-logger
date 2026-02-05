package com.lifelogger.service;

import com.lifelogger.exception.ResourceNotFoundException;
import com.lifelogger.model.Journal;
import com.lifelogger.model.Mood;
import com.lifelogger.repository.JournalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
//import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class JournalService {

    @Autowired
    private JournalRepository journalRepository;

    public Journal createJournal(Journal journal, String userId) {
        journal.setUserId(userId);
        journal.setDate(LocalDate.now());
        journal.setTime(LocalTime.now());
        journal.setDeleted(false);
        return journalRepository.save(journal);
    }

    public Journal updateJournal(String id, Journal journalDetails, String userId) {
        Journal journal = journalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Journal", "id", id));

        if (!journal.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to update this journal");
        }

        if (journal.isDeleted()) {
            throw new IllegalArgumentException("Cannot update a deleted journal");
        }

        journal.setContent(journalDetails.getContent());
        journal.setMood(journalDetails.getMood());
        journal.setTags(journalDetails.getTags());
        journal.setContext(journalDetails.getContext());
        journal.setLifePhaseName(journalDetails.getLifePhaseName());

        return journalRepository.save(journal);
    }

    public void softDeleteJournal(String id, String userId) {
        Journal journal = journalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Journal", "id", id));

        if (!journal.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to delete this journal");
        }

        journal.setDeleted(true);
        journalRepository.save(journal);
    }

    public List<Journal> getAllJournals(String userId) {
        return journalRepository.findByUserIdAndIsDeletedFalseOrderByDateDescTimeDesc(userId);
    }

    public Journal getJournalById(String id, String userId) {
        Journal journal = journalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Journal", "id", id));

        if (!journal.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to view this journal");
        }

        if (journal.isDeleted()) {
            throw new ResourceNotFoundException("Journal", "id", id);
        }

        return journal;
    }

    public List<Journal> getJournalsByDate(String userId, LocalDate date) {
        return journalRepository.findByUserIdAndDateAndIsDeletedFalse(userId, date);
    }

    public List<Journal> searchJournals(String userId, String searchText) {
        return journalRepository.searchByContent(userId, searchText);
    }

    public List<Journal> filterByMood(String userId, Mood mood) {
        return journalRepository.findByUserIdAndMoodAndIsDeletedFalse(userId, mood);
    }

    public List<Journal> filterByTag(String userId, String tag) {
        return journalRepository.findByUserIdAndTagsContainingAndIsDeletedFalse(userId, tag);
    }

    public List<Journal> filterByContext(String userId, String context) {
        return journalRepository.findByUserIdAndContextAndIsDeletedFalse(userId, context);
    }

    public List<Journal> filterByLifePhase(String userId, String lifePhaseName) {
        return journalRepository.findByUserIdAndLifePhaseNameAndIsDeletedFalse(userId, lifePhaseName);
    }
}
