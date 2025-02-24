package com.af.moslavac.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.af.moslavac.dtos.VoteAggregate;
import com.af.moslavac.dtos.VoteRequest;
import com.af.moslavac.entities.Vote;
import com.af.moslavac.services.VoteService;

@RestController
@RequestMapping("/api/matches/{matchId}/votes")
public class VoteController {

    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    // U kontroleru:
    @PostMapping
    public void createVote(@PathVariable Long matchId, @RequestBody VoteRequest voteRequest) {
        voteService.createVote(matchId, voteRequest.getVoterId(), voteRequest.getOutcome());
    }

    @GetMapping
    public VoteAggregate getVoteAggregate(@PathVariable Long matchId) {
        return voteService.getAggregateForMatch(matchId);
    }

    @GetMapping("/voter/{voterId}")
    public ResponseEntity<Void> checkIfVoted(
            @PathVariable Long matchId,
            @PathVariable String voterId) {
        Vote existing = voteService.hasVoted(matchId, voterId);
        if (existing != null) {
            return ResponseEntity.ok().build(); // pronašli glas
        } else {
            return ResponseEntity.notFound().build(); // 404
        }
    }

}
