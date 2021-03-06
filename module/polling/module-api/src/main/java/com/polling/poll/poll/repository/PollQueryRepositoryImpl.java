package com.polling.poll.poll.repository;

import static com.polling.poll.candidate.entity.QCandidate.candidate;
import static com.polling.poll.candidate.entity.QCandidateGallery.candidateGallery;
import static com.polling.poll.poll.entity.QPoll.poll;

import com.polling.poll.poll.dto.response.FindPollPageResponseDto;
import com.polling.poll.poll.entity.Poll;
import com.polling.poll.poll.entity.status.PollStatus;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Repository
public class PollQueryRepositoryImpl implements PollQueryRepository {

  private final JPAQueryFactory query;

  @Override
  public List<FindPollPageResponseDto> findPollPageByStatus(PollStatus pollStatus, int offset,
      int limit) {
    return query
        .select(Projections.constructor(FindPollPageResponseDto.class,
            poll.id,
            poll.title,
            poll.thumbnail,
            poll.openStatus,
            poll.startDate,
            poll.endDate))
        .from(poll)
        .where(poll.pollStatus.eq(pollStatus))
        .orderBy(poll.createdDate.desc())
        .offset(offset)
        .limit(limit)
        .fetch();
  }

  @Override
  public List<Poll> findByCurrentBeforeEndTime(LocalDateTime current) {
    return query
        .select(poll)
        .from(poll)
        .where(poll.endDate.before(current)
            .and(poll.pollStatus.eq(PollStatus.IN_PROGRESS)))
        .fetch();
  }

  @Override
  public List<Poll> findByCurrentBeforeStartTime(LocalDateTime current) {
    return query
        .select(poll)
        .from(poll)
        .where(poll.startDate.before(current)
            .and(poll.pollStatus.eq(PollStatus.WAIT)))
        .fetch();
  }

  @Override
  public void deleteImageByPollId(Long pollId) {
    query
        .delete(candidateGallery)
        .where(candidateGallery.in(
            JPAExpressions
                .select(candidateGallery)
                .from(candidateGallery)
                .innerJoin(candidateGallery.candidate, candidate)
                .where(candidate.poll.id.eq(pollId))
        )).execute();
  }


  @Override
  public void deleteCandidateByPollId(Long pollId) {
    query.delete(candidate)
        .where(candidate.in(
            JPAExpressions
                .select(candidate)
                .from(candidate)
                .where(candidate.poll.id.eq(pollId))
        )).execute();
  }
}