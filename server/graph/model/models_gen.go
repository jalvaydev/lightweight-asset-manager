// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"time"
)

type Asset struct {
	ID             string    `json:"id"`
	Name           string    `json:"name"`
	Note           string    `json:"note"`
	Serial         string    `json:"serial"`
	Model          string    `json:"model"`
	Status         string    `json:"status"`
	DateOfPurchase time.Time `json:"dateOfPurchase"`
	Cost           int       `json:"cost"`
}

type Model struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	Manufacturer string `json:"manufacturer"`
	Modelno      string `json:"modelno"`
}

type NewAsset struct {
	Name           string    `json:"name"`
	Note           string    `json:"note"`
	Serial         string    `json:"serial"`
	Model          string    `json:"model"`
	Status         string    `json:"status"`
	DateOfPurchase time.Time `json:"dateOfPurchase"`
	Cost           int       `json:"cost"`
}

type NewModel struct {
	Name         string `json:"name"`
	Manufacturer string `json:"manufacturer"`
	Modelno      string `json:"modelno"`
}

type User struct {
	ID          string  `json:"id"`
	FirstName   string  `json:"firstName"`
	LastName    string  `json:"lastName"`
	MobilePhone *string `json:"mobilePhone"`
	SecondEmail *string `json:"secondEmail"`
	Title       *string `json:"title"`
	Login       *string `json:"login"`
	Email       string  `json:"email"`
	UserType    *string `json:"userType"`
}
