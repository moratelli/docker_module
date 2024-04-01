FROM golang:1.22.1-alpine3.19 as build
WORKDIR /usr/src/app
COPY main.go .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /app main.go

FROM scratch
COPY --from=build /app /app

CMD ["/app"]