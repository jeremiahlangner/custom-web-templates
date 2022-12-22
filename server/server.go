package server

import (
	"log"
	"net/http"
)

func Serve() {
	http.Handle("/", http.FileServer(http.Dir("./dist")))
	// TODO: add certs and ListenAndServeTLS
	// log.Fatal(http.ListenAndServeTLS(":8080", "cert.crt", "pkey.key", nil);
	log.Fatal(http.ListenAndServe(":8080", nil))
}
