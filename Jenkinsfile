pipeline {
  agent {
    node {
      label 'clever-ci'
    }

  }
  stages {
    stage('build') {
      parallel {
        stage('build') {
          steps {
            sh 'echo "build"'
          }
        }

        stage('test') {
          steps {
            sh 'echo "test"'
          }
        }

      }
    }

  }
}