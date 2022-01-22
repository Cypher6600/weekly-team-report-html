pipeline {
    agent any
    stages {
        stage('prep') {
            steps {
             git url: ''
                //
            }
        }
        stage('Build') {
            steps {
             sh "npm install"
             sh "npm run build"
                //
            }
        }
        stage('terraform install and build') {
            steps {
              sh "wget -O terraform_1.0.0_linux_amd64.zip https://releases.hashicorp.com/terraform/1.0.0/terraform_1.0.0_linux_amd64.zip"
              sh "unzip terraform_*_linux_amd64.zip -d /usr/local/bind"
              sh "terraform init"
              sh "terraform plan"
              sh "terraform apply --yes"
                //
            }
        }
    }
}
