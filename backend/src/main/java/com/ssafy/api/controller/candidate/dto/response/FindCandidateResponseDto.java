package com.ssafy.api.controller.candidate.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class FindCandidateResponseDto {
    private Long id;
    private String name;
    private String profilePath;
    private Integer voteTotal;
}
