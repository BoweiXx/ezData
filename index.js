/**
 * This project's purpose is to learn how to realize data structures
 * Uses UMD module
 * Reference repo: https://github.com/mauriciosantos/Buckets-JS
 */
(function (env, factory) {
    if (typeof exports === "object") {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        env.ezdata = factory();
    }
})(this, function () {
    'use strict'
    let ezdata = {}
    /**default function on converting to string
        * 
        * @function
        * @private
        */
    ezdata.toString = function (item) {
        if (item === null) return "null";
        if (item === undefined) return "undefined";
        if (ezdata.isString(item)) return item;
        return item.toString();
    }
    /**determine whether the item is string
     * 
     * @function
     * @private
     */
    ezdata.isString = function (item) {
        return (typeof item) === "string";
    }
    /**determine whether the item is a function
     * 
     * @function
     * @private
     */
    ezdata.isFunction = function (fn) {
        return (typeof fn) === "function"
    }

    /**creates an empty linked list
     * 
     * @class basic linked list
     * @constructor
     */
    ezdata.LinkedList = function () {
        /**
         * @exports list as ezdata().linkedList();
         * @private
         */
        //list is a container for all the methods
        let list = {},
            size = 0,
            firstNode = undefined,
            lastNode = undefined;
        /**constructor for node
         * 
         * @param {*} val 
         * @param {*} next 
         * @returns 
         */
        function Node(val, next) {
            this.val = val, this.next = next;
        }
        /**find value of node at designated index
         * 
         * @param {Number} index 
         * @returns 
         */
        function nodeAt(index) {
            if (index < 0 || typeof index !== "number" || index >= size) return undefined;
            if (index === size) return lastNode;
            if (index === 0) return firstNode;
            let result = firstNode;
            for (let i = 0; i < index; i++) { result = result.next };
            return result;
        };
        /**Insert a node in the list
         * 
         * @param {*} val 
         * @param {Number} pos 
         * @return {Boolean} true if the element is added, false if it is not
         */
        list.add = function (val, pos) {
            if (pos === undefined) pos = size;
            if (typeof pos !== "number" || pos < 0 || pos > size) return false;
            let node = new Node(val, undefined);
            if (size === 0) {
                firstNode = node;
                lastNode = node
            } else if (pos === size) {
                lastNode.next = node;
                lastNode = node;
            } else if (pos === 0) {
                node.next = firstNode;
                firstNode = node;
            } else {
                let original = nodeAt(pos);
                let prev = nodeAt(pos - 1);
                node.next = original;
                prev.next = node;
            }
            size++;
            return true
        }
        /**
         * 
         * @returns first node of the list
         */
        list.first = function () {
            if (firstNode) return firstNode;
            return undefined;
        }
        /**
         * 
         * @returns last node of the list
         */
        list.last = function () {
            if (lastNode) return lastNode;
            return undefined;
        }
        /**
         * Return the index of the item that has the same val, if there are multiple nodes with same val, return the first
         * @param {*} val 
         * @returns if found, return the pos, if not, return -1
         */
        list.indexOf = function (val) {
            let current = firstNode, result = 0;
            while (current) {
                if (val === current.val) {
                    return result;
                }
                result++;
                current = current.next;
            }
            return -1;
        }
        /**
         * 
         * @param {*} val 
         * @return {Boolean} 
         */
        list.has = function (val) {
            let current = firstNode;
            while (current) {
                if (val === current.val) return true;
                current = current.next;
            }
            return false;
        }
        /**
         * WARNING: DO NOT PASS IN list.add 
         * Pass a function, execute the function on each node
         * @param {function(Object)} callback 
         */
        list.forEach = function (callback) {
            let current = firstNode;
            //safty check
            let sizeCopy = size;
            while (current) {
                if (!current.val || sizeCopy !== size) break;
                callback(current.val);
                current = current.next;
            }
        }
        /**
         * remove a designated item from the list, if there are two nodes with the same val, remove the first one
         * @param {*} item 
         * @return {Boolean} whether the operation success or not
         */
        list.remove = function (item) {
            if (!list.has(item)) return false;
            let current = firstNode, prev = undefined;
            while (current) {
                if (current.val === item) {
                    //for list has 1 element
                    if (current === firstNode) {
                        firstNode = firstNode.next;
                        if (current === lastNode) {
                            lastNode = null;
                        }
                    } else if (current = lastNode) {
                        lastNode = prev;
                        prev.next = current.next;
                        current.next = null;
                    } else {
                        prev.next = current.next;
                        current.next = null;
                    }
                    size--;
                    return true;
                }
                prev = current;
                current = current.next;
            }
            return false;
        }
        /**
         * 
         * @param {Number} index | if number is a negative number, count backwards
         * @returns Boolean Whether the removal is successful
         */
        list.removeAt = function (index) {
            if (index > size || typeof index !== "number") return false;
            if (index < 0) {
                if (Math.abs(index) > size) {
                    return false;
                } else {
                    index = size - index;
                }
            }
            let prev, counter = 0, current = firstNode;
            while (current) {
                if (counter === index) {
                    prev.next = current.next;
                    current.next = null;
                    return true;
                }
                prev = current;
                counter++;
            }
            return false;
        }
        /**
         * 
         * @returns Boolean whether the list is empty
         */
        list.isEmpty = function () {
            return !Boolean(size);
        }
        /**
         * clear the list
         */
        list.clear = function () {
            firstNode = undefined, lastNode = undefined, size = 0;
        }
        /**
         * Return size of the list
         * @returns Number
         */
        list.size = function () {
            return size;
        }
        /**
         * Convert the linked list to an array, with given order of elements
         * @returns {Array}
         */
        list.toArray = function () {
            if (size = 0) return [];
            let current = firstNode, converted = [];
            while (current) {
                converted.push(current.val);
                current = current.next;
            }
            return converted;
        }
        return list;
    };
    /**Creates an empty queue
     * NOTE: should I use array? No, use object instead;
     * @class
     * @constructor
     */
    ezdata.Queue = function () {
        /**
         * @exports a q object as ezdata.Queue
         * @private
         */
        let q = {},
            firstNode = undefined,
            lastNode = undefined,
            size = 0;
        /**
         * @constructor Creates an empty node
         * @private
         */
        let Node = function (val) {
            this.val = val;
            // this.pos;
        }
        /**
         * The object for the queue, user can use ezdata.Queue().queue to inspect
         */
        q.queue = {};
        /**
         * Add an element at the end of the queue
         * @param {*} val 
         */
        q.enqueue = function (val) {
            let newNode = new Node(val);
            if (size === 0) {
                newNode.pos = 0;
                firstNode = newNode;
                lastNode = newNode;
                q.queue[0] = newNode;
                size++;
                return true;
            } else {
                newNode.pos = size;
                lastNode = newNode;
                q.queue[size] = newNode;
                size++;
                return true;
            }
            return false;
        }
        /**
         * Remove the first element of the queue;
         * @returns Boolean Whether the operation is success
         */
        q.dequeue = function () {
            if (size === 0) return false;
            if (size === 1) {
                q.clear();
            } else {
                //FIXME: Sthis will cause performance issue, need to redo
                for (let i = 1; i < size; i++) {
                    q.queue[i].pos -= 1;
                    q.queue[i - 1] = q.queue[i];
                    firstNode = q.queue[0];
                };
                size--;
                delete q.queue[size];
                return true;
            }
        }
        /**
         * Clear the queue
         * @returns Boolean Whether the operation is success
         */
        q.clear = function () {
            q.queue = {};
            firstNode = undefined;
            lastNode = undefined;
            size = 0;
            return true;
        }
        /**
         * Check the value of the head element in the queue
         * @returns * value of the last element of the queue
         */
        q.peek = function () {
            return firstNode.val;
        }
        q.size = function () {
            return size;
        }
        q.has = function (item) {
        }
        return q;
    }

    return ezdata;
})

