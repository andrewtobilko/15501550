app.controller('SecondLabController', function () { // todo : avoid duplicate code in closures

    var self = this;

    // the origin task
    function getPi(methodNumber) {
        var currentPi = 0, N = 10000000;

        if (methodNumber === 2) {
            var f = function () {
                return 'Method Monte Carlo';
            };
            f.compute = function () {
                cleanCurrentPi();
                var pTotal = 0, pInside = 0, R = 5
                while (pTotal < N) {
                    pTotal++;
                    if (Math.pow(Math.random() * R * 2 - R, 2) + Math.pow(Math.random() * R * 2 - R, 2) < Math.pow(5, 2)) pInside++;
                }
                return currentPi = (4 * pInside / pTotal);
            };
            return f;
        } else if (methodNumber === 1) {
            var f = function () {
                return '(the fourth formula)';
            };
            f.compute = function () {
                cleanCurrentPi(1);
                var a = 4 / 3 * Math.sqrt(2) / 2;
                for (var n = 1; n < N; ++n) {
                    currentPi *= Math.pow(n, 2) / (Math.pow(n, 2) - Math.pow(3 / 4, 2));
                }
                return currentPi = a * currentPi;
            };
            return f;
        } else if (methodNumber === 3) {
            var f = function () {
                return 'Series (the third formula)';
            };
            f.compute = function () {
                cleanCurrentPi();
                for (var k = 0; k < N; ++k) currentPi += Math.pow(-1, k) / Math.pow(4, k) * (2 / (4 * k + 1) + 2 / (4 * k + 2) + 1 / (4 * k + 3));
                return currentPi;
            };
            return f;
        } else {
            return function () {
                return 'Unknown method number!';
            };
        }

        function cleanCurrentPi(newValue) { // refresh the value before a new calculation
            currentPi = newValue || 0;
        }

    }

    self.methods = [];

    _.range(1, 4).forEach(function(i) {
        var method = getPi(i);
        self.methods.push({method: method, result: method.compute() });
    });

});