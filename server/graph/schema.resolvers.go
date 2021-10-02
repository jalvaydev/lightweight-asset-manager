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
	"math/rand"
	"os"

	"github.com/okta/okta-sdk-golang/okta"
	"github.com/okta/okta-sdk-golang/okta/query"
)

func (r *mutationResolver) CreateAsset(ctx context.Context, input model.NewAsset) (*model.Asset, error) {
	asset := &model.Asset{
		Name:           input.Name,
		Note:           input.Note,
		Cost:           input.Cost,
		Serial:         input.Serial,
		ModelID:        input.ModelID,
		Status:         input.Status,
		DateOfPurchase: input.DateOfPurchase,
	}
	r.DB.CreateAsset(asset)
	return asset, nil
}

func (r *mutationResolver) CreateModel(ctx context.Context, input model.NewModel) (*model.Model, error) {
	model := &model.Model{
		ID:           fmt.Sprintf("M%d", rand.Int()),
		Name:         input.Name,
		Manufacturer: input.Manufacturer,
		Modelno:      input.Modelno,
	}
	r.DB.CreateModel(model)
	return model, nil
}

func (r *queryResolver) Assets(ctx context.Context) ([]*model.Asset, error) {
	assets := r.DB.Assets()
	return assets, nil
}

func (r *queryResolver) CountAssets(ctx context.Context, input *string) (*model.AssetCount, error) {
	count := r.DB.CountAssets(*input)
	return count, nil
}

func (r *queryResolver) Feed(ctx context.Context, skip int, limit int, sortBy *string, order *int) ([]*model.Asset, error) {
	feed := r.DB.GetFeed(skip, limit, *sortBy, *order)
	return feed, nil
}

func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	token := os.Getenv("TOKEN")
	client, _ := okta.NewClient(context.TODO(), okta.WithOrgUrl("https://dev-41703573.okta.com"), okta.WithToken(fmt.Sprintf("%v", token)))
	user, _, _ := client.User.GetUser(id)

	var result *model.User
	empData, _ := json.Marshal(user.Profile)
	json.Unmarshal(empData, &result)

	return result, nil
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	token := os.Getenv("TOKEN")
	client, err := okta.NewClient(context.TODO(), okta.WithOrgUrl("https://dev-41703573.okta.com"), okta.WithToken(fmt.Sprintf("%v", token)))
	if err != nil {
		log.Fatal("Oops!")
	}
	users, _, _ := client.User.ListUsers(&query.Params{Limit: 25})

	var result []*model.User
	for _, user := range users {
		var thisUser *model.User
		empData, _ := json.Marshal(user.Profile)
		json.Unmarshal(empData, &thisUser)
		result = append(result, thisUser)
	}

	return result, nil
}

func (r *queryResolver) Model(ctx context.Context, id int) (*model.Model, error) {
	model := r.DB.Model(id)
	return model, nil
}

func (r *queryResolver) Models(ctx context.Context) ([]*model.Model, error) {
	models := r.DB.Models()
	return models, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
