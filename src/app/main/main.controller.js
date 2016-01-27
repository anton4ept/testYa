(function() {
  'use strict';

  angular
    .module('testYa')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($localStorage, $scope) {
    var vm = this;
    var counter = 0;
    if(typeof $localStorage.myTasks == 'undefined') {
      $localStorage.myTasks=[];
    }
    vm.myTasks=$localStorage.myTasks;
    
    // watch for localStorage
    $scope.$watch(function(scope) {
      return $localStorage.myTasks;
    }, function(nV, oV){ vm.myTasks=nV; });
    
    // cointer-index must be unique
    if(vm.myTasks.length>0) {
      counter = (vm.myTasks.length > vm.myTasks[vm.myTasks.length-1].id)?vm.myTasks.length:vm.myTasks[vm.myTasks.length-1].id+1;
    }
    
    // create empty object
    vm.resetForm = function() {
      vm.newTask = {
        title: "",
        id: counter,
        status: 0
      }
      counter++;
    }
    
    // reset for on first time
    vm.resetForm();
    
    // add new task
    vm.addTask = function() {
      vm.myTasks.push(vm.newTask);
      vm.resetForm();
    }
    
    // change status
    vm.processTask = function(task) {
      vm.myTasks.filter(function(t) { return t.id===task.id })[0].status=1;
    }
    
    // change status
    vm.endTask = function(task) {
      vm.myTasks.filter(function(t) { return t.id===task.id })[0].status=2;
    }
    
    // change status
    vm.deleteTask = function(task) {
      $localStorage.myTasks = vm.myTasks = vm.myTasks.filter(function(t) { return t.id!==task.id });
    }
  }
})();
