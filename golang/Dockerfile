FROM golang:1.22.1-alpine3.19

WORKDIR /usr/src/

RUN go mod init pmtelli/hello-world && \
    touch hello-world.go

RUN cat > hello-world.go <<EOF
package main
import "fmt"
func main() {
    fmt.Println("Full Cycle Rocks!!")
}
EOF

RUN go build -o /hello-world

CMD ["/hello-world"]