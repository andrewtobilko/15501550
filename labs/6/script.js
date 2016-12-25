var cart = [];

var PRICES = {
    OPTIONS: {
        ADULT: 1,
        CHILD: 0.25,
        STUDENT: 0.5
    },
    SERVICES: {
        LINENS: 10,
        TEA: 1,
        CHOCOLATE: 5
    },
    DEFAULT: {
        LUXURY: 100,
        MIDDLE: 50,
        POOR: 1
    }
};

function onChange(type) {
    document.getElementById(type + '-price').innerHTML = calculatePrice(type) + '$';
}

function calculatePrice(type) {
    var price = PRICES.DEFAULT[type.toUpperCase()];
    var services = 0;
    var nodes = document.getElementById(type + '-services').childNodes;
    for (var i = 0; i < nodes.length; ++i) {
        if (nodes[i].nodeType === 1) {
            var option = nodes[i].firstChild;
            if (option.checked) {
                price += PRICES.SERVICES[option.value];
            }
        }
    }
    return price * PRICES.OPTIONS[document.getElementById(type + '-options').value];
}

function add(type) {
    cart.push(new Ticket(
        document.getElementById(type + '-first-name').value,
        document.getElementById(type + '-last-name').value,
        calculatePrice(type),
        type
    ));
    updateCart();
}

function updateCart() {
    var cartNode = document.getElementById('cart');
    cartNode.innerHTML = "";
    var total = 0;
    for (var i = 0; i < cart.length; ++i) {
        var ticket = cart[i];

        var div = document.createElement('div');
        div.classList.add(ticket.type + '-ticket');
        div.classList.add('ticket');
        div.innerHTML = ticket.name + "<br>" + ticket.id + "<br>" + ticket.price;
        total += ticket.price;
        cartNode.appendChild(div);
    }

    var totalNode = document.createElement('div');
    totalNode.id = 'total';
    totalNode.innerHTML = 'Total: ' + total + '$';

    cartNode.appendChild(totalNode);
}

function Ticket(firstName, lastName, price, type) {
    this.id = generateId();
    this.name = firstName + " " + lastName;
    this.price = price;
    this.type = type;

    return this;
}

function generateId() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

window.addEventListener('load', function () {
    function setDefaultValues() {
        var defaultPrices = PRICES.DEFAULT;
        document.getElementById('poor-price').innerHTML = defaultPrices.POOR + '$';
        document.getElementById('middle-price').innerHTML = defaultPrices.MIDDLE + '$';
        document.getElementById('luxury-price').innerHTML = defaultPrices.LUXURY + '$';
    }

    setDefaultValues();

}, false);