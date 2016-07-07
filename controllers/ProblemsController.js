(function() {

    angular.module('pp-app')
        .controller('problemsCtrl', ProblemsController, ['$scope', 'problemService']);

    function ProblemsController($scope, problemService) {
        $scope.allProblems = [];
        $scope.problemCategories = [];
        $scope.problemsByCategory = [];

        function init() {
            
            problemService.getByCategoriesAsMap().then(function(map) {
                $scope.problemsByCategory = map;
            });

            problemService.getAll().then(function(problems) {
                $scope.allProblems = problems;
            });

            problemService.getCategories().then(function(response) {
                $scope.problemCategories = response.data;
            });
        }
        
        init();
    }

}())