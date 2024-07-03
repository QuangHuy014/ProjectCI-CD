# Stage 1: Build
FROM maven:3.8.8-eclipse-temurin-17-alpine AS build

# Thiết lập thư mục làm việc trong stage build
WORKDIR /app

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Chạy lệnh Maven để build ứng dụng
RUN mvn clean package 
# Stage 2: Run
FROM openjdk:17-jdk-alpine3.14

# Sao chép file JAR từ stage build sang stage run
COPY --from=build /app/target/planny-0.0.1-SNAPSHOT.jar app.jar

# Chạy ứng dụng khi container khởi động
CMD ["java", "-jar", "app.jar"]

# # Thiết lập cổng sẽ được mở trên container
# EXPOSE 8080
