package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"lwam-backend/graph/generated"
	"lwam-backend/graph/model"
	"math/rand"
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
