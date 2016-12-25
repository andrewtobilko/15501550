window.addEventListener('load', function () {

    function doFirstTask() {

        var task = document.createElement('div'), iframe, ul;
        task.classList.add('first-task');
        task.innerHTML = "Task #1";

        function createLectureList() {
            var LECTURE_AMOUNT = 10, PATH = "lectures/", EXTENSION = ".html", NAME = 'lecture';
            ul = document.createElement('ul');

            function fitTo(num, size) {
                var s = num + "";
                while (s.length < size) s = "0" + s;
                return s;
            }

            function updateIframeView(newSource) {
                iframe.src = newSource;
            }

            function changeIframeVisibility(self) {
                var classes = iframe.classList;
                self.selected ? classes.remove('hidden') : classes.add('hidden');
            }

            function closeThePrevious(current) {
                var children = ul.children;
                for (var i = 0; i < children.length; ++i) {
                    var li = children[i];
                    if (li.selected && li != current) {
                        li.innerHTML = li.originalInnerHTML;
                        li.selected = false;
                    }
                }
            }

            for (var i = 0; i < LECTURE_AMOUNT; ++i) {
                var li = document.createElement('li');
                li.innerHTML = PATH + NAME + fitTo(i + 1, 2) + EXTENSION;
                li.originalInnerHTML = li.innerHTML;
                li.selected = false;
                li.onclick = function () {
                    var self = this;


                    self.innerHTML = self.selected ? self.originalInnerHTML : self.originalInnerHTML + " (open)";
                    self.selected = !self.selected;

                    if (self.selected) {
                        closeThePrevious(self);
                        updateIframeView(self.originalInnerHTML);
                    }
                    changeIframeVisibility(self);
                };
                ul.appendChild(li);
            }

            task.appendChild(ul);
        }
        function createIframe() {
            iframe = document.createElement('iframe');
            iframe.classList.add('hidden');
            task.appendChild(iframe);
        }

        createLectureList();
        createIframe();

        return task;
    }

    function doSecondTask() {
        var task = document.createElement('div'), startButton, textField;
        task.classList.add('second-task');
        task.innerHTML = "Task #2";

        function createStartButton() {
            startButton = document.createElement('button');
            startButton.innerHTML = 'Click to start an animation!';
            startButton.onclick = function() {

            };
            task.appendChild(startButton);
        }

        function createTextField() {
            textField = document.createElement('input');
            textField.type = 'text';
            textField.placeholder = 'Make this text runnable!';
            task.appendChild(textField);
        }

        createTextField();
        createStartButton();

        return task;
    }

    function doThirdTask() {
        var task = document.createElement('div');
        task.classList.add('third-task');
        task.innerHTML = "Task #3";

        return task;
    }

    function performAllTask() {
        document.body.appendChild(doFirstTask());
        document.body.appendChild(doSecondTask());
        document.body.appendChild(doThirdTask());
    }

    performAllTask();

}, false);