package com.af.moslavac.controllers;

import com.af.moslavac.services.HnsApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class HnsApiController {

    @Autowired
    private final HnsApiService hnsApiService;

    public HnsApiController(HnsApiService hnsApiService) {
        this.hnsApiService = hnsApiService;
    }

    @GetMapping("/api/competition/{competitionId}/matches")
    public List<Object> getAllCompetitionMatches(@PathVariable Integer competitionId) {
        return hnsApiService.getAllCompetitionMatches(competitionId);
    }

    @GetMapping("/api/matches")
    public List<Object> getAllMatches() {
        return hnsApiService.getAllMatches();
    }

    @GetMapping("/api/comet/image/{uuid}")
    public ResponseEntity<byte[]> getCometImageRaw(@PathVariable String uuid) {
        byte[] imageData = hnsApiService.fetchCometImageRaw(uuid);

        if (imageData != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Pretpostavka da su slike JPEG formata
            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/api/current-season-competitions")
    public List<Map<String, Object>> getCurrentSeasonCompetitions() {
        return hnsApiService.getCurrentSeasonCompetitions();
    }

    @GetMapping("/api/match/{matchId}/events")
    public List<Object> getMatchEvents(@PathVariable Long matchId) {
        return hnsApiService.getMatchEvents(matchId);
    }

    @GetMapping("/api/match/{matchId}")
    public Object getMatchInfo(@PathVariable Long matchId) {
        return hnsApiService.fetchMatchInfo(matchId);
    }

    @GetMapping("/api/match/{matchId}/lineups")
    public Object getMatchLineups(@PathVariable Long matchId) {
        return hnsApiService.fetchMatchLineups(matchId);
    }

    @GetMapping("/api/match/{matchId}/referees")
    public Object getMatchReferees(@PathVariable Long matchId) {
        return hnsApiService.fetchMatchReferees(matchId);
    }

    @GetMapping("/api/player-details/{personId}")
    public Object getPlayerDetails(@PathVariable String personId) {
        return hnsApiService.fetchPlayerDetails(personId);
    }

    @GetMapping("/api/player/{personId}/stats/{competitionId}")
    public Object getPlayerStats(
            @PathVariable String personId,
            @PathVariable Integer competitionId) {
        return hnsApiService.fetchPlayerStats(personId, competitionId);
    }

    @GetMapping("/api/competition/{competitionId}/standings")
    public Object getTeamStandings(@PathVariable Integer competitionId) {
        return hnsApiService.fetchTeamStandings(competitionId);
    }

    @GetMapping("/api/competition/{competitionId}/standings/unofficial")
    public Object getTeamStandingsUnofficial(@PathVariable Integer competitionId) {
        return hnsApiService.fetchTeamStandingsUnofficial(competitionId);
    }

    @GetMapping("/api/player/search")
    public Object searchPlayers(@RequestParam String keyword) {
        return hnsApiService.searchPlayers(keyword);
    }

    @GetMapping("/api/competition/senior")
    public Object getSeniorCompetition() {
        return hnsApiService.getSeniorCompetition();
    }

    @GetMapping("/api/senior-competition/next-match")
    public ResponseEntity<Object> getNextMatchForSeniorCompetition() {
        Object nextMatch = hnsApiService.fetchNextMatchForSeniorCompetition();
        if (nextMatch == null) {
            return ResponseEntity.ok(new HashMap<>());
        }
        return ResponseEntity.ok(nextMatch);
    }

    @GetMapping("/api/senior-competition/previous-match")
    public ResponseEntity<Object> getPreviousMatchForSeniorCompetition() {
        Object previousMatch = hnsApiService.fetchPreviousMatchForSeniorCompetition();
        if (previousMatch == null) {
            return ResponseEntity.ok(new HashMap<>());
        }
        return ResponseEntity.ok(previousMatch);
    }

    @GetMapping("/api/matches/upcoming")
    public List<Object> getUpcomingAndTodayMatches() {
        return hnsApiService.getCombinedUpcomingAndTodayMatches();
    }

    @GetMapping("/api/competition/{competitionId}/stats/goals")
    public Object getCompetitionGoalsStats(@PathVariable Integer competitionId) {
        return hnsApiService.fetchCompetitionGoalsStats(competitionId);
    }

    @GetMapping("/api/competition/{competitionId}/stats/redCards")
    public Object getCompetitionRedCardsStats(@PathVariable Integer competitionId) {
        return hnsApiService.fetchCompetitionRedCardsStats(competitionId);
    }

    @GetMapping("/api/competition/{competitionId}/stats/yellowCards")
    public Object getCompetitionYellowCardsStats(@PathVariable Integer competitionId) {
        return hnsApiService.fetchCompetitionYellowCardsStats(competitionId);
    }

    @GetMapping("/api/competition/{competitionId}/info")
    public Object getCompetitionInfo(@PathVariable Integer competitionId) {
        return hnsApiService.fetchCompetitionInfo(competitionId);
    }

}