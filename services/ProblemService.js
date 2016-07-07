(function() {

    angular.module('pp-app')
        .factory('problemService', ProblemService, ['$http', '$q']);

    function ProblemService($http, $q) {

        const GITHUB_REPO_OWNER = 'lopezton';
        const GITHUB_REPO_NAME = 'practice-problems'
        const GITHUB_API_PROBLEMS = 'https://api.github.com/repos/' + GITHUB_REPO_OWNER + '/' + GITHUB_REPO_NAME + '/contents/problems';
        const GITHUB_RAW_DOMAIN = 'https://raw.githubusercontent.com/';
        const GITHUB_RAW_REPOSITORY = GITHUB_RAW_DOMAIN + GITHUB_REPO_OWNER + '/' + GITHUB_REPO_NAME;
        const GITHUB_PROBLEM_CATEGORY_RAW_URL = GITHUB_RAW_REPOSITORY + '/gh-pages/problem-category.json';

        return {
            getAll: getAll,
            getByCategoriesAsMap: getByCategoriesAsMap,
            getCategories: getCategories
        };

        function getAll() {

            var deferred = $q.defer();

            $http.get(GITHUB_API_PROBLEMS).then(function(response) {

                var problems = [];
                var promises = [];

                angular.forEach(response.data, function(problemDirectoryInfo) {
                    promises.push(getById(problemDirectoryInfo.name).then(function(problem) {
                        problems.push(problem);
                    }));
                });

                $q.all(promises).then(function() {
                    deferred.resolve(problems);
                }, function(response) {
                    deferred.reject(response);
                });
            });

            return deferred.promise;
        }

        function getCategories() {
            return $http.get(GITHUB_PROBLEM_CATEGORY_RAW_URL);
        }

        function getByCategoriesAsMap() {
            var deferred = $q.defer();

            getAll().then(function(problems) {
                var problemsMap = [];
                angular.forEach(problems, function(problem) {
                    problemsMap[problem.id] = problem;
                });

                getCategories().then(function(response) {
                    var categories = response.data;
                    var map = {};

                    angular.forEach(categories, function(category) {
                        map[category.name] = [];
                        angular.forEach(category.problems, function(problemName) {
                            map[category.name].push(problemsMap[problemName]);
                        })
                    });
                    
                    deferred.resolve(map);
                });
            });
            
            return deferred.promise;
        }

        function getById(problemId) {
            var deferred = $q.defer();

            $http.get(GITHUB_RAW_REPOSITORY + '/gh-pages/problems/' + problemId + '/problem.json').then(function(response) {
                    deferred.resolve(response.data);
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

}())