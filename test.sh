#!/bin/bash
export INPUT_GITHUB_TOKEN="https://argocd.dev.argocd-diff-action.dev"
export INPUT_ARGOCD_SERVER_FQDN="https://argocd.dev.argocd-diff-action.dev"
export INPUT_ARGOCD_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJhcmdvLWNkLWRpZmYtYWN0aW9uOmFwaUtleSIsIm5iZiI6MTY3NjM4MDQxOCwiaWF0IjoxNjc2MzgwNDE4LCJqdGkiOiJjNTUzMTU4My0xZjQ0LTQ1ZDYtOWZhYy1iNjliYzlhNGY5YWMifQ.5SMFC0QmOARCFwTR44P05Z8TRX-AwQU_WUUx51hJUDI"
export INPUT_ARGOCD_VERSION="2.6.1"
export INPUT_EXTRA_CLI_ARGS="--grpc-web"
export INPUT_EXCLUDE_PATHS=""

ncc build --source-map

node dist/index.js