#!/usr/bin/env bash
set -euo pipefail
exec /usr/bin/env java -cp "/app/app.jar:/app/libs/*" App 2>>/var/log/java-fcgi.log
