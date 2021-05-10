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
	CreateModel(model *model.Model)
	Assets() ([]*model.Asset)
	Asset(id string) (*model.Asset)
	Models() ([]*model.Model)
	Model(id string) (*model.Model)
}

type Database struct {
	client *mongo.Client
}

func New() *Database {
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

	return &Database{
		client: dbClient,
	}
}

func (db *Database) CreateModel(model *model.Model){
	collection := db.client.Database("graphql").Collection("models")
	_, err := collection.InsertOne(context.TODO(), model)
	if err != nil {
		log.Fatal(err)
	}
}

func (db *Database) CreateAsset(asset *model.Asset){
	collection := db.client.Database("graphql").Collection("assets")
	_, err := collection.InsertOne(context.TODO(), asset)
	if err != nil {
		log.Fatal(err)
	}
}

func (db *Database) Assets() ([]*model.Asset) {
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

func (db *Database) Models() ([]*model.Model) {
	collection := db.client.Database("graphql").Collection("models")

	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.TODO())
	var result []*model.Model
	for cursor.Next(context.TODO()) {
		var t *model.Model
		err := cursor.Decode(&t)
		if err != nil {
			log.Fatal(err)
		}
		result = append(result, t)
	}
	return result
}

func (db *Database) Model(id string) (*model.Model) {
	var result *model.Model
		collection := db.client.Database("graphql").Collection("models")
	err := collection.FindOne(context.TODO(), bson.D{{Key: "id", Value: id}}).Decode(&result)
	if err == mongo.ErrNoDocuments {
		fmt.Println("record does not exist")
	} else if err != nil {
		log.Fatal(err)
	}
	return result
}

func (db *Database) Asset(id string) (*model.Asset) {
	var result *model.Asset
		collection := db.client.Database("graphql").Collection("assets")
	err := collection.FindOne(context.TODO(), bson.D{{Key: "id", Value: id}}).Decode(&result)
	if err == mongo.ErrNoDocuments {
		fmt.Println("record does not exist")
	} else if err != nil {
		log.Fatal(err)
	}
	return result
}
