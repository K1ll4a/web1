## Running the Project with Docker

This project provides a Docker-based setup for building and running the Java application located in the `src/` directory. The Docker configuration uses Eclipse Temurin JDK 17 for both build and runtime environments.

### Requirements
- **Docker** and **Docker Compose** installed on your system.
- No external dependencies or environment variables are required by default.

### Build and Run Instructions
1. **Build and start the application:**
   ```sh
   docker compose up --build
   ```
   This command will:
   - Build the Java application from source using Eclipse Temurin 17 JDK.
   - Package the compiled classes into a JAR file.
   - Run the application in a container as a non-root user.

2. **Stopping the application:**
   ```sh
   docker compose down
   ```

### Configuration Details
- **Java Version:** Eclipse Temurin 17 (JDK for build, JRE for runtime)
- **No environment variables** are required by default. If you need to add any, uncomment the `env_file` line in the `docker-compose.yml` and provide a `.env` file in the `src/` directory.
- **No ports are exposed** by default. If your application listens on a port, update the `docker-compose.yml` to expose it (e.g., add `ports: ["8080:8080"]` under the `java-src` service).
- **No persistent volumes** or external services are configured.

### Notes
- The application is built and run entirely from the `src/` directory.
- The Docker setup uses a multi-stage build for efficient image size and security (non-root user).
- If you add more services or need inter-service communication, update the `networks` section in the compose file accordingly.
