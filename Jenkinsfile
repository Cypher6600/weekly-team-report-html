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
              sh "terraform init -update"
              sh "terraform plan"
              sh "terraform apply --yes"
                //
            }
        }
        
                  
               stage('deploy to S3'){
          steps{
              sh 'aws s3 cp index.html s3://bill-bucket-66'
              sh 'aws s3api put-object-acl --bucket bill-bucket-66 --key index.html --acl public-read'
              sh 'aws s3 cp error.html s3://bill-bucket-66'
              sh 'aws s3api put-object-acl --bucket bill-bucket-66 --key error.html --acl public-read'
              //
          }
      }
    }
}
