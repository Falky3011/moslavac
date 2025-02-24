package com.af.moslavac.entities;

import com.af.moslavac.enums.VoteOutcome;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "votes")
@Getter
@Setter
@AllArgsConstructor
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long matchId;
    // Identifikator utakmice za koju je glasano

    @Enumerated(EnumType.STRING)
    private VoteOutcome outcome;
    // HOME, DRAW, AWAY

    private String voterId;

    public Vote() {
    }

    public Vote(Long matchId, VoteOutcome outcome) {
        this.matchId = matchId;
        this.outcome = outcome;
    }

    public Long getId() {
        return id;
    }

    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public VoteOutcome getOutcome() {
        return outcome;
    }

    public void setOutcome(VoteOutcome outcome) {
        this.outcome = outcome;
    }

    public String getVoterId() {
        return voterId;
    }

    public void setVoterId(String voterId) {
        this.voterId = voterId;
    }
}