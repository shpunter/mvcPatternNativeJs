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
    headTable: ['name', 'email', 'telephone', 'address', 'street', 'city', 'state', 'zip'],
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

//(function () {
"use strict";

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var init = new Controller();
        init.load(data);

        //var checkBoxFn = function () {
        //    var checkBoxs = [].slice.call(document.getElementsByName('checker'));
        //    var result = [];
        //
        //    checkBoxs.forEach(function (element) {
        //        if (element.checked){
        //            result.push(element.id);
        //        }
        //    });
        //
        //    return result;
        //};

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
        };

        var dellBtnFn = function () {
            init.dellItems(checkBoxFn());
        };

        var saveBtnFn = function () {
            init.dellItems(checkBoxFn());

            addBtnFn();
        };

        var editBtnFn = function () {
            init.model.data.forEach(function (element) {
        //        checkBoxFn().forEach(function (elCheckBox) {
                    console.log(elCheckBox);
                    if (element.id == elCheckBox){
                        var modalBtnInit = new Controller();
                        modalBtnInit.loadModal(config.modelHeader, element);
                    }
        //        });
            });

            document.getElementById('addBtn').addEventListener('click', saveBtnFn);
        };

        document.getElementById('modalBtn').addEventListener('click', modalBtnFn);
        document.getElementById('dellBtn').addEventListener('click', dellBtnFn);
        document.getElementById('editBtn').addEventListener('click', editBtnFn);

        var checkBoxs = [].slice.call(document.getElementsByName('checker'));

        checkBoxs.forEach(function (element) {
            element.addEventListener('click', dellBtnFn);
        });
    }
};
//})();
