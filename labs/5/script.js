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

            function changeIframeVisibility(e) {
                var classes = iframe.classList;
                if (e.selected) {
                    classes.remove('hidden');
                } else {
                    classes.add('hidden');
                    e.popup.close();
                }
            }

            function closeThePrevious(current) {
                var children = ul.children;
                for (var i = 0; i < children.length; ++i) {
                    var li = children[i];
                    if (li != current) {
                        if (li.selected) {
                            li.innerHTML = li.originalInnerHTML;
                            li.selected = false;
                        }
                        if (li.popup) {
                            li.popup.close();
                        }
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
                        self.popup = window.open(self.originalInnerHTML, self.originalInnerHTML, "width=50,height=50");
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
        var task = document.createElement('div'), startButton, textField, container, runnableDiv;
        task.classList.add('second-task');
        task.innerHTML = "Task #2";
        var interval;

        function createStartButton() {
            var STEP = 10, INTERVAL = 50;
            startButton = document.createElement('button');
            startButton.innerHTML = 'Click to start an animation!';
            startButton.onclick = function () {
                startButton.disabled = true;

                runnableDiv = document.createElement('div');
                runnableDiv.classList.add('runnable');
                runnableDiv.innerHTML = textField.value;
                container.appendChild(runnableDiv);

                setInterval(function () {
                    var offset = parseInt(runnableDiv.style.left) ? parseInt(runnableDiv.style.left) : 0;
                    if (offset + runnableDiv.clientWidth + STEP > container.clientWidth) {
                        runnableDiv.style.left = 0;
                    } else {
                        offset += STEP;
                        runnableDiv.style.left = offset + "px";
                    }
                }, INTERVAL);
            };

            task.appendChild(startButton);
        }

        function createTextField() {
            textField = document.createElement('input');
            textField.type = 'text';
            textField.placeholder = 'Make this text runnable!';

            textField.onkeyup = function () {
                if (runnableDiv) {
                    runnableDiv.innerHTML = textField.value;
                }
            };

            task.appendChild(textField);
        }

        function createContainer() {
            container = document.createElement('div');
            container.classList.add('container');

            task.appendChild(container);
        }

        createTextField();
        createStartButton();
        createContainer();

        return task;
    }

    function doThirdTask() {
        var task = document.createElement('div'), parameters = document.createElement('div');
        task.classList.add('third-task');
        task.innerHTML = "Task #3";

        var location = document.createElement('p');
        location.innerHTML = "location = " + window.location;
        parameters.appendChild(location);

        var search = document.createElement('p');
        search.innerHTML = "location.search = " + window.location.search;
        parameters.appendChild(search);

        var params = document.createElement('p');
        params.innerHTML = "parameters = ";
        parameters.appendChild(params);

        params.innerHTML = "parameters = [";
        window.location.search.substr(1).split("&").forEach(function (item) {
            params.innerHTML += item + ", ";
        });
        params.innerHTML = params.innerHTML.substr(0, params.innerHTML.length - 2) + "]";

        task.appendChild(parameters);

        return task;
    }

    function performAllTask() {
        document.body.appendChild(doFirstTask());
        document.body.appendChild(doSecondTask());
        document.body.appendChild(doThirdTask());
    }

    performAllTask();

}, false);