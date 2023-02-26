.PHONY: deploy
deploy:
	npm run build
	@echo "Build complete. Deploying to server..."
	firebase deploy
	@echo "Deploy complete."