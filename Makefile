.PHONY: build run

.SUFFIXES:

OPEN = $(shell which xdg-open || which open)
PORT ?= 9100

BOOT2DOCKER_HOST = $(boot2docker ip)

KUBERNETES_MASTER_HOST ?= 172.17.8.101
KUBERNETES_MASTER_PORT ?= 8080
KUBERNETES_MASTER ?= http://$(KUBERNETES_MASTER_HOST):$(KUBERNETES_MASTER_PORT)

all:
	@echo "make clean   -- cleans build directories"
	@echo "make install -- run container"
	@echo "make build   -- build sextant and docker image"
	@echo "make run     -- build sextant docker image and run it with boot2docker"
	@echo "make release -- build and push sextant docker image"
	@echo "make deploy  -- deploy released sextant version to kubernetes"
	@echo "make open    -- opens sextant in web browser"

clean:
	rm -rf node_modules bower_components typings dist .tmp .sass-cache

install:
	npm install
	bower install

build:
	grunt build
	docker build --rm -t zutherb/sextant .

run: build
	docker run -e KUBERNETES_SERVICE_HOST=$(KUBERNETES_MASTER_HOST) -e KUBERNETES_SERVICE_PORT=$(KUBERNETES_MASTER_PORT) \
			   -p $(PORT):80 -d zutherb/sextant
	$(OPEN) http://$(BOOT2DOCKER_HOST):$(PORT)

serve:
	grunt serve

release: clean install build
	docker push zutherb/sextant

fast-release: build
	docker tag zutherb/sextant 172.17.8.101:5000/zutherb/sextant
	docker push 172.17.8.101:5000/zutherb/sextant

deploy:
	kubectl create -f kubernetes/sextant.json

open:
	$(OPEN) $(KUBERNETES_MASTER)/api/v1beta2/proxy/pods/sextant

