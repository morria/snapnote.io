all:
	docker build -t morria/snapnote .

run:
	docker run -it -p 80:80 -e BUCKET_NAME=${BUCKET_NAME} -e PROJECT_ID=${PROJECT_ID} --rm morria/snapnote

push:
	docker push morria/snapnote
