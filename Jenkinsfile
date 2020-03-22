pipeline {
    agent {
        node {
            label "master"
        }
    }

    tools {
        nodejs '10.15.3'
    }

    options {
        disableConcurrentBuilds()
        timeout(time: 10, unit: 'MINUTES')
    }

    stages {
        stage('Start') {
            steps {
                script {
                    currentBuild.displayName = "${TAG}"
                }
                withCredentials([string(credentialsId: 'cityos-slack', variable: 'SLACK_TOKEN')]) {
                    slackSend message: "*[${APP_NAME}][${TAG}]*: Pipeline starting... ",
                        color: "good",
                        channel: "${env.SLACK_CHANNEL}",
                        teamDomain: "${env.SLACK_TEAM_DOMAIN}",
                        token: "${SLACK_TOKEN}",
                        baseUrl: "${env.SLACK_BASE_URL}"
                    }
                }
                
        }

        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/dev']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'cityos_deploy', url: 'git@github.com:appsmonkey/air.frontend.git']]])
            }
        }
        
        stage('Install dependencies') {
            steps {
                retry(2) {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                retry(2) {
                    sh 'npm run build'
                }
            }
        }

        stage('Push artifact') {
            steps {
                sh "tar cvzf /tmp/${TAG}.tar.gz build"
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'cityos-jenkins', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    sh "aws s3 cp /tmp/${TAG}.tar.gz s3://${ARTIFACT_BUCKET}/${APP_NAME}/${TAG}.tar.gz"
                }
                sh "rm -f /tmp/${TAG}.tar.gz"
            }
        }

        stage('Deploy archive') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'cityos-jenkins', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    sh "aws s3 sync build s3://${APP_BUCKET} --acl public-read"
                }
            }
        }

        stage('Cache invalidation') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'cityos-jenkins', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    sh "aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths '/*'"
                }
            }
        }
    }
    post {
        always { 
            cleanWs deleteDirs: true, notFailBuild: true
        }
        success {
            withCredentials([string(credentialsId: 'cityos-slack', variable: 'SLACK_TOKEN')]) {
                slackSend message: "*[${APP_NAME}][${TAG}]*: Pipeline finished. | ${env.BUILD_URL}",
                    color: "good",
                    channel: "${env.SLACK_CHANNEL}",
                    teamDomain: "${env.SLACK_TEAM_DOMAIN}",
                    token: "${SLACK_TOKEN}",
                    baseUrl: "${env.SLACK_BASE_URL}"
                }
        }
        failure {
            withCredentials([string(credentialsId: 'cityos-slack', variable: 'SLACK_TOKEN')]) {
                slackSend message: "*[${APP_NAME}][${TAG}]*: Pipeline failed. | ${env.BUILD_URL}",
                    color: "danger",
                    channel: "${env.SLACK_CHANNEL}",
                    teamDomain: "${env.SLACK_TEAM_DOMAIN}",
                    token: "${SLACK_TOKEN}",
                    baseUrl: "${env.SLACK_BASE_URL}"
            }
        }
    }
}
