package com.polling.poll.queryrepository.comment;

import static org.assertj.core.api.Assertions.assertThat;

import com.polling.entity.candidate.Candidate;
import com.polling.entity.comment.Comment;
import com.polling.entity.member.Member;
import com.polling.poll.dto.comment.response.FindCommentResponseDto;
import com.polling.queryrepository.CommentQueryRepository;
import com.polling.repository.candidate.CandidateRepository;
import com.polling.repository.comment.CommentRepository;
import com.polling.repository.member.MemberRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
public class CommentQueryRepositoryTest {

  @Autowired
  private CommentQueryRepository commentQueryRepository;
  @Autowired
  private MemberRepository memberRepository;
  @Autowired
  private CandidateRepository candidateRepository;
  @Autowired
  private CommentRepository commentRepository;

  @Test
  public void 후보에작성된댓글모두조회() throws Exception {
    //given
    Member savedMember = memberRepository.save(Member.builder()
        .email("test")
        .nickname("testName")
        .build());
    Candidate savedCandidate = candidateRepository.save(Candidate.builder()
        .contractIndex(1)
        .name("suzy")
        .profile("hello")
        .build());
    createComment(savedMember, savedCandidate, "hello1");
    createComment(savedMember, savedCandidate, "hello2");
    createComment(savedMember, savedCandidate, "hello3");
    createComment(savedMember, savedCandidate, "hello4");
    createComment(savedMember, savedCandidate, "hello5");

    //when
    List<FindCommentResponseDto> findCommentResponseDtos = commentQueryRepository.findAllByCandidateId(
        savedCandidate.getId());

    //then
    assertThat(findCommentResponseDtos.size()).isEqualTo(5);
    assertThat(findCommentResponseDtos.get(0).getContent()).isEqualTo("hello1");
    assertThat(findCommentResponseDtos.get(0).getMemberId()).isEqualTo(savedMember.getId());
    assertThat(findCommentResponseDtos.get(0).getMemberNickname()).isEqualTo("testName");
  }

  private Comment createComment(Member member, Candidate target, String message) {
    return commentRepository.save(Comment.builder()
        .content(message)
        .candidate(target)
        .member(member)
        .build());
  }
}