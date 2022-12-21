package server 

import (
	"log"
	"net/http"
)

func Serve() {
	http.Handle("/", http.FileServer(http.Dir("./dist")))
	log.Fatal(http.ListenAndServe(":8080", nil))
}
