function CoffeeMachine(power, capacity) {

    var self = this;

    var WATER_HEAT_CAPACITY = 4200,
        waterAmount = 0;

    function getBoilTime() { return waterAmount * WATER_HEAT_CAPACITY * 80 / power; }
    function onReady() { alert('Coffee is ready!'); }
    function validateWaterAmount(value) { return value >= 0 && value <= capacity; }

    self.run = function() {
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

function Machine() {
    var self = this;

    self.run = function() {
        alert("The machine is running!");
    }

}

var coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();