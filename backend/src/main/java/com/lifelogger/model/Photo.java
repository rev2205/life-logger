package com.lifelogger.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "photos")
public class Photo {

    @Id
    private String id;

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    @NotNull(message = "Date uploaded is required")
    private LocalDateTime dateUploaded;

    private String location;

    private Mood mood;

    private List<String> tags;

    private String story;

    private String technicalNotes;

    private String lifePhaseName;
}
