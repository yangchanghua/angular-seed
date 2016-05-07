'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /istudy when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/istudy");
  });


  describe('istudy', function() {

    beforeEach(function() {
      browser.get('index.html#/istudy');
    });


    it('should render istudy when user navigates to /istudy', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/My studies/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
