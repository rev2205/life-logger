package com.lifelogger.service;

import com.lifelogger.exception.ResourceNotFoundException;
import com.lifelogger.model.Taste;
import com.lifelogger.model.TasteType;
import com.lifelogger.repository.TasteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasteService {

    @Autowired
    private TasteRepository tasteRepository;

    public Taste createTaste(Taste taste, String userId) {
        taste.setUserId(userId);
        return tasteRepository.save(taste);
    }

    public Taste updateTaste(String id, Taste tasteDetails, String userId) {
        Taste taste = tasteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Taste", "id", id));

        if (!taste.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to update this item");
        }

        taste.setType(tasteDetails.getType());
        taste.setTitle(tasteDetails.getTitle());
        taste.setDateConsumed(tasteDetails.getDateConsumed());
        taste.setPersonalNote(tasteDetails.getPersonalNote());
        taste.setRating(tasteDetails.getRating());
        taste.setMood(tasteDetails.getMood());
        taste.setTags(tasteDetails.getTags());
        taste.setLifePhaseName(tasteDetails.getLifePhaseName());

        return tasteRepository.save(taste);
    }

    public void deleteTaste(String id, String userId) {
        Taste taste = tasteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Taste", "id", id));

        if (!taste.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to delete this item");
        }

        tasteRepository.delete(taste);
    }

    public List<Taste> getAllTastes(String userId) {
        return tasteRepository.findByUserIdOrderByDateConsumedDesc(userId);
    }

    public Taste getTasteById(String id, String userId) {
        Taste taste = tasteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Taste", "id", id));

        if (!taste.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to view this item");
        }

        return taste;
    }

    public List<Taste> filterByType(String userId, TasteType type) {
        return tasteRepository.findByUserIdAndTypeOrderByDateConsumedDesc(userId, type);
    }

    public List<Taste> sortByRating(String userId) {
        return tasteRepository.findByUserIdOrderByRatingDesc(userId);
    }

    public List<Taste> searchTastes(String userId, String searchText) {
        return tasteRepository.searchByTitleOrNote(userId, searchText);
    }

    public List<Taste> filterByTag(String userId, String tag) {
        return tasteRepository.findByUserIdAndTagsContaining(userId, tag);
    }

    public List<Taste> filterByLifePhase(String userId, String lifePhaseName) {
        return tasteRepository.findByUserIdAndLifePhaseName(userId, lifePhaseName);
    }
}
