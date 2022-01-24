pipeline {
    agent {
        docker {
          image 'node:10.11.0-alpine'
        }
    }
    stages {
        stage('prep') {
            steps {
             git url: 'https://github.com/Cypher6600/weekly-team-report-html.git', branch: 'develop-team-1'
                //
            }
        }
        stage('nmp-build') {
             steps {
        sh 'npm install'
        sh 'npm run build'
            //
            }
        }
    
          stage('terraform install and build') {
               steps {
              //sh "wget -O terraform_1.0.0_linux_amd64.zip https://releases.hashicorp.com/terraform/1.0.0/terraform_1.0.0_linux_amd64.zip"
              //sh "unzip terraform_*_linux_amd64.zip -d /usr/local/bin"
             sh "terraform init"
             // sh "terraform plan"
            //  sh "terraform apply --auto-approve"
              //
            }
        }
                          
          stage('deploy to S3'){
              steps {
              sh 'aws s3 cp --profile bill6600 . s3://bill-bucket-77 --recursive --acl public-read'
              sh 'aws s3 ls --profile bill6600'
              //
             }
         }
        
         stage('sonar-scanner') {
             steps {
                 script {
        def sonarqubeScannerHome = tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
        withCredentials([string(credentialsId: 'sonar', variable: 'sonarLogin')]) {
        sh "${sonarqubeScannerHome}/bin/sonar-scanner -e -Dsonar.host.url=http://${SONARQUBE_HOSTNAME}:9000 -Dsonar.login=${sonarLogin} -Dsonar.projectName=WebApp -Dsonar.projectVersion=${env.BUILD_NUMBER} -Dsonar.projectKey=GS -Dsonar.sources=src/main/ -Dsonar.tests=src/test/ -Dsonar.java.binaries=build/**/* -Dsonar.language=java"
                        }
                 }    
         }
  }
}
}
