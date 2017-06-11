'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'confirm',
        name: 'isDocker',
        message: 'Do you need Docker?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    if (this.props.isDocker) {
      this.fs.copyTpl(
        this.templatePath(),
        this.destinationPath(),
        {appName: this.config.get('appName'), baseRoute: this.config.get('baseRouter')},
        null,
        {globOptions: {dot: true}}
      );
    }
  }
};
