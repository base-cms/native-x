node {
  def nodeBuilder = docker.image("danlynn/ember-cli:3.1.2")
  nodeBuilder.pull()

  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Test') {
      try {
        sh 'yarn run coverage'
        junit 'coverage/test-results.xml'
        cobertura autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: 'coverage/cobertura-coverage.xml', conditionalCoverageTargets: '70, 0, 0', failUnhealthy: false, failUnstable: false, lineCoverageTargets: '80, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '80, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false
      } catch (e) {
        junit 'coverage/test-results.xml'
        cobertura autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: 'coverage/cobertura-coverage.xml', conditionalCoverageTargets: '70, 0, 0', failUnhealthy: false, failUnstable: false, lineCoverageTargets: '80, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '80, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false
        slackSend color: 'bad', channel: '#codebot', message: "Failed testing ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|View>)"
        sh 'yarn run postcoverage'
        throw e
      }
    }
  } catch (e) {
    slackSend color: 'bad', channel: '#codebot', message: "Failed testing ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|View>)"
    throw e
  }

  if (env.BRANCH_NAME.contains('master')) {
    try {
      stage('Yarn Production Install') {
        nodeBuilder.inside("-v ${env.WORKSPACE}:/app -u 0:0") {
          sh 'yarn install'
          sh 'ember build --environment=production'
          sh 'rm -rf node_modules bower_components tmp'
        }
      }
    } catch (e) {
      slackSend color: 'bad', message: "Failed building ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|View>)"
      process.exit(1)
    }

    try {
      docker.withRegistry('https://664537616798.dkr.ecr.us-east-1.amazonaws.com', 'ecr:us-east-1:aws-jenkins-login') {
        stage('Build Container') {
          myDocker = docker.build("fortnight-app:v${env.BUILD_NUMBER}", '.')
        }
        stage('Push Container') {
          myDocker.push("latest");
          myDocker.push("v${env.BUILD_NUMBER}");
        }
      }
      stage('Upgrade Container') {
        rancher confirm: true, credentialId: 'rancher', endpoint: 'https://rancher.as3.io/v2-beta', environmentId: '1a18', image: "664537616798.dkr.ecr.us-east-1.amazonaws.com/fortnight-app:v${env.BUILD_NUMBER}", service: 'fortnight/app', environments: '', ports: '', timeout: 60
      }
      stage('Notify Upgrade') {
        slackSend color: 'good', message: "Finished deploying ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|View>)"
      }
    } catch (e) {
      slackSend color: 'bad', message: "Failed deploying ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|View>)"
      process.exit(1)
    }
  }
}