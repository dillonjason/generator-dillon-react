import com.learnvest.devtoolsHelpers
timestamps {
    def devtoolsHelpers = new com.learnvest.devtoolsHelpers()
    node {
        wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'XTerm']) {
            stage ('Checkout') {
                // For more information about Jenkinsfiles, please check out https://learnvest.atlassian.net/wiki/pages/viewpage.action?pageId=62750754
                // For information about the custom steps, please check out https://github.com/lvtech/JenkinsLibrary
                // Remove the line below once you are ready to build your project.
                error 'This Jenkinsfile was created from an automatic template. Please modify before trying to build'

                // Checkout the source code and set some variables
                checkout scm
                commit_sha = devtoolsHelpers.getCommitSha()
                notification_channel = '#musketeers'
                image_name = "build.learnvest.net:5000/image_name"
                image_name2 = "build.learnvest.net:5000/image_name2"

                // Uncomment to create another jenkins based on jobDSL, to run
                // things on a schedule for example
                //jobDsl targets: 'JenkinsDSL'

            }

            stage ('Test and Build') {
                try {
                    milestone 1
                    // Build a single docker image
                    buildOrPullDocker imageName: image_name, buildOptions: 'path/to/Dockerfile'
                    // Or build several images in parallel
                    parallel (
                        "image1" : {
                            buildOrPullDocker imageName: image_name, buildOptions: 'path/to/Dockerfile'
                        },
                        "image2" : {
                            buildOrPullDocker imageName: image_name2, buildOptions: 'path/to/other/Dockerfile'
                        },
                    )
                    // Uncomment for using docker-compose commands after building the images
                    // if you need to run tests with a local database container for example
                    // withEnv(["TAG=${commit_sha}"]) {
                    //     sh 'docker-compose command'
                    // }
                    slackSend channel: notification_channel, color: 'good', message: "Build <${env.BUILD_URL}|${env.JOB_NAME} #${env.BUILD_ID}> finished successfully"
                    currentBuild.result = 'SUCCESS'
                } catch (err) {
                    echo 'Jenkinsfile error, see stacktrace below'
                    currentBuild.result = 'FAILURE'
                    slackSend channel: notification_channel, color: 'danger', message: "Build <${env.BUILD_URL}/console|${env.JOB_NAME} #${env.BUILD_ID}> failed with errors"
                    throw err
                }
            }

            stage ('Sonarqube Analysis') {
                runSQAnalysis
            }

            if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'dev' && currentBuild.result != 'FAILURE') {
                stage ('Push Dev Images') {
                    error 'Please change line below'
                    lock(resource: '<resource-lock-unique-name>', inversePrecedence: true) {
                        milestone 2
                        try {
                            sh "docker push ${image_name}:${commit_sha}"
                            sh "docker push ${image_name2}:${commit_sha}"
                        }
                        catch (err) {
                            slackSend channel: notification_channel, color: 'danger', message: "Build ${env.JOB_NAME} #${env.BUILD_ID}: Pushing images to docker registry failed"
                            error 'Pushing images to docker registry failed'
                        }
                    }
                }

                stage ('Deploy to test environment') {
                    milestone 3
                    // Automatically change project sha value in service file. Auto-deployed environments will
                    // deploy this change without any other intervention
                    // Environment name comes from https://build-tools.learnvest.net/dm/v/admin/environment/list/
                    // Project name comes from https://build-tools.learnvest.net/dm/v/admin/project_container/list/
                    updateServicesFile environment: '<environment name>', project: '<Project name>'
                }
            }
            // Uncomment to load junit test results
            // junit 'backend/nosetests.xml'
            // Cleanup workspace
            step ([$class: 'WsCleanup'])
        }
    }

    if (env.BRANCH_NAME == 'master' && currentBuild.result == 'SUCCESS') {
        milestone 4
        slackBooleanInput channel: notification_channel, message: 'Deploy changes?'

        node {
            wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'XTerm']) {
                milestone 5
                stage ('Push Prod Images') {
                    // Since this part might happen on a different node, we need to checkout the source code again
                    checkout scm
                    error 'Please change line below'
                    lock(resource: '<resource-lock-unique-name2>', inversePrecedence: true) {
                        try {
                            sh "docker tag ${image_name}:${commit_sha} ${image_name}:latest"
                            sh "docker tag ${image_name2}:${commit_sha} ${image_name2}:latest"
                            sh "docker push ${image_name}:latest"
                            sh "docker push ${image_name2}:latest"
                        }
                        catch (err) {
                            slackSend channel: notification_channel, color: 'danger', message: "Build ${env.JOB_NAME} #${env.BUILD_ID}: Pushing images to docker registry failed"
                            error 'Pushing images to docker registry failed'
                        }
                    }
                }
                stage ('Deploy to Production environment') {
                    // Automatically change project sha value in service file. Environment auto-deployed will
                    // deploy this change without any other intervention
                    // Environment name comes from https://build-tools.learnvest.net/dm/v/admin/environment/list/
                    // Project name comes from https://build-tools.learnvest.net/dm/v/admin/project_container/list/
                    updateServicesFile environment: '<environment name>', project: '<Project name>'
                }
                // Cleanup workspace
                step ([$class: 'WsCleanup'])
            }
        }
    }
}
