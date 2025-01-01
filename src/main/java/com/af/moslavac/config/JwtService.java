package com.af.moslavac.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Siguran ključ
    private static final long EXPIRATION_TIME = 3600000; // 1 sat u milisekundama

    // Generiraj JWT token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

    public String validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token);
            return "VALID"; // Indicate the token is valid
        } catch (ExpiredJwtException e) {
            System.out.println("Token is expired");
            return "EXPIRED";
        } catch (MalformedJwtException e) {
            System.out.println("Token is malformed");
            return "MALFORMED";
        } catch (SignatureException e) {
            System.out.println("Invalid token signature");
            return "INVALID_SIGNATURE";
        } catch (Exception e) {
            System.out.println("Invalid token");
            return "INVALID";
        }
    }



    // Dohvati korisničko ime iz JWT-a
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
