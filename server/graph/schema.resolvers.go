package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"lwam-backend/graph/generated"
	"lwam-backend/graph/model"
	"lwam-backend/mongodb"
	"math/rand"
)

var mongo mongodb.MongoResolvers = mongodb.New()


func (r *mutationResolver) CreateAsset(ctx context.Context, input model.NewAsset) (*model.Asset, error) {
		asset := &model.Asset{
		ID:   fmt.Sprintf("T%d", rand.Int()),
		Name: input.Name,
		Description: input.Description,
		Cost: input.Cost,
	}
	mongo.CreateAsset(asset)
	return asset, nil
}

func (r *queryResolver) Assets(ctx context.Context) ([]*model.Asset, error) {
	assets := mongo.Assets()
	return assets, nil
}

func (r *queryResolver) Asset(ctx context.Context, input string) (*model.Asset, error) {
	asset := mongo.Asset(input)
	return asset,nil 
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
