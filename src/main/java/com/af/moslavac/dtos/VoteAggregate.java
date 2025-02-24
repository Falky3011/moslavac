package com.af.moslavac.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
public class VoteAggregate {
    private long homeCount;
    private long drawCount;
    private long awayCount;

    public VoteAggregate(long homeCount, long drawCount, long awayCount) {
        this.homeCount = homeCount;
        this.drawCount = drawCount;
        this.awayCount = awayCount;
    }

    public VoteAggregate() {
    }

    public long getHomeCount() {
        return homeCount;
    }

    public long getDrawCount() {
        return drawCount;
    }

    public long getAwayCount() {
        return awayCount;
    }

    public void setHomeCount(long homeCount) {
        this.homeCount = homeCount;
    }

    public void setDrawCount(long drawCount) {
        this.drawCount = drawCount;
    }

    public void setAwayCount(long awayCount) {
        this.awayCount = awayCount;
    }
}
