pipeline {
    agent {
        kubernetes {
            yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: node
            image: node:16.13.1-alpine
            command:
            - cat
            tty: true
          - name: cli
            image: amazon/aws-cli
            command:
            - cat
            tty: true
           - name: docker
            image: docker:19.03
            imagePullPolicy: Always
            command:
            - cat
            tty: true
            volumeMounts:
                - name: dockersock
                mountPath: /var/run/docker.sock

          volumes:
          - name: dockersock
            hostPath:
                path: /var/run/docker.sock
         '''
        }
    }
    stages {
            stage('prep') {
                steps {
                git url: 'https://github.com/Cypher6600/weekly-team-report-html.git', branch: 'develop-team-2'
                }
            }
            stage('node') {
            steps {
                    container('node') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
            stage('cli login') {
                steps {
                    container('cli') {
                    // sh 'aws ecr get-login-password --region us-west-2 > ./password.txt'
                    sh 'aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 529396670287.dkr.ecr.us-west-2.amazonaws.com'
                    }
                }
            }
            stage('build docker image') {
                steps{
                    container('docker') {
                        dir("./dockerfile") {
                        sh 'docker build . -t front-end:0.0.1'
                        sh 'docker tag front-end:0.0.1 529396670287.dkr.ecr.us-west-2.amazonaws.com/front-end:0.0.1'
                        sh 'docker push 529396670287.dkr.ecr.us-west-2.amazonaws.com/front-end:0.0.1'
                        }
                    }
                }
            }
    }
}
