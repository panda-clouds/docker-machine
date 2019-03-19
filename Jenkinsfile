pipeline {
  agent any
  tools {
    nodejs 'Node 8.13.0'
  }
  environment {
    NPM_TOKEN = credentials('npm-mrmarcsmith')
    DIGITAL_OCEAN_TOKEN = credentials('digital-ocean-testing-token')
  }
  stages {
    stage('Test') {
      steps {
        sh 'npm install'
        sh 'npm test spec/*.spec.js'
      }
    }
    stage('if master') {
      when { branch "master" }
      
      stages {
        stage('Deploy') {
          input {
            message "✅ All Unit tests passed!"
            ok "Submit"
            parameters {
              choice(name: 'DEPLOY_TO_NPM', choices: ['No, Skip Deploy', 'Yes, Deploy'], description: 'Push to npm?')
            }
          }
          
          when { environment name: 'DEPLOY_TO_NPM', value: 'Yes, Deploy' }

          steps {
            sh 'mv .npmrc-deploy .npmrc'
            sh 'npm publish --access=public'
          }
        }
      }
    }
  }

  post{
    always {
      deleteDir()
    }
  }
}