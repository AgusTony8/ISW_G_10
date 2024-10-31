#Imagen modelo
FROM eclipse-temurin:21.0.4_7-jdk-alpine

# Informar el puerto donde se ejecuta el contenedor
EXPOSE 8082

#Definir directorio raiz del contenedor
WORKDIR /root

#Copiar y pegar archivos dentro del contenedor
COPY ./pom.xml /root
COPY ./.mvn /root/.mvn
COPY ./mvnw /root

# Descargar las dependencias
RUN ./mvnw dependency:go-offline

# Copiar codigo fuente dentro del contenedor
COPY ./src /root/src

# Construir aplicacion
RUN ./mvnw clean install -DskipTests

# Levantar aplicacion cuando el contenedor inicie
ENTRYPOINT ["java", "-jar", "/root/target/tango-app-email-server-0.0.1-SNAPSHOT.jar"]