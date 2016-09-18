describe('page.service', () => {

  var request

  beforeEach(() => {
    jasmine.Ajax.install();
    request = jasmine.Ajax.requests.mostRecent();
  });

  it('should work', done => {
    var result = await window.services.page.get()
    expect(1 + 1).toBe(2)
    done()
  })
});
