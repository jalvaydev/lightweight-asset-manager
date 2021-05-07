package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"math/rand"

	"lwam-backend/graph/generated"
	"lwam-backend/graph/model"
	"lwam-backend/mongodb"
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
	return mongo.Assets(), nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
