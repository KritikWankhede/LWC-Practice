({
    handleMsg : function(component, event) {
        var messages=event.getParam('msg');
        component.set('v.message',messages);
    }
})
