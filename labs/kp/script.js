window.addEventListener('load', function () {
    document.getElementById('text1').onclick = function () {
        document.getElementById('input1').value = '';
        document.getElementById('text1').classList.add('hidden');
    }
    var i2 = document.getElementById('input2');
    i2.onfocus = function () {
        var placeholder = document.getElementById('placeholder');
        placeholder.classList.add('placeholder');
    };
    i2.onblur = function () {
        if (document.getElementById('input2').value.length === 0) {
            var placeholder = document.getElementById('placeholder');
            placeholder.classList.remove('placeholder');
        }
    }
}, false);


function handleFirstTask() {
    var input = document.getElementById('input1');
    var inputValue = input.value;
    var styles = document.getElementById('text1').classList;

    if (inputValue.length == 0) {
        styles.add('hidden');
    } else {
        styles.remove('hidden');
    }
}