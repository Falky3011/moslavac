package com.af.moslavac.services;

import org.springframework.stereotype.Service;

import com.af.moslavac.dtos.VoteAggregate;
import com.af.moslavac.entities.Vote;
import com.af.moslavac.enums.VoteOutcome;
import com.af.moslavac.repositories.VoteRepository;

import java.util.List;

@Service
public class VoteService {

    private final VoteRepository voteRepository;

    public VoteService(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    public Vote createVote(Long matchId, String voterId, VoteOutcome outcome) {
        Vote existing = voteRepository.findByMatchIdAndVoterId(matchId, voterId);
        if (existing != null) {
            // Baci iznimku ili vrati grešku
            throw new RuntimeException("Voter already voted for this match");
        }
        Vote vote = new Vote();
        vote.setMatchId(matchId);
        vote.setOutcome(outcome);
        vote.setVoterId(voterId);
        return voteRepository.save(vote);
    }

    public List<Vote> getVotesForMatch(Long matchId) {
        return voteRepository.findByMatchId(matchId);
    }

    /**
     * Vraća agregat: home, draw, away count.
     */
    public VoteAggregate getAggregateForMatch(Long matchId) {
        List<Vote> votes = voteRepository.findByMatchId(matchId);

        long homeCount = votes.stream()
                .filter(v -> v.getOutcome() == VoteOutcome.HOME)
                .count();
        long drawCount = votes.stream()
                .filter(v -> v.getOutcome() == VoteOutcome.DRAW)
                .count();
        long awayCount = votes.stream()
                .filter(v -> v.getOutcome() == VoteOutcome.AWAY)
                .count();

        VoteAggregate voteAggregate = new VoteAggregate(homeCount, drawCount, awayCount);
        return voteAggregate;

    }

    public Vote hasVoted(Long matchId, String voterId) {
        return voteRepository.findByMatchIdAndVoterId(matchId, voterId);
    }

}
