SHELL := /usr/bin/env bash

.PHONY: install dev lint typecheck test build start verify ci

install:
	corepack enable && yarn install

dev:
	yarn dev

lint:
	yarn lint

typecheck:
	yarn typecheck

test:
	yarn test

build:
	yarn build

start:
	yarn start

verify:
	yarn verify

ci:
	yarn lint && yarn typecheck && yarn test && yarn build
