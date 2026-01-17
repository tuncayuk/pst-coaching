.PHONY: spec ux arch impl qa validate all

spec:
	./scripts/run-spec.sh
ux:
	./scripts/run-ux.sh
arch:
	./scripts/run-arch.sh
impl:
	./scripts/run-impl.sh
qa:
	./scripts/run-qa.sh

validate:
	./scripts/validate-artifacts.sh

all: spec ux arch impl qa validate
