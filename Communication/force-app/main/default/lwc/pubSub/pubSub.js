const store={};
/**
 * Subscribes a callback function to an event.
 * @param {string} event - The name of the event.
 * @param {function} callBack - The callback function to be executed when the event is triggered.
 */
const subscribe=(event,callBack)=>{
    if(!store[event]){
        store[event]=new Set();
    }
    store[event].add(callBack);
};
/**
 * Unsubscribes a callback function from an event.
 * @param {string} event - The name of the event.
 * @param {function} callBack - The callback function to be unsubscribed.
 */

const unsubscribe=(event,callBack)=>{
    store[event].delete(callBack)
}


/**
 * Triggers an event.
 * @param {string} event - The name of the event.
 * @param {*} data - The data to be passed to the event subscribers.
 */

 const publish=(event,data)=>{
    if(store[event]){
        store[event].forEach(callBack=>{
            try{
                callBack(data);
            }catch(e){
                console.log(e);
            }
        });
    }
}

export default{
    subscribe,
    unsubscribe,
    publish
}

