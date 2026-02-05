package com.lifelogger.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "places")
public class Place {

    @Id
    private String id;

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Type is required")
    private PlaceType type;

    @NotNull(message = "Status is required")
    private PlaceStatus status;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;

    private LocalDate dateVisited;

    private String experienceNote;

    private Mood mood;

    private List<String> tags;

    private String lifePhaseName;
}
