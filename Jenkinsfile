pipeline {
    agent any
    stages {
        stage('prep') {
            steps {
             git url: 'https://github.com/Cypher6600/weekly-team-report-html.git', branch: 'develop-team-1'
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
          steps{
              sh 'aws s3 cp --profile bill6600 . s3://bill-bucket-77 --recursive --acl public-read'
              //
          }
      }
    }
}
