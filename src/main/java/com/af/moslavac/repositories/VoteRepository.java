package com.af.moslavac.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.af.moslavac.entities.Vote;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    List<Vote> findByMatchId(Long matchId);

    Vote findByMatchIdAndVoterId(Long matchId, String voterId);

}
