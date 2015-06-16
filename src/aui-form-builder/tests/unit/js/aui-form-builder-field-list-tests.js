YUI.add('aui-form-builder-field-list-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-list');

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder Field List Unit Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        tearDown: function() {
            this._fieldList && this._fieldList.destroy();
            this._container.empty();
        },

        createFieldList: function(config) {
            this._fieldList = new Y.FormBuilderFieldList(config);
            this._container.append(this._fieldList.get('content'));
        },

        'should add a field to the field list': function() {
            this.createFieldList();

            Y.Assert.isNull(Y.one('.form-builder-field'));

            this._fieldList.addField(new Y.FormBuilderFieldSentence());
            Y.Assert.isNotNull(Y.one('.form-builder-field'));
        },

        'should add a field between fields in a list': function() {
            var sentence = new Y.FormBuilderFieldSentence(),
                sentence2 = new Y.FormBuilderFieldSentence();

            this.createFieldList({ fields: [sentence, sentence2] });

            Y.all('.form-builder-field-list-add-button').item(1).simulate('mouseover');
            Y.all('.form-builder-field-list-add-button-circle').item(1).simulate('click');

            this._fieldList.addField(new Y.FormBuilderFieldSentence({title: 'between'}));

            Y.Assert.areEqual(Y.all('.form-field-title').item(1).get('innerHTML'), 'between');
        },

        'should show/hide add button between fields on mouseover/mouseleave': function() {
            var addButton,
                sentence = new Y.FormBuilderFieldSentence(),
                sentence2 = new Y.FormBuilderFieldSentence();

            this.createFieldList({ fields: [sentence, sentence2] });

            addButton = Y.all('.form-builder-field-list-add-button').item(1);

            Y.Assert.isFalse(addButton.hasClass('form-builder-field-list-add-button-visible'));

            addButton.simulate('mouseover');
            Y.Assert.isTrue(addButton.hasClass('form-builder-field-list-add-button-visible'));

            addButton.simulate('mouseout');
            Y.Assert.isFalse(addButton.hasClass('form-builder-field-list-add-button-visible'));

            addButton = Y.all('.form-builder-field-list-add-button').item(2);

            Y.Assert.isTrue(addButton.hasClass('form-builder-field-list-add-button-visible'));

            addButton.simulate('mouseover');
            Y.Assert.isTrue(addButton.hasClass('form-builder-field-list-add-button-visible'));

            addButton.simulate('mouseout');
            Y.Assert.isTrue(addButton.hasClass('form-builder-field-list-add-button-visible'));
        },

        'should remove a field from the field list': function() {
            var sentence = new Y.FormBuilderFieldSentence();

            this.createFieldList({ fields: [sentence] });
            Y.Assert.isNotNull(Y.one('.form-builder-field'));

            this._fieldList.removeField(sentence);
            Y.Assert.isNull(Y.one('.form-builder-field'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-form-builder-field-list', 'aui-form-builder-field-sentence', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});