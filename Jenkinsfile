pipeline {
  agent {
    node {
      label 'clever-ci'
    }

  }
  stages {
    stage('build') {
      steps {
        sh 'clever version'
      }
    }
  }
}
