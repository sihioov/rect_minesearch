export default class Queue {

    constructor() {
        this.queueArray = [];
        this.storage = {};
        this.front = 0;
        this.rear = 0;
    }

    _enque = (data) => {
        // this.queueArray.push(data);

        if (this._size() === 0) {
            this.storage['0'] = data;
        } else {
            this.rear += 1;
            this.storage[this.rear] = data;
        }
    }

    _deque = () => {

        let temp;

        if (this.font === this.rear) {
            temp = this.storage[this.front];
            delete this.storage[this.front];
            this.front = 0;
            this.rear = 0;
        } else {
            temp = this.storage[this.front];
            delete this.storage[this.front];
            this.front += 1;
        }
        return temp;
        //this.queueArray.shift();
    }

    _size = () => {
        if (this.storage[this.rear] === undefined) {
            return 0;
        } else {
            return this.rear - this.front + 1;
        }
    }

    _empty = () => {
        
        if (this.front == 0 && this.rear == 0)
            return true;
        else 
            return false;
    }

    _search = () => {

    }
}

