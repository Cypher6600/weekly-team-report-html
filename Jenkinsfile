pipeline {
    agent any 
    stages {
        stage('prep') {
            steps {
             git url: 'https://github.com/Cypher6600/weekly-team-report-html.git', branch: 'develop-team-1'
                  }
        }
        stage('build html') {
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
	def sonarqubeScannerHome = tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
        withCredentials([string(credentialsId: 'sonar', variable: 'sonarLogin')]) {
        sh "${sonarqubeScannerHome}/bin/sonar-scanner -e -Dsonar.host.url=http://34.222.16.50:9000 -Dsonar.login=${sonarLogin} -Dsonar.projectName=WebApp -Dsonar.projectVersion=${env.BUILD_NUMBER} -Dsonar.projectKey=GS -Dsonar.sources=src/ -Dsonar.language=js" }
	             	}
            }  
         }
    
         
             
            stage('TF Create S3 and CDN') {

		agent {
            docker {
                image 'hashicorp/terraform:latest'
                   }
        }
        steps {
            dir("./terraform") {
                sh 'terraform init'
                sh 'terraform apply --auto-approve'
            }
		    dir("./remote-state") {
		        sh 'terraform init'
                sh 'terraform apply -lock=false --auto-approve'
		    }
        }
    }

    stage('Upload data to S3'){
        agent {
            docker {
                image 'amazon/aws-cli'
                }
        }
        steps {
           sh 'aws s3 cp dist s3://bill-bucket-77 --recursive --acl public-read'
        }
}
}
}
