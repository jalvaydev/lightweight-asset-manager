package mssql

import (
	"database/sql"
	"fmt"
	"net/url"
	"os"
	"strconv"

	"lwam-backend/graph/model"

	_ "github.com/denisenkom/go-mssqldb"
)

type MongoResolvers interface {
	CreateAsset(asset *model.Asset)
	CreateModel(model *model.Model)
	Assets() []*model.Asset
	Asset(id string) *model.Asset
	AssetByName(name string) string
	Models() []*model.Model
	Model(id string) *model.Model
	ModelByName(name string) *model.Model
	CountAssets(input string) *model.AssetCount
	GetFeed(skip int, limit int, sortBy string, order int) []*model.Asset
	DeleteAsset(id string) bool
	UpdateAsset(asset *model.UpdateAssetInput) bool
}

type Database struct {
	client *sql.DB
}

func New() *Database {
	query := url.Values{}
	query.Add("app name", "LWAM")
	query.Add("database", "AssetManager")

	port, err := strconv.Atoi(os.Getenv("DB_PORT"))
	if err != nil {
		panic("invalid port")
	}

	u := &url.URL{
		Scheme: "sqlserver",
		User:   url.UserPassword(os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD")),
		Host:   fmt.Sprintf("%s:%d", os.Getenv("DB_HOST"), port),
		// Path:  instance, // if connecting to an instance instead of a port
		RawQuery: query.Encode(),
	}

	fmt.Println(u.String())
	db, err := sql.Open("sqlserver", u.String())
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected to Microsoft SQL Server!")

	return &Database{
		client: db,
	}
}

func (db *Database) CountAssets(input string) *model.AssetCount {
	assets := db.Assets()

	count := len(assets)

	totalAssets := count

	if input == "" {
		return &model.AssetCount{TotalAssets: totalAssets}
	}

	type counting struct {
		inUse   int
		inStore int
		broken  int
		service int
	}

	var counter counting

	for _, asset := range assets {
		switch asset.Status {
		case "In Use":
			counter.inUse += 1
		case "In Store":
			counter.inUse += 1
		case "Broken":
			counter.broken += 1
		case "Service":
			counter.service += 1
		}
	}

	assetCount := model.AssetCount{TotalAssets: totalAssets, InUse: &counter.inUse, InStore: &counter.inStore, Service: &counter.service, Broken: &counter.broken}

	return &assetCount
}

// func (db *Database) AssetByName(name string) string {
// 	collection := db.client.Database("graphql").Collection("assets")
// 	var asset *model.Asset
// 	collection.FindOne(context.TODO(), bson.D{{Key: "name", Value: name}}).Decode(&asset)

// 	return asset.ID
// }

func (db *Database) CreateModel(model *model.Model) {
	preparedStatement, err := db.client.Prepare(`
	INSERT INTO [dbo].[Model]
	(
	 [Name], [Manufacturer], [ModelNo]
	)
	VALUES
	( 
	 @p1, @p2, @p3
	)
	`)

	if err != nil {
		fmt.Println("Error occured: ", err)
		return
	}

	_, err = preparedStatement.Exec(
		model.Name,
		model.Manufacturer,
		model.Modelno,
	)
	if err != nil {
		fmt.Println("Error occured: ", err)
		return
	}
}

func (db *Database) CreateAsset(asset *model.Asset) {
	preparedStatement, err := db.client.Prepare(`
	INSERT INTO [dbo].[Asset]
	(
	 [Name], [Note], [ModelId], [Serial], [Status], [PurchasedOn], [Cost]
	)
	VALUES
	( 
	 @p1, @p2, @p3, @p4, @p5, @p6, @p7
	)
	`)

	if err != nil {
		fmt.Println("Error occured: ", err)
		return
	}

	_, err = preparedStatement.Exec(
		asset.Name,
		asset.Note,
		asset.ModelID,
		asset.Serial,
		asset.Status,
		asset.DateOfPurchase,
		asset.Cost,
	)
	if err != nil {
		fmt.Println("Error occured: ", err)
		return
	}
}

// func (db *Database) UpdateAsset(asset *model.UpdateAssetInput) bool {
// 	collection := db.client.Database("graphql").Collection("assets")

// 	_, err := collection.UpdateOne(
// 		context.TODO(),
// 		bson.M{"id": asset.ID},
// 		bson.D{{"$set", bson.D{{fmt.Sprintf(`%v`, asset.Field), fmt.Sprintf(`%v`, asset.Value)}}}},
// 	)
// 	if err != nil {
// 		log.Fatal(err)
// 		return false
// 	}
// 	return true
// }

func (db *Database) Assets() []*model.Asset {
	rows, err := db.client.Query("SELECT * FROM [dbo].[Asset] ")
	if err != nil {
		return nil
	}

	defer rows.Close()

	var assets []*model.Asset
	for rows.Next() {
		var asset model.Asset
		err = rows.Scan(
			&asset.ID,
			&asset.Name,
			&asset.Note,
			&asset.ModelID,
			&asset.Serial,
			&asset.Status,
			&asset.DateOfPurchase,
			&asset.Cost,
		)
		if err != nil {
			fmt.Println("Error scanning row: ", err)
			return nil
		}
		assets = append(assets, &asset)
	}

	return assets
}

func (db *Database) Models() []*model.Model {
	rows, err := db.client.Query("SELECT * FROM [dbo].[Model]")
	if err != nil {
		return nil
	}

	defer rows.Close()

	var models []*model.Model
	for rows.Next() {
		var model model.Model
		err = rows.Scan(
			&model.ID,
			&model.Name,
			&model.Manufacturer,
			&model.Modelno,
		)
		if err != nil {
			fmt.Println("Error scanning row: ", err)
			return nil
		}
		models = append(models, &model)
	}

	return models
}

func (db *Database) Model(id int) *model.Model {
	row, err := db.client.Query("SELECT * FROM Model WHERE Id=@p1", id)
	if err != nil {
		panic(err)
	}

	defer row.Close()

	var model model.Model

	row.Next()

	err = row.Scan(
		&model.ID,
		&model.Name,
		&model.Manufacturer,
		&model.Modelno,
	)
	if err != nil {
		panic(err)
	}

	return &model
}

// func (db *Database) ModelByName(name string) *model.Model {
// 	var result *model.Model
// 	collection := db.client.Database("graphql").Collection("models")
// 	err := collection.FindOne(context.TODO(), bson.D{{Key: "name", Value: name}}).Decode(&result)
// 	if err == mongo.ErrNoDocuments {
// 		fmt.Println("record does not exist")
// 	} else if err != nil {
// 		log.Fatal(err)
// 	}
// 	return result
// }

// func (db *Database) Asset(id string) *model.Asset {
// 	var result *model.Asset
// 	collection := db.client.Database("graphql").Collection("assets")
// 	err := collection.FindOne(context.TODO(), bson.D{{Key: "id", Value: id}}).Decode(&result)
// 	if err == mongo.ErrNoDocuments {
// 		fmt.Println("record does not exist")
// 	} else if err != nil {
// 		log.Fatal(err)
// 	}
// 	return result
// }

func (db *Database) GetFeed(skip int, limit int, sortBy string, order int) []*model.Asset {

	query := "SELECT * FROM Asset"
	if sortBy == "" {
		query += " ORDER BY Name"
	}
	if sortBy != "" {
		query += " ORDER BY " + sortBy
	}
	if order != 0 {
		if order == 1 {
			query += " ASC"
		}
		if order == -1 {
			query += " DESC"
		}
	}
	query += " OFFSET (@p1)*@p2 ROWS FETCH NEXT @p2 ROWS ONLY"

	fmt.Println(query)

	rows, err := db.client.Query(query, skip, limit)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	var assets []*model.Asset
	for rows.Next() {
		var asset model.Asset
		err = rows.Scan(
			&asset.ID,
			&asset.Name,
			&asset.Note,
			&asset.ModelID,
			&asset.Serial,
			&asset.Status,
			&asset.DateOfPurchase,
			&asset.Cost,
		)
		if err != nil {
			fmt.Println("Error scanning row: ", err)
			return nil
		}
		asset.Model = db.Model(asset.ModelID)
		assets = append(assets, &asset)
	}

	return assets
}

// func (db *Database) DeleteAsset(id string) bool {
// 	collection := db.client.Database("graphql").Collection("assets")

// 	result, err := collection.DeleteOne(context.TODO(), bson.D{{Key: "id", Value: id}})
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	return result.DeletedCount == 1
// }
