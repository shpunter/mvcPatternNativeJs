var Model = function (data) {
    this.data = data;

    return this;
};

Model.prototype.privateId = function () {
    this.data.forEach(function (element) {
        Object.defineProperty(element, 'id', {
            enumerable: false,
            configurable: false,
            writable: false
        });
    });

    return this;
};

Model.prototype.setData = function (data) {
    this.data.push(data);

    return this;
};

Model.prototype.dellItem = function (arrayOfId) {
    arrayOfId.forEach(function (id) {
        var filtered = this.data.filter(function (element) {
            return element.id != id;
        });

        this.data = filtered;
    }.bind(this));

    return this;
};



var View = function (model) {
    this.model = model;

    return this;
};

View.prototype.render = function () {
    var contentTr = '';

    var tableHead = function (config) {
        var result = '';

        config.forEach(function (element) {
            result += '<th>' + element + '</th>'
        });

        return result;
    };

    this.model.data.forEach(function (element) {
        var contentTd = '';

        Object.keys(element).forEach(function (elementKey) {
            contentTd += '<td>' + element[elementKey] + '</td>';
        });

        contentTd += '<td>' +
            '   <div class=\"checkbox\">' +
            '       <label>'+
            '           <input name="checkerDelete" id = \"'+ element.id +'"\ type=\"checkbox\">'+
            '       </label>' +
            '   </div>' +
            '</td>' +
            '<td>' +
            '   <div class=\"checkbox\">' +
            '       <label>'+
            '           <input name="checkerEdit" id = \"'+ element.id +'"\ type=\"checkbox\" data-toggle="modal" data-target="#myModal">'+
            '       </label>' +
            '   </div>' +
            '</td>';

        contentTr += '<tr>' + contentTd + '</tr>';
    });

    var table = '<div class=\"table-responsive\">' +
        '<table class=\"table table-condensed\"><tr>' + tableHead(config.headTable) + '</tr>' + contentTr + '</table>' +
        '</div>';

    document.getElementById('output').innerHTML = table;

    return this;
};

View.prototype.renderModal = function (obj) {
    var data = this.model.data;
    var contentDivs = '';
    var value = '';


    data.forEach(function (element) {
        if (obj) {
             value = 'value="' + obj[element.id] || "" + ' " ';
        }

        contentDivs += ''+
            '           <div class="form-group">'+
            '               <label for="'+ element.id +'" class="col-sm-2 control-label">'+ element.labelTxt +'</label>'+
            '               <div class="col-sm-10">'+
            '                   <input type="'+ element.type +'" class="form-control" id="'+ element.id +'" placeholder="'+ element.placeholder +'" ' + value + '">'+
            '               </div>'+
            '           </div>';

    });

    var content = '' +
        '<div class="modal-content">'+
        '   <div class="modal-header">'+
        '       <button type="button" class="close" data-dismiss="modal">&times;</button>'+
        '           <h4 class="modal-title">Add new customer</h4>'+
        '   </div>' +

        '   <div class="modal-body">'+
        '       <form class="form-horizontal" id="modalBody">'+
                    contentDivs +
        '       </form>'+
        '   </div>'+

        '   <div class="modal-footer">'+
        '       <button id="addBtn" type="button" class="btn btn-default" data-dismiss="modal">Save</button>'+
        '   </div>'+
        '</div>';

    document.getElementById('modalContent').innerHTML = content;

    return this;
};



var Controller = function () {
    return this;
};

Controller.prototype.load = function (data) {
    this.model = new Model(data || []).privateId();
    this.view = new View(this.model).render();
};

Controller.prototype.loadModal = function (data, obj) {
    this.model = new Model(data || []);
    this.view = new View(this.model).renderModal(obj);
};

Controller.prototype.addItem = function (data) {
    this.model.setData(data).privateId();

    this.view.render();
};

Controller.prototype.dellItems = function (arrayOfId) {
    this.model.dellItem(arrayOfId);

    this.view.render();
};

