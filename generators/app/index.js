'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../redux'))
    this.composeWith(require.resolve('../docker'))
  }

  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling ' + chalk.red('generator-dillon-react') + ' generator!'
    ))

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'What is the name of your project?',
        default: this.appname.replace(/\s+/g, '-'),
        save: true
      },
      {
        type: 'input',
        name: 'baseRoute',
        message: 'What is the base route of your project?',
        default: '/' + this.appname.replace(/\s+/g, '-'),
        save: true
      },
      {
        type: 'input',
        name: 'port',
        message: 'What is port your app will run on?',
        default: '3000',
        save: true
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer
      this.props = props
    })
  }

  writing () {
    let context = {
      appName: this.props.appName,
      baseRoute: this.props.baseRoute,
      port: Number(this.props.port) || 3000
    }

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      context,
      null,
      { globOptions: { dot: true } }
    )
  }

  install () {
    this.installDependencies({
      npm: true,
      bower: false
    })
  }
}
