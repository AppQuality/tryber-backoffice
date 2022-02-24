ecr-login: 
	aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 163482350712.dkr.ecr.eu-west-1.amazonaws.com

prod-build:
	docker-compose build
	
devel-build:
	docker-compose -f docker-compose-devel.yml build

devel-push: ecr-login devel-build
	docker-compose -f docker-compose-devel.yml push
	
push: ecr-login prod-build
	docker-compose push

devel-pull: ecr-login
	docker-compose -f docker-compose-pull-devel.yml pull 
	
pull: ecr-login
	docker-compose pull 

devel-deploy: devel-pull
	docker-compose -f docker-compose-pull-devel.yml down && docker-compose -f docker-compose-pull-devel.yml up -d
	
deploy: pull
	docker-compose down && docker-compose up -d
