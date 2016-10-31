function CoffeeMachine(power) {

    this.waterAmount = 0;

    function getBoilTime() {
        return 1000;
    }

    function onReady() {
        alert('Coffee is ready!');
    }

    this.run = function() {
        setTimeout(onReady, getBoilTime());
    };
}

var coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();