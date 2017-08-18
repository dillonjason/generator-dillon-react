'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting () {
    const prompts = [
      {
        type: 'confirm',
        name: 'useRedux',
        message: 'Do you need Redux?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useSaga',
        message: 'Do you need Redux-Saga?',
        when: function (answers) {
          // Only ask about saga if the user needs redux
          return answers.useRedux
        },
        default: true
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing () {
    let context = {
      appName: this.config.get('appName'),
      baseRoute: this.config.get('baseRouter'),
      useSaga: this.props.useSaga
    }

    if (this.props.useRedux) {
      this.fs.copyTpl(
        this.templatePath(),
        this.destinationPath(),
        context
      )
    }

    if (this.props.useSaga) {
      this.fs.copyTpl(
        this.templatePath('src/client/js/.sagas'),
        this.destinationPath('src/client/js/sagas'),
        context
      )
    }
  }

  install () {
    let packages = []
    if (this.props.useRedux) {
      packages.push('redux@3.7.1')
      packages.push('react-redux@5.0.5')
    }

    if (this.props.useSaga) {
      packages.push('redux-saga@0.15.4')
    }

    if (packages.length) {
      this.npmInstall(packages, {save: true})
    }
  }
}