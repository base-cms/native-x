node {
  stage('Checkout') {
    checkout scm
  }

  stage('Ember Build') {
    docker.withRegistry('https://registry.hub.docker.com', 'docker-registry-login') {
      def myDocker = docker.image("limit0/node-build:latest")
      myDocker.pull()
      myDocker.inside("-v ${env.WORKSPACE}:/var/www/html -u 0:0") {

        stage('Yarn') {
          sh 'yarn'
        }
        stage('Ember') {
          sh 'ember build --environment=production'
        }

        stage('Cleanup') {
          sh 'rm -rf node_modules bower_components tmp'
        }

      }
    }
  }

  if (!env.BRANCH_NAME.contains('PR-')) {
    docker.withRegistry('https://664537616798.dkr.ecr.us-east-1.amazonaws.com', 'ecr:us-east-1:aws-jenkins-login') {

      stage('Build Container') {
        myDocker = docker.build("scontent-app:v${env.BUILD_NUMBER}", '.')
      }

      stage('Push Container') {
        myDocker.push("latest");
        myDocker.push("v${env.BUILD_NUMBER}");
      }

      stage('Upgrade Container') {
        rancher confirm: true, credentialId: 'rancher', endpoint: 'https://rancher.as3.io/v2-beta', environmentId: '1a18', image: "664537616798.dkr.ecr.us-east-1.amazonaws.com/scontent-app:v${env.BUILD_NUMBER}", service: 'scontent/app', environments: '', ports: ''
      }
      stage('Notify Upgrade') {
        slackSend color: 'good', message: "Finished deploying ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|View>)"
      }

    }
  }
}
