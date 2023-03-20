#!/bin/bash
export INPUT_GITHUB_TOKEN=""
export INPUT_ARGOCD_SERVER_FQDN="https://localhost:8080"
export INPUT_ARGOCD_TOKEN=""
export INPUT_ARGOCD_VERSION="2.6.1"
export INPUT_EXTRA_CLI_ARGS="--grpc-web"
export INPUT_EXCLUDE_PATHS=""

npx ncc build --source-map

node dist/index.js