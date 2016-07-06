(function() {

    angular.module('pp-app')
        .controller('problemsCtrl', ProblemsController, ['$scope', 'problemService']);

    function ProblemsController($scope, problemService) {
        $scope.activeProblems = [];
        $scope.init = init;

        function init(category) {
            $scope.activeProblems = problemService.getByCategory(category);
        }
    }

}())