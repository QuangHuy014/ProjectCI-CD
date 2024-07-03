pipeline {

    agent any

    tools { 
        maven 'my_maven' 
    }
    environment {
        MYSQL_ROOT_LOGIN = credentials('mysql-quanghuy-account')
    }
    stages {

        stage('Build with Maven') {
            steps {
                sh 'mvn --version'
                sh 'java -version'
                sh 'mvn clean package -Dmaven.test.failure.ignore=true'
            }
        }

        stage('Packaging/Pushing imagae') {

            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                    sh 'docker build -t quanghuy/springboot .'
                    sh 'docker push quanghuy/springboot'
                }
            }
        }

        stage('Deploy MySQL to DEV') {
            steps {
                echo 'Deploying and cleaning'
                sh 'docker image pull mysql:8.0'
                sh 'docker network create dev || echo "this network exists"'
                sh 'docker container stop quanghuy-mysql || echo "this container does not exist" '
                sh 'echo y | docker container prune '
                sh 'docker volume rm quanghuy-mysql-data || echo "no volume"'

                sh "docker run --name quanghuy-mysql --rm --network dev -v quanghuy-mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_LOGIN_PSW} -e MYSQL_DATABASE=Planny  -d mysql:8.0 "
                sh 'sleep 20'
                sh "docker exec -i quanghuy-mysql mysql --user=quanghuy --password=${MYSQL_ROOT_LOGIN_PSW} < script"
            }
        }

        stage('Deploy Spring Boot to DEV') {
            steps {
                echo 'Deploying and cleaning'
                sh 'docker image pull quanghuy/springboot'
                sh 'docker container stop quanghuy-springboot || echo "this container does not exist" '
                sh 'docker network create dev || echo "this network exists"'
                sh 'echo y | docker container prune '

                sh 'docker container run -d --rm --name quanghuy-springboot -p 8080:6868 --network dev quanghuy/springboot'
            }
        }
 
    }
    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}
