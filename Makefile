.PHONY: main staging

main:
	git add .
	git commit -m "$(msg)"
	git push origin main

staging:
	git add .
	git commit -m "$(msg)"
	git push origin staging