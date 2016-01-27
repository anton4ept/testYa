(function() {
  'use strict';

  angular
    .module('testYa')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($localStorage) {
    var vm = this;
    var counter = 0;
    if(typeof $localStorage.myTasks == 'undefined') {
      $localStorage.myTasks=[];
    }
    vm.myTasks=$localStorage.myTasks;
    
    if(vm.myTasks.length>0) {
      counter = (vm.myTasks.length > vm.myTasks[vm.myTasks.length-1].id)?vm.myTasks.length:vm.myTasks[vm.myTasks.length-1].id+1;
    }

    vm.resetForm = function() {
      vm.newTask = {
        title: "",
        id: counter,
        status: 0
      }
      counter++;
    }
    vm.resetForm();
    
    vm.addTask = function() {
      vm.myTasks.push(vm.newTask);
      vm.resetForm();
    }
    
    vm.processTask = function(task) {
      vm.myTasks.filter(function(t) { return t.id===task.id })[0].status=1;
    }
    
    vm.endTask = function(task) {
      vm.myTasks.filter(function(t) { return t.id===task.id })[0].status=2;
    }
    
    vm.deleteTask = function(task) {
      $localStorage.myTasks = vm.myTasks = vm.myTasks.filter(function(t) { return t.id!==task.id });
    }
  }
})();