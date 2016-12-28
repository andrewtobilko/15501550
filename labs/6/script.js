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
        div.innerHTML = (ticket.name.trim() ? 'Passenger: ' + ticket.name + "<br>" : '') +
            ('ID: ' + ticket.id + '<br>Price: ' + ticket.price + '$');

        var removeBtn = document.createElement('span');

        removeBtn.elementToRemove = ticket; // a dirty hack
        removeBtn.classList.add('glyphicon');
        removeBtn.classList.add('glyphicon-remove');
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function () {
            // remove a ticket by id from a cart
            cart.splice(cart.indexOf(this.elementToRemove), 1);
            updateCart();
        };
        div.appendChild(removeBtn);
        cartNode.appendChild(div);
        total += ticket.price;
    }
    var totalNode = document.getElementById('total');

    var payOff = document.createElement('button');
    payOff.innerHTML = 'Order!';

    payOff.classList.add('btn');
    payOff.classList.add('btn-primary');
    payOff.classList.add('btn-lg');
    payOff.classList.add('pay-off-btn');

    payOff.setAttribute('data-toggle', 'modal');
    payOff.setAttribute('data-target', '#modal');

    totalNode.innerHTML = cart.length !== 0 ? ('Total: ' + total + '$') : '';
    totalNode.appendChild(payOff);
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

    $('#customerCardNumber').mask('9999 9999 9999 9999');
    $('#customerDate').mask('99/9999');
    $('#customerCode').mask('999');

    function jumpToTheNext(from, to) {
        document.getElementById(from).onkeyup = function () {
            var i = document.getElementById(from);
            if (!i.value.includes('_')) {
                i.blur();
                document.getElementById(to).focus();
            }
        };
    }

    jumpToTheNext('customerCardNumber', 'customerDate');
    jumpToTheNext('customerDate', 'customerCode');
    jumpToTheNext('customerCode', 'finish');

}, false);