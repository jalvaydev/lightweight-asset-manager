package graph

import (
	"lwam-backend/mongodb"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
	DB *mongodb.Database
}
