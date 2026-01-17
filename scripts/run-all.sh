#!/usr/bin/env bash
set -euo pipefail
./scripts/run-spec.sh
./scripts/run-ux.sh
./scripts/run-arch.sh
./scripts/run-impl.sh
./scripts/run-qa.sh
./scripts/validate-artifacts.sh
