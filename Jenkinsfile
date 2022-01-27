pipeline {
    agent any 
    stages {
        stage('prep') {
            steps {
             git url: 'https://github.com/Cypher6600/weekly-team-report-html.git', branch: 'develop-team-1'
                  }
        }
        stage('Build') {
      agent {
          docker { image 'node:16.13.1-alpine' }
       }
       steps {
        sh 'npm install'
        sh 'npm run build'
       }
    }
      
   stage('sonar-scanner') {
        agent {
          docker { image 'openjdk:11' }
        }
             steps {
                 script {
                     def SONARQUBE_HOSTNAME = 'sonar'
        def sonarqubeScannerHome = tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
        withCredentials([string(credentialsId: 'sonar', variable: 'sonarLogin')]) {
        sh "${sonarqubeScannerHome}/bin/sonar-scanner -e -Dsonar.host.url=http://${SONARQUBE_HOST}:9000 -Dsonar.login='admin' -Dsonar.password='Admin@123' -Dsonar.projectName=WebApp -Dsonar.projectVersion=${env.BUILD_NUMBER} -Dsonar.projectKey=GS -Dsonar.sources=src/ -Dsonar.java.binaries=build/**/* -Dsonar.language=js"
                        }
                 }    
         }
  }
           
            stage('Terraform - Init S3') {

		agent {
            docker {
                image 'hashicorp/terraform:latest'
                args  '--entrypoint="" -u root -v /home/ec2-user/.aws:/root/.aws'
            }
        }
        steps {
                sh 'terraform init'
                sh 'terraform apply --auto-approve'
        }
    }

    stage('AWS - Upload to S3'){
        agent {
            docker {
                image 'amazon/aws-cli'
                args '--entrypoint="" -v /home/ec2-user/.aws:/root/.aws'
            }
        }
        steps {
           sh 'aws s3 cp --profile bill6600 . s3://bill-bucket-77 --recursive --acl public-read'
        }
}
}
}