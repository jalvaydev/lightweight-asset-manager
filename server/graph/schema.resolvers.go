package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"lwam-backend/graph/generated"
	"lwam-backend/graph/model"
	"lwam-backend/mongodb"
	"math/rand"
	"net/http"
	"os"

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

func (r *mutationResolver) UpdateAsset(ctx context.Context, input model.UpdateAssetInput) (bool, error) {
	result := mongo.UpdateAsset(&input)
	return result, nil
}

func (r *mutationResolver) DeleteAsset(ctx context.Context, input string) (bool, error) {
	result := mongo.DeleteAsset(input)
	return result, nil
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (bool, error) {
	token := os.Getenv("TOKEN")
	client, _ := okta.NewClient(context.TODO(), okta.WithOrgUrl("https://dev-41703573.okta.com"), okta.WithToken(fmt.Sprintf("%v", token)))

	p := &okta.PasswordCredential{
		Value: input.Password,
	}

	uc := &okta.UserCredentials{
		Password: p,
	}

	profile := okta.UserProfile{}
	profile["firstName"] = input.FirstName
	profile["lastName"] = input.LastName
	profile["mobilePhone"] = input.MobilePhone
	profile["email"] = input.Email
	profile["login"] = input.Login
	profile["title"] = input.Title
	profile["department"] = input.Department

	u := &okta.User{
		Credentials: uc,
		Profile:     &profile,
	}

	_, _, err := client.User.CreateUser(*u, nil)

	if err != nil {
		return false, nil
	}

	return true, nil
}

func (r *mutationResolver) UpdateUser(ctx context.Context, input model.UpdateUserInput) (*model.User, error) {
	client := &http.Client{}

	token := os.Getenv("TOKEN")

	var jsonStr = []byte(fmt.Sprintf(`
		{
   			"profile":{
      			"%v":"%v"
   			}
		}`, input.Field, input.Value))

	req, _ := http.NewRequest("POST", fmt.Sprintf("https://dev-41703573.okta.com/api/v1/users/%v", input.ID), bytes.NewBuffer(jsonStr))
	req.Header.Add("Authorization", fmt.Sprintf("SSWS %v", token))
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Accept", "application/json")

	resp, _ := client.Do(req)
	body, _ := ioutil.ReadAll(resp.Body)

	var data *okta.User
	json.Unmarshal([]byte(body), &data)

	var result *model.User
	empData, _ := json.Marshal(data.Profile)
	json.Unmarshal(empData, &result)

	return result, nil
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

func (r *queryResolver) Asset(ctx context.Context, input string) (*model.Asset, error) {
	asset := mongo.Asset(input)
	return asset, nil
}

func (r *queryResolver) Assets(ctx context.Context) ([]*model.Asset, error) {
	assets := mongo.Assets()
	return assets, nil
}

func (r *queryResolver) CountAssets(ctx context.Context, input *string) (*model.AssetCount, error) {
	count := mongo.CountAssets(*input)

	return count, nil
}

func (r *queryResolver) AssetByName(ctx context.Context, input string) (string, error) {
	asset := mongo.AssetByName(input)
	return asset, nil
}

func (r *queryResolver) Feed(ctx context.Context, skip int, limit int, sortBy *string, order *int) ([]*model.Asset, error) {
	feed := mongo.GetFeed(skip, limit, *sortBy, *order)
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

func (r *queryResolver) Models(ctx context.Context) ([]*model.Model, error) {
	models := mongo.Models()
	return models, nil
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
