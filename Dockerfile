FROM openjdk:17-jdk-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx spawn-fcgi fcgiwrap procps iproute2 ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY libs ./libs
COPY src  ./src
RUN javac -cp libs/* -d out $(find src -name "*.java") \
 && jar cf app.jar -C out .

COPY web /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY --chmod=755 start.sh    /app/start.sh
COPY --chmod=755 run-java.sh /app/run-java.sh

EXPOSE 80
CMD ["/app/start.sh"]
