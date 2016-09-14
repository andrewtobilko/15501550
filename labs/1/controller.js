angular.module('15501550').controller('FirstLabController', function() {

    var self = this, DEFAULT_VALUE = 0;

    self.dimension = 9;

    function isAllowedToPutNumber(i, j, d) {
        function isRightPart() { return j != i && i > j && j + i < d - 1; }
        function isLeftPart() { return i < j && j + i > d - 1; }

        return isRightPart() || isLeftPart();
    }
    function printMatrixToConsole(matrix) {
        var out = "";
        for(var i = 0; i < matrix.length; ++i) {
            for (var j = 0; j < matrix[i].length; ++j) out += matrix[i][j] + " ";
            out += "\n";
        }
        console.log(out);
    }

    self.refill = function () {
        var counter = 0;
        for (var i = 0; i <  self.dimension; ++i) {
            if (!self.matrix[i]) self.matrix[i] = [];
            for (var j = 0; j <  self.dimension; ++j) {
                self.matrix[i][j] = isAllowedToPutNumber(i, j, self.dimension) ? ++counter : DEFAULT_VALUE;
            }
        }
        printMatrixToConsole(self.matrix);
    };
    self.fill = function () {
        self.matrix = [];
        for (var i = 0; i < self.dimension; ++i) {
            self.matrix[i] = new Array(self.dimension).fill(DEFAULT_VALUE);
        }
        printMatrixToConsole(self.matrix);
    };

    self.isEmpty = function(i, j) {
        return self.matrix[i][j] == 0;
    }

});