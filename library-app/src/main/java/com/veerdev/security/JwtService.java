package com.veerdev.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "myLibraryManagementSystemSecretKey123456789";

    private final Key key =
            Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes(StandardCharsets.UTF_8)
            );


    public String generateToken(String email) {

        return Jwts.builder()

                .subject(email)

                .issuedAt(new Date())

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60
                        )
                )

                .signWith(
                        key,
                        SignatureAlgorithm.HS256
                )

                .compact();
    }


    public String extractEmail(String token) {

        return Jwts.parser()

                .verifyWith((SecretKey) key)

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .getSubject();

    }


    public boolean isTokenValid(String token) {

        try {

            Jwts.parser()

                    .verifyWith((SecretKey) key)

                    .build()

                    .parseSignedClaims(token);

            return true;

        } catch (Exception e) {

            return false;

        }

    }

}