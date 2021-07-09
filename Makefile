ecr-login: 
	aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 163482350712.dkr.ecr.eu-west-1.amazonaws.com

prod-build:
	docker-compose build
	
push: ecr-login prod-build
	docker-compose push

pull: ecr-login
	docker-compose -f docker-compose-pull.yml pull 
	
deploy: pull
	docker-compose -f docker-compose-pull.yml down && docker-compose -f docker-compose-pull.yml up -d
