node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Install') {
      sh 'yarn'
    }
    stage('Test') {
      sh 'yarn test'
    }
    stage('Build') {
      sh 'yarn build'
    }
  } catch (e) {
    slackSend color: 'bad', channel: '#codebot', message: "CI build failed: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|View>)"
    throw e
  }
}
