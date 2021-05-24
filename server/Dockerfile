FROM golang

# Set the Current Working Directory inside the container
WORKDIR /app/lwam-go

# We want to populate the module cache based on the go.{mod,sum} files.
COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

CMD ["go",  "run" , "server.go"]
