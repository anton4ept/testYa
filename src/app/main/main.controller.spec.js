(function() {
  'use strict';

  describe('controllers', function(){
    var vm;

    beforeEach(module('testYa'));
    beforeEach(inject(function(_$controller_, _$timeout_, _webDevTec_, _toastr_) {
      spyOn(_webDevTec_, 'getTec').and.returnValue([{}, {}, {}, {}, {}]);
      spyOn(_toastr_, 'info').and.callThrough();

      vm = _$controller_('MainController');
    }));

    it('should have a timestamp creation date', function() {
      expect(vm.creationDate).toEqual(jasmine.any(Number));
    });

    it('should define animate class after delaying timeout ', function() {
      expect(vm.classAnimation).toEqual('rubberBand');
    });

    it('should show a Toastr info and stop animation when invoke showToastr()', function() {
      vm.showToastr();
      expect(vm.classAnimation).toEqual('');
    });

    it('should define more than 5 awesome things', function() {
      expect(angular.isArray(vm.awesomeThings)).toBeTruthy();
      expect(vm.awesomeThings.length === 5).toBeTruthy();
    });
  });
})();
