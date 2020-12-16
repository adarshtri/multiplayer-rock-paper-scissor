API-SERVICE-CONTAINER=atrivedi/multiplayer-apis
UI-SERVICE-CONTAINER=atrived/multiplayer-ui
MONGODB-CONTAINER=mongo

TEST-NETWORK=test-network

.PHONY : help
help :
	@echo "docker.db.mongodb			: Start mongodb server."
	@echo "docker.apis.build           : Build api service with docker."
	@echo "docker.apis.run				: Run api service with docker."
	@echo "docker.ui.build				: Build ui service with docker."
	@echo "docker.ui.run				: Run ui service with docker."
	@echo "docker.run.all 				: Run all services with docker."
	@echo "docker.restart.all 			: Restart all the services with docker."
	@echo "docker.stop.all 			: Stop all the services running on docker."

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

docker.run.all:
	docker-compose up -d

docker.restart.all:
	docker-compose down
	docker build -t atrivedi/multiplayer-apis backend-service/
	docker build -t atrived/multiplayer-ui ui/
	docker-compose up -d

docker.stop.all:
	docker-compose down

docker.restart.ui:
	docker build -t atrived/multiplayer-ui ui/
	docker-compose stop -t 1 ui
	docker-compose up -d ui
