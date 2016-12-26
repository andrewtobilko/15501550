function Machine() {
    var self = this;

    self.aaaa = 2;
    self.run = function () {
        alert("The machine is running!");
    }
}

function CoffeeMachine(power, capacity) {
    Machine.apply(this);

    var self = this;

    var WATER_HEAT_CAPACITY = 4200,
        waterAmount = 0;

    function getBoilTime() {
        return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }

    function getExactTime(hours, minutes, seconds) {
        var result = '';

        function fit(value, ends) {
            var r = value;
            if ([2, 3, 4].includes(value % 10)) {
                r += ' ' + ends[0];
            } else if (value % 10 !== 1) {
                r += ' ' + ends[1];
            } else {
                r += ' ' + ends[2];
            }
            return r;
        }

        if (hours && hours > 0) result += fit(hours, ['часa', 'часов', 'час']);
        if (minutes && minutes > 0) result += ' ' + fit(minutes, ['минуты', 'минут', 'минута']);
        if (seconds && seconds > 0) result += ' ' + fit(seconds, ['секунды', 'секунд', 'секунда']);

        return result.trim();
    }

    function onReady() {
        alert('Coffee is ready!');
    }

    function validateWaterAmount(value) {
        return value >= 0 && value <= capacity;
    }

    self.run = function () {
        alert('The coffee machine is running!')
        setTimeout(onReady, getBoilTime());
    };
    self.waterAmount = function (/*optional*/ amount) {
        return arguments.length === 0 ?
            waterAmount :
            validateWaterAmount(amount) ? waterAmount = amount : waterAmount;
    };

    self.addWater = function (amount) {
        return validateWaterAmount(waterAmount + amount) ?
            waterAmount += amount :
            waterAmount;
    }

}

console.log(new CoffeeMachine(200, 200).run());