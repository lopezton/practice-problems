(function() {

    angular.module('pp-app')
        .controller('problemCategoryCtrl', ProblemCategoryController, ['$scope']);

    function ProblemCategoryController($scope) {
        $scope.problemCategories = [
            {
                name: 'All',
                description: 'All Problems'
            },
            {
                name: 'Easy',
                description: 'Easy Problems'
            },
            {
                name: 'Medium',
                description: 'Medium Problems'
            },
            {
                name: 'Hard',
                description: 'Hard Problems'
            }
        ];
    }
}())