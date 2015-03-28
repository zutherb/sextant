.PHONY: build run

.SUFFIXES:

OPEN = $(shell which xdg-open || which open)
PORT ?= 9100
KUBERNETES_MASTER ?= http://172.17.8.101:8080

all:
	@echo "make clean   -- cleans build directories"
	@echo "make install -- run container"
	@echo "make build   -- build sextant and docker image"
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

serve:
	grunt serve

release: clean install build
	docker push zutherb/sextant

deploy:
	kubectl create -f kubernetes/sextant.json

open:
	$(OPEN) $(KUBERNETES_MASTER)/api/v1beta2/proxy/pods/sextant

