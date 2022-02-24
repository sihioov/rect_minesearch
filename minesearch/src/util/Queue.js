export default class Queue {

    constructor() {
        this.queueArray = [];
    }

    _enque = (data) => {
        this.queueArray.push(data);
    }

    _deque = () => {
        this.queueArray.shift();
    }

    _search = () => {

    }
}

