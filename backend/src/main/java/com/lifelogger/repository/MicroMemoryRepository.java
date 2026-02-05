package com.lifelogger.repository;

import com.lifelogger.model.MicroMemory;
import com.lifelogger.model.Mood;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MicroMemoryRepository extends MongoRepository<MicroMemory, String> {

    List<MicroMemory> findByUserIdOrderByTimestampDesc(String userId);

    List<MicroMemory> findByUserIdAndMoodOrderByTimestampDesc(String userId, Mood mood);

    List<MicroMemory> findByUserIdAndTagsContainingOrderByTimestampDesc(String userId, String tag);

    List<MicroMemory> findByUserIdAndLifePhaseNameOrderByTimestampDesc(String userId, String lifePhaseName);
}
