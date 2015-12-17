var data = [
        {
            'id': 1,
            'name': 'some Name',
            'email': 'some Email',
            'telephone': 'some Telephone',
            'address': 'some Address',
            'street': 'some Street',
            'city': 'some City',
            'state': 'some State',
            'zip': 'some Zip'
        },
        {
            'id': 2,
            'name': 'second some Name',
            'email': 'second some Email',
            'telephone': 'second some Telephone',
            'address': 'second some Address',
            'street': 'second some Street',
            'city': 'second some City',
            'state': 'second some State',
            'zip': 'second some Zip'
        }
];

var config = {
    headTable: ['name', 'email', 'telephone', 'address', 'street', 'city', 'state', 'zip', 'del', 'edit'],
    modelHeader: [
        {
            id: 'name',
            placeholder: 'Full name',
            labelTxt: 'Name',
            type: 'text'
        },
        {
            id: 'email',
            placeholder: 'Email',
            labelTxt: 'Email',
            type: 'email'

        },
        {
            id: 'telephone',
            placeholder: 'Telephone',
            labelTxt: 'Telephone',
            type: 'text'

        },
        {
            id: 'address',
            placeholder: 'Address',
            labelTxt: 'Address',
            type: 'text'

        },
        {
            id: 'street',
            placeholder: 'Street',
            labelTxt: 'Street',
            type: 'text'

        },
        {
            id: 'city',
            placeholder: 'City',
            labelTxt: 'City',
            type: 'text'

        },
        {
            id: 'state',
            placeholder: 'State',
            labelTxt: 'State',
            type: 'text'

        },
        {
            id: 'zip',
            placeholder: 'Zip',
            labelTxt: 'Zip Code',
            type: 'zip'

        }
    ]
};

(function () {
    "use strict";

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            var init = new Controller();
            init.load(data);

            var checkBoxListener = function () {
                var checkerDelete = [].slice.call(document.getElementsByName('checkerDelete'));
                var checkerEdit = [].slice.call(document.getElementsByName('checkerEdit'));

                checkerDelete.forEach(function (element) {
                    element.addEventListener('click', dellBtnFn);
                });

                checkerEdit.forEach(function (element) {
                    element.addEventListener('click', editBtnFn);
                });
            };

            var checkBoxFn = function () {
                var checkBoxs = [].slice.call(document.getElementsByName('checkerEdit'));
                var result = [];

                checkBoxs.forEach(function (element) {
                    if (element.checked){
                        result.push(element.id);
                    }
                });

                return result;
            };

            var modalBtnFn = function () {
                var modalBtnInit = new Controller();
                modalBtnInit.loadModal(config.modelHeader);

                document.getElementById('addBtn').addEventListener('click', addBtnFn);
            };

            var addBtnFn = function () {
                var modalInputs = {
                    id: +Date.now()
                };

                config.modelHeader.forEach(function (element) {
                    modalInputs[element.id] = document.getElementById(element.id).value || '';
                });

                init.addItem(modalInputs);
                checkBoxListener();
            };

            var dellBtnFn = function (event) {
                init.dellItems([event.target.id]);
                checkBoxListener();
            };

            var saveBtnFn = function () {
                init.dellItems(checkBoxFn());

                addBtnFn();
            };

            var editBtnFn = function (event) {

                init.model.data.forEach(function (element) {
                    if (element.id == event.target.id){
                        var editModal = new Controller();
                        editModal.loadModal(config.modelHeader, element);
                    }
                });

                document.getElementById('addBtn').addEventListener('click', saveBtnFn);
            };

            document.getElementById('modalBtn').addEventListener('click', modalBtnFn);

            checkBoxListener();
        }
    };
})();
