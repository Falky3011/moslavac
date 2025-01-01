package com.af.moslavac.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class HnsApiService {

    private final RestTemplate restTemplate;

    @Value("${spring.api.hns.key}")
    private String apiKey;

    @Value("${spring.api.hns.base-url}")
    private String baseUrl;

    public HnsApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private HttpEntity<Void> createHttpEntity() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.set("API_KEY", apiKey);
        headers.set("Accept-Language", "hr"); // Postavite hrvatski kao podrazumevani jezik
        return new HttpEntity<>(headers);
    }


    private <T> T fetchFromApi(String endpoint, Class<T> responseType) {
        try {
            String url = baseUrl + endpoint;
            ResponseEntity<T> response = restTemplate.exchange(url, HttpMethod.GET, createHttpEntity(), responseType);
            return response.getBody();
        } catch (Exception e) {
            System.err.println("Error fetching data from endpoint " + endpoint + ": " + e.getMessage());
            return null;
        }
    }

    public List<Object> fetchPastCompetitionMatches(Integer competitionId) {
        String endpoint = String.format("/api/live/competition/%d/matches/paginated/past/2/1337?page=1&pageSize=75&teamIdFilter=1337", competitionId);
        Map<String, Object> response = fetchFromApi(endpoint, Map.class);
        return response != null ? (List<Object>) response.get("result") : new ArrayList<>();
    }

    public List<Object> fetchFutureCompetitionMatches(Integer competitionId) {
        String endpoint = String.format("/api/live/competition/%d/matches/paginated/future/2?page=1&pageSize=75&teamIdFilter=1337", competitionId);
        Map<String, Object> response = fetchFromApi(endpoint, Map.class);
        return response != null ? (List<Object>) response.get("result") : new ArrayList<>();
    }

    public List<Object> getAllCompetitionMatches(Integer competitionId) {
        List<Object> combinedMatches = new ArrayList<>();
        combinedMatches.addAll(fetchPastCompetitionMatches(competitionId));
        combinedMatches.addAll(fetchFutureCompetitionMatches(competitionId));
        return combinedMatches;
    }

    public List<Object> fetchPastMatches() {
        String endpoint = "/api/live/team/1337/matches/paginated/past/2?page=1&pageSize=75&teamIdFilter=1337";
        Map<String, Object> response = fetchFromApi(endpoint, Map.class);
        return response != null ? (List<Object>) response.get("result") : new ArrayList<>();
    }

    public List<Object> fetchFutureMatches() {
        String endpoint = "/api/live/team/1337/matches/paginated/future/2?page=1&pageSize=75&teamIdFilter=1337";
        Map<String, Object> response = fetchFromApi(endpoint, Map.class);
        return response != null ? (List<Object>) response.get("result") : new ArrayList<>();
    }

    public List<Object> getAllMatches() {
        List<Object> combinedMatches = new ArrayList<>();
        combinedMatches.addAll(fetchPastMatches());
        combinedMatches.addAll(fetchFutureMatches());
        return combinedMatches;
    }

    public Map<String, Object> fetchCometImage(String uuid) {
        String endpoint = String.format("/api/live/images/%s?teamIdFilter=1337", uuid);
        return fetchFromApi(endpoint, Map.class);
    }

    public List<Map<String, Object>> getCurrentSeasonCompetitions() {
        String endpoint = "/api/live/competition/list/active/1337?teamIdFilter=1337";
        return fetchFromApi(endpoint, List.class);
    }

    public List<Object> getMatchEvents(Long matchId) {
        String endpoint = String.format("/api/live/match/%d/events?teamIdFilter=1337&showComments=true", matchId);
        return fetchFromApi(endpoint, List.class);
    }

    public Object fetchMatchInfo(Long matchId) {
        String endpoint = String.format("/api/live/match/%d?teamIdFilter=1337", matchId);
        return fetchFromApi(endpoint, Object.class);
    }

    public Object fetchMatchLineups(Long matchId) {
        String endpoint = String.format("/api/live/match/%d/lineups?teamIdFilter=1337", matchId);
        return fetchFromApi(endpoint, Object.class);
    }

    public Object fetchMatchReferees(Long matchId) {
        String endpoint = String.format("/api/live/match/%d/info?teamIdFilter=1337", matchId);
        return fetchFromApi(endpoint, Object.class);
    }

    public Object fetchPlayerDetails(String personId) {
        if (personId == null || personId.isEmpty()) {
            throw new IllegalArgumentException("Invalid personId");
        }
        String endpoint = String.format("/api/live/player/%s?teamIdFilter=1337", personId);
        return fetchFromApi(endpoint, Object.class);
    }

    public Object fetchPlayerStats(String personId, Integer competitionId) {
        if (personId == null || personId.isEmpty() || competitionId == null) {
            throw new IllegalArgumentException("Invalid personId or competitionId");
        }

        String endpoint = String.format(
                "/api/live/player/%s/stats/1337?teamIdFilter=1337",
                personId
        );

        List<Map<String, Object>> stats = fetchFromApi(endpoint, List.class);
        if (stats == null) return null;


        return stats.stream()
                .filter(stat -> {
                    Map<String, Object> competition = (Map<String, Object>) stat.get("competition");
                    return competition != null && String.valueOf(competition.get("id")).equals(String.valueOf(competitionId));
                })
                .findFirst()
                .orElse(null);
    }

    public Object fetchTeamStandings(Integer competitionId) {
        if (competitionId == null) {
            throw new IllegalArgumentException("Invalid competitionId");
        }

        String endpoint = String.format(
                "/api/live/competition/%d/standings/official?teamIdFilter=1337",
                competitionId
        );

        return fetchFromApi(endpoint, Object.class);
    }

    public Object fetchTeamStandingsUnofficial(Integer competitionId) {
        if (competitionId == null) {
            throw new IllegalArgumentException("Invalid competitionId");
        }

        String endpoint = String.format(
                "/api/live/competition/%d/standings/unofficial?teamIdFilter=1337",
                competitionId
        );

        return fetchFromApi(endpoint, Object.class);
    }

    public Object searchPlayers(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            throw new IllegalArgumentException("Keyword cannot be null or empty");
        }

        String endpoint = String.format(
                "/api/live/player/search?keyword=%s&page=0&pageSize=100&teamIdFilter=1337",
                keyword
        );

        return fetchFromApi(endpoint, Object.class);
    }

    public Object getSeniorCompetition() {
        String endpoint = "/api/live/competition/list/active/1337?teamIdFilter=1337";
        List<Map<String, Object>> competitions = fetchFromApi(endpoint, List.class);

        if (competitions == null) return null;

        return competitions.stream()
                .filter(comp -> ((String) comp.get("name")).contains("4. NL SREDIŠTE PODSKUPINA B"))
                .findFirst()
                .orElse(null);
    }

    public Object fetchNextMatchForSeniorCompetition() {
        Map<String, Object> seniorCompetition = (Map<String, Object>) getSeniorCompetition();

        if (seniorCompetition == null) {
            throw new IllegalArgumentException("Senior competition not found");
        }

        Integer competitionId = (Integer) seniorCompetition.get("id");

        String matchesEndpoint = String.format(
                "/api/live/competition/%d/matches/paginated/future/2/1337?page=1&pageSize=1&teamIdFilter=1337",
                competitionId
        );

        Map<String, Object> matchesResponse = fetchFromApi(matchesEndpoint, Map.class);

        if (matchesResponse == null || matchesResponse.get("result") == null) {
            return new HashMap<>(); // Prazan JSON
        }

        List<Object> matches = (List<Object>) matchesResponse.get("result");
        return matches != null && !matches.isEmpty() ? matches.get(0) : new HashMap<>();
    }

    public Object fetchPreviousMatchForSeniorCompetition() {
        Map<String, Object> seniorCompetition = (Map<String, Object>) getSeniorCompetition();

        if (seniorCompetition == null) {
            throw new IllegalArgumentException("Senior competition not found");
        }

        Integer competitionId = (Integer) seniorCompetition.get("id");

        String matchesEndpoint = String.format(
                "/api/live/competition/%d/matches/paginated/past/2/1337?page=1&pageSize=1&teamIdFilter=1337",
                competitionId
        );

        Map<String, Object> matchesResponse = fetchFromApi(matchesEndpoint, Map.class);

        if (matchesResponse == null || matchesResponse.get("result") == null) {
            return new HashMap<>(); // Prazan JSON
        }

        List<Object> matches = (List<Object>) matchesResponse.get("result");
        return matches != null && !matches.isEmpty() ? matches.get(0) : new HashMap<>();
    }



    public List<Object> fetchUpcomingMatches(Integer seniorCompetitionId) {
        String futureMatchesUrl = "/api/live/team/1337/matches/paginated/future/2?page=1&pageSize=7&teamIdFilter=1337";

        Map<String, Object> response = fetchFromApi(futureMatchesUrl, Map.class);
        if (response == null || response.get("result") == null) {
            return new ArrayList<>();
        }

        List<Object> matches = (List<Object>) response.get("result");

        // Filtriraj utakmice koje ne pripadaju seniorCompetition
        return matches.stream()
                .filter(match -> {
                    Map<String, Object> competition = (Map<String, Object>) ((Map<String, Object>) match).get("competition");
                    return competition != null && !competition.get("id").equals(seniorCompetitionId);
                })
                .toList();
    }


    public List<Object> fetchTodayMatches(Integer seniorCompetitionId) {
        String pastMatchesUrl = "/api/live/team/1337/matches/paginated/past/2?page=1&pageSize=10&teamIdFilter=1337";

        Map<String, Object> response = fetchFromApi(pastMatchesUrl, Map.class);
        if (response == null || response.get("result") == null) {
            return new ArrayList<>();
        }

        List<Object> matches = (List<Object>) response.get("result");

        // Filtriraj utakmice s današnjim datumom i budućim vremenom
        LocalDate today = LocalDate.now();
        LocalDateTime now = LocalDateTime.now();

        return matches.stream()
                .filter(match -> {
                    Long dateTimeUTC = (Long) ((Map<String, Object>) match).get("dateTimeUTC");
                    if (dateTimeUTC == null) return false;

                    LocalDateTime matchDateTime = Instant.ofEpochMilli(dateTimeUTC).atZone(ZoneId.systemDefault()).toLocalDateTime();

                    return matchDateTime.toLocalDate().isEqual(today) && matchDateTime.isAfter(now);
                })
                .toList();
    }

    public List<Object> getCombinedUpcomingAndTodayMatches() {
        Map<String, Object> seniorCompetition = (Map<String, Object>) getSeniorCompetition();
        if (seniorCompetition == null) {
            throw new IllegalArgumentException("Senior competition not found");
        }

        Integer seniorCompetitionId = (Integer) seniorCompetition.get("id");

        List<Object> upcomingMatches = fetchUpcomingMatches(seniorCompetitionId);
        List<Object> todayMatches = fetchTodayMatches(seniorCompetitionId);

        List<Object> combinedMatches = new ArrayList<>();
        combinedMatches.addAll(todayMatches);
        combinedMatches.addAll(upcomingMatches);

        return combinedMatches;
    }

    public byte[] fetchCometImageRaw(String uuid) {
        String endpoint = String.format("/api/live/images/%s?teamIdFilter=1337", uuid);
        Map<String, Object> response = fetchFromApi(endpoint, Map.class);

        if (response != null && response.containsKey("value")) {
            String base64Image = (String) response.get("value");
            return Base64.getDecoder().decode(base64Image);
        }

        return null;
    }


}
