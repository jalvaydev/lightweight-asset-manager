package graph

import "github.com/jalvaydev/lightweight-asset-manager/graph/model"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
	assets []*model.Asset
	todos []*model.Todo
}
