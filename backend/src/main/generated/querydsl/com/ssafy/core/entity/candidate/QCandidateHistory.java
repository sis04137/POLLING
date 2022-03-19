package com.ssafy.core.entity.candidate;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCandidateHistory is a Querydsl query type for CandidateHistory
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCandidateHistory extends EntityPathBase<CandidateHistory> {

    private static final long serialVersionUID = 364659967L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCandidateHistory candidateHistory = new QCandidateHistory("candidateHistory");

    public final com.ssafy.core.entity.common.QBaseTimeEntity _super = new com.ssafy.core.entity.common.QBaseTimeEntity(this);

    public final QCandidate candidate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> created_date = _super.created_date;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modified_date = _super.modified_date;

    public final StringPath transactionId = createString("transactionId");

    public final com.ssafy.core.entity.user.QUser user;

    public final StringPath voteCount = createString("voteCount");

    public QCandidateHistory(String variable) {
        this(CandidateHistory.class, forVariable(variable), INITS);
    }

    public QCandidateHistory(Path<? extends CandidateHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCandidateHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCandidateHistory(PathMetadata metadata, PathInits inits) {
        this(CandidateHistory.class, metadata, inits);
    }

    public QCandidateHistory(Class<? extends CandidateHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.candidate = inits.isInitialized("candidate") ? new QCandidate(forProperty("candidate"), inits.get("candidate")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.core.entity.user.QUser(forProperty("user")) : null;
    }

}
