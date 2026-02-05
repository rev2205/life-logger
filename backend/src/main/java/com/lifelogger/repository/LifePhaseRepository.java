package com.lifelogger.repository;

import com.lifelogger.model.LifePhase;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LifePhaseRepository extends MongoRepository<LifePhase, String> {

    List<LifePhase> findByUserIdOrderByStartDateDesc(String userId);

    Optional<LifePhase> findByUserIdAndName(String userId, String name);
}
