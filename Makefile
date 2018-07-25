SHELL:=/bin/bash

## See also https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html

.PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

distribute: ## Distribute package
	@/bin/bash -c 'export NODE_ENV='production' && rm -f dist/*css && rm -f dist/*js && npx webpack --config webpack.config.js --optimize-minimize --mode=production'

stats: ## Statistics about dependencies
	@/bin/bash -c 'export NODE_ENV='production' && npx webpack --profile --json > stats.json'

build: ## Build
	@/bin/bash -c 'npx webpack --config webpack.config.js'

lint: ## Lint
	@/bin/bash -c 'npx eslint src/ .js'

start-dev: ## Start deelopment server
	@/bin/bash -c "npx webpack-serve --config ./webpack.config.js --port=8888 --open --content='dist'"

watch: ## Watch
	@/bin/bash -c 'npx webpack --watch'