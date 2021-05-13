package okta

import (
	"encoding/json"
	"io/ioutil"
	"lwam-backend/graph/model"
	"net/http"
)

func GetUsers() []*model.User {
	client := &http.Client{}

	r, _ := http.NewRequest("GET", "https://dev-41703573.okta.com/api/v1/users?limit=200", nil)
	r.Header.Add("Authorization", "SSWS 00kE39CEmpSzm0QywxHMy99xHu2T2ND4lGY0wEMKqD")
	r.Header.Add("Content-Type", "application/json")
	r.Header.Add("Accept", "application/json")
	

	resp, _ := client.Do(r)
	
	body, _ := ioutil.ReadAll(resp.Body)

	var data []*model.User
	json.Unmarshal([]byte(body), &data)
	
	return data
}