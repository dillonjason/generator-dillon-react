
casper
  .start('http://localhost:<%= port %><%= baseRoute %>/', () => {
    
    casper.test.begin('page has a correnct title', 1, (test) => {
      test.assertSelectorHasText('title', '<%= appName %>');
      test.done();
    });
    
  })
  .run(() => {
    casper.echo('Done.').exit();
  });
