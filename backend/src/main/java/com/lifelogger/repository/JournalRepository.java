package com.lifelogger.repository;

import com.lifelogger.model.Journal;
import com.lifelogger.model.Mood;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface JournalRepository extends MongoRepository<Journal, String> {

    List<Journal> findByUserIdAndIsDeletedFalseOrderByDateDescTimeDesc(String userId);

    List<Journal> findByUserIdAndDateAndIsDeletedFalse(String userId, LocalDate date);

    List<Journal> findByUserIdAndMoodAndIsDeletedFalse(String userId, Mood mood);

    List<Journal> findByUserIdAndTagsContainingAndIsDeletedFalse(String userId, String tag);

    @Query("{ 'userId': ?0, 'isDeleted': false, 'content': { $regex: ?1, $options: 'i' } }")
    List<Journal> searchByContent(String userId, String searchText);

    List<Journal> findByUserIdAndContextAndIsDeletedFalse(String userId, String context);

    List<Journal> findByUserIdAndLifePhaseNameAndIsDeletedFalse(String userId, String lifePhaseName);
}
