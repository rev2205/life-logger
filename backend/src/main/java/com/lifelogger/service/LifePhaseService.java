package com.lifelogger.service;

import com.lifelogger.exception.ResourceNotFoundException;
import com.lifelogger.model.LifePhase;
import com.lifelogger.repository.LifePhaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LifePhaseService {

    @Autowired
    private LifePhaseRepository lifePhaseRepository;

    public LifePhase createLifePhase(LifePhase lifePhase, String userId) {
        lifePhase.setUserId(userId);
        return lifePhaseRepository.save(lifePhase);
    }

    public LifePhase updateLifePhase(String id, LifePhase lifePhaseDetails, String userId) {
        LifePhase lifePhase = lifePhaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LifePhase", "id", id));

        if (!lifePhase.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to update this life phase");
        }

        lifePhase.setName(lifePhaseDetails.getName());
        lifePhase.setStartDate(lifePhaseDetails.getStartDate());
        lifePhase.setEndDate(lifePhaseDetails.getEndDate());
        lifePhase.setDescription(lifePhaseDetails.getDescription());

        return lifePhaseRepository.save(lifePhase);
    }

    public void deleteLifePhase(String id, String userId) {
        LifePhase lifePhase = lifePhaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LifePhase", "id", id));

        if (!lifePhase.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to delete this life phase");
        }

        lifePhaseRepository.delete(lifePhase);
    }

    public List<LifePhase> getAllLifePhases(String userId) {
        return lifePhaseRepository.findByUserIdOrderByStartDateDesc(userId);
    }

    public LifePhase getLifePhaseById(String id, String userId) {
        LifePhase lifePhase = lifePhaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LifePhase", "id", id));

        if (!lifePhase.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to view this life phase");
        }

        return lifePhase;
    }
}
