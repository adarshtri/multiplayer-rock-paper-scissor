API-SERVICE-CONTAINER=api-service
MONGODB-CONTAINER=mongo

TEST-NETWORK=test-network

.PHONY : help
help :
	@echo "docker.db.mongodb			: Start mongodb server."
	@echo "docker.apis.build            : Build api service with docker."
	@echo "docker.apis.run				: Run api service with docker."

docker.db.mongodb:
	docker-compose up mongodb

docker.apis.build:
	cd backend-service/ && docker build -t atrivedi/multiplayer-apis .

docker.apis.run:
	docker-compose up apis

docker.ui.build:
	cd ui/ && docker build -t atrived/multiplayer-ui .

docker.ui.run:
	docker-compose up ui
