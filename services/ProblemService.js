(function() {

    angular.module('pp-app')
        .factory('problemService', ProblemService, []);

    function ProblemService() {
        return {
            getAll: getAll,
            getByCategory: getByCategory
        };

        function getAll() {
            var rv = [];
            for(var i = 1; i <= 6; i++) {
                rv.push(createMockProject(i));
            }
            return rv;
        }

        function getByCategory(category) {
            var rv = [];
            if ('All' === category) {
                rv = getAll();
            } else if ('Easy' === category) {
                for(var i = 1; i <= 3; i++) {
                    rv.push(createMockProject(i));
                }
            } else if ('Medium' === category) {
                for(var i = 4; i <= 5; i++) {
                    rv.push(createMockProject(i));
                }
            } else if ('Hard' === category) {
                rv.push(createMockProject(6));
            }
            return rv;
        }

        function createMockProject(index) {
            return {
                name: 'Project Name ' + index,
                thumbnailUrl: 'http://placehold.it/700x400',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, ' +
                    'gravida pellentesque urna varius vitae.'
            };
        }
    }

}())