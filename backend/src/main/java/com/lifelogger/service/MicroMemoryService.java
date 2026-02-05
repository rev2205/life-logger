package com.lifelogger.service;

import com.lifelogger.exception.ResourceNotFoundException;
import com.lifelogger.model.MicroMemory;
import com.lifelogger.model.Mood;
import com.lifelogger.repository.MicroMemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MicroMemoryService {

    @Autowired
    private MicroMemoryRepository microMemoryRepository;

    public MicroMemory createMicroMemory(MicroMemory microMemory, String userId) {
        microMemory.setUserId(userId);
        microMemory.setTimestamp(LocalDateTime.now());
        return microMemoryRepository.save(microMemory);
    }

    public void deleteMicroMemory(String id, String userId) {
        MicroMemory microMemory = microMemoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MicroMemory", "id", id));

        if (!microMemory.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to delete this memory");
        }

        microMemoryRepository.delete(microMemory);
    }

    public List<MicroMemory> getAllMicroMemories(String userId) {
        return microMemoryRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    public List<MicroMemory> filterByMood(String userId, Mood mood) {
        return microMemoryRepository.findByUserIdAndMoodOrderByTimestampDesc(userId, mood);
    }

    public List<MicroMemory> filterByTag(String userId, String tag) {
        return microMemoryRepository.findByUserIdAndTagsContainingOrderByTimestampDesc(userId, tag);
    }

    public List<MicroMemory> filterByLifePhase(String userId, String lifePhaseName) {
        return microMemoryRepository.findByUserIdAndLifePhaseNameOrderByTimestampDesc(userId, lifePhaseName);
    }
}
