#!/usr/bin/env bash
set -e

echo "[start] will log java stderr to /var/log/java-fcgi.log"
spawn-fcgi -n -F 1 -p 9000 -- \
  /usr/bin/env java -cp "/app/app.jar:/app/libs/*" App 2> /var/log/java-fcgi.log &

sleep 0.4
echo "[start] listeners:"
ss -ltnp | grep 9000 || true

echo "[start] nginx foreground"
exec nginx -g 'daemon off;'
