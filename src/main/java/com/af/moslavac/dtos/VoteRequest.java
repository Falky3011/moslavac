package com.af.moslavac.dtos;

import com.af.moslavac.enums.VoteOutcome;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VoteRequest {
    private VoteOutcome outcome;
    private String voterId;

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
