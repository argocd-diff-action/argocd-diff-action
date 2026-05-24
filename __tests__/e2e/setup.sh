#!/usr/bin/env bash
# Logs into a freshly installed ArgoCD, mints a read-only API token for the
# action, and creates + syncs the e2e baseline Application. Expects ArgoCD to be
# reachable in plaintext at ARGOCD_ADDR (default 127.0.0.1:8080) and a logged-in
# admin via the initial admin secret. Writes ARGOCD_TOKEN to GITHUB_ENV.
set -euo pipefail

: "${REPO_URL:?REPO_URL must be set}"
: "${TARGET_REVISION:?TARGET_REVISION must be set}"
# Use the IPv4 literal, not "localhost": the argocd CLI resolves localhost to
# IPv6 [::1] first, but kubectl port-forward only binds IPv4 127.0.0.1.
ARGOCD_ADDR="${ARGOCD_ADDR:-127.0.0.1:8080}"

password="$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath='{.data.password}' | base64 -d)"
argocd login "${ARGOCD_ADDR}" --username admin --password "${password}" --plaintext --grpc-web --insecure

token="$(argocd account generate-token --account argocd-diff-action)"
echo "::add-mask::${token}"
echo "ARGOCD_TOKEN=${token}" >> "${GITHUB_ENV}"

export REPO_URL TARGET_REVISION
envsubst < __tests__/e2e/application.yaml | kubectl apply -f -

argocd app sync e2e-app --grpc-web --timeout 180
argocd app wait e2e-app --health --grpc-web --timeout 180
