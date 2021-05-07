package mongodb

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"lwam-backend/graph/model"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type MongoResolvers interface {
	CreateAsset(asset *model.Asset)
	Assets() []*model.Asset
}

type database struct {
	client *mongo.Client
}

func New() *database {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	uri := os.Getenv("MONGODB")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	dbClient, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	// Ping the primary
	if err := dbClient.Ping(ctx, readpref.Primary()); err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected to the MongoDB server!")

	return &database{
		client: dbClient,
	}
}

func (db *database) CreateAsset(asset *model.Asset) {
	collection := db.client.Database("graphql").Collection("assets")
	_, err := collection.InsertOne(context.TODO(), asset)
	if err != nil {
		log.Fatal(err)
	}
}

func (db *database) Assets() []*model.Asset {
	collection := db.client.Database("graphql").Collection("assets")

	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.TODO())
	var result []*model.Asset
	for cursor.Next(context.TODO()) {
		var t *model.Asset
		err := cursor.Decode(&t)
		if err != nil {
			log.Fatal(err)
		}
		result = append(result, t)
	}
	return result
}
