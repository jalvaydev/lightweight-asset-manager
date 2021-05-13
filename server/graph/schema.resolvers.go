package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"lwam-backend/graph/generated"
	"lwam-backend/graph/model"
	"lwam-backend/mongodb"
	"math/rand"
	"strconv"

	"github.com/okta/okta-sdk-golang/okta"
	"github.com/okta/okta-sdk-golang/okta/query"
)

func (r *mutationResolver) CreateAsset(ctx context.Context, input model.NewAsset) (*model.Asset, error) {
	asset := &model.Asset{
		ID:             fmt.Sprintf("A%d", rand.Int()),
		Name:           input.Name,
		Note:           input.Note,
		Cost:           input.Cost,
		Serial:         input.Serial,
		Model:          input.Model,
		Status:         input.Status,
		DateOfPurchase: input.DateOfPurchase,
	}
	mongo.CreateAsset(asset)
	return asset, nil
}

func (r *mutationResolver) CreateModel(ctx context.Context, input model.NewModel) (*model.Model, error) {
	model := &model.Model{
		ID:           fmt.Sprintf("M%d", rand.Int()),
		Name:         input.Name,
		Manufacturer: input.Manufacturer,
		Modelno:      input.Modelno,
	}
	mongo.CreateModel(model)
	return model, nil
}

func (r *mutationResolver) DeleteAsset(ctx context.Context, input string) (bool, error) {
	result := mongo.DeleteAsset(input)
	return result, nil
}

func (r *queryResolver) Assets(ctx context.Context) ([]*model.Asset, error) {
	assets := mongo.Assets()
	return assets, nil
}

func (r *queryResolver) CountAssets(ctx context.Context) (string, error) {
	count := mongo.CountAssets()
	result := strconv.FormatInt(count, 10)

	return result, nil
}

func (r *queryResolver) Asset(ctx context.Context, input string) (*model.Asset, error) {
	asset := mongo.Asset(input)
	return asset, nil
}

func (r *queryResolver) Models(ctx context.Context) ([]*model.Model, error) {
	models := mongo.Models()
	return models, nil
}

func (r *queryResolver) Feed(ctx context.Context, skip int, limit int) ([]*model.Asset, error) {
	feed := mongo.GetFeed(skip, limit)
	return feed, nil
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	client, err := okta.NewClient(context.TODO(), okta.WithOrgUrl("https://dev-41703573.okta.com"), okta.WithToken("00kE39CEmpSzm0QywxHMy99xHu2T2ND4lGY0wEMKqD"))
	if err != nil {
		log.Fatal("Oops!")
	}
	users, _, _ := client.User.ListUsers(&query.Params{Limit: 25})

	var result []*model.User
	for _, user := range users {
		var thisUser *model.User
		empData, _ := json.Marshal(user.Profile)
		json.Unmarshal(empData, &thisUser)
		fmt.Printf("\nProfile Data: %v\n\n", thisUser)
		result = append(result, thisUser)
		fmt.Printf("\n\nResult: %v\n\n", result)
	}

	return result, nil
}

func (r *queryResolver) User(ctx context.Context) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
var mongo mongodb.MongoResolvers = mongodb.New()
