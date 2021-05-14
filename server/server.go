package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"lwam-backend/graph"
	"lwam-backend/graph/generated"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	verifier "github.com/okta/okta-jwt-verifier-golang"
	"github.com/rs/cors"
)

const defaultPort = "8080"
const devStatus = "PROD"

func main() {
	router := chi.NewRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	dev := os.Getenv("PROD")
	if dev == "" {
		dev = devStatus
	}

	if dev == "PROD" {
		router.Use(authMiddleware)
	}

	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
		Debug:            false,
	}).Handler)

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Headers", "Authorization, Content-Type")
		w.Header().Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

		if r.Method == "OPTIONS" {
			return
		}

		if !isAuthenticated(r) {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("401 - You are not authorized for this request"))
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")

		next.ServeHTTP(w, r)
	})
}

func isAuthenticated(r *http.Request) bool {
	authHeader := r.Header.Get("Authorization")

	fmt.Printf("Auth Header: %v\n", authHeader)

	if authHeader == "" {
		return false
	}

	tokenParts := strings.Split(authHeader, "Bearer ")
	bearerToken := tokenParts[1]

	tv := map[string]string{}
	tv["aud"] = "api://default"
	tv["cid"] = "0oaopy53oHbY480ks5d6"
	jv := verifier.JwtVerifier{
		Issuer:           "https://dev-41703573.okta.com/oauth2/default",
		ClaimsToValidate: tv,
	}

	_, err := jv.New().VerifyAccessToken(bearerToken)

	return err == nil
}
