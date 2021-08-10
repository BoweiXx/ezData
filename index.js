/**
 * This project's purpose is to learn how to realize data structures
 * This project is not using Class, this is considering the compatibility before ES6
 * Reference repo: https://github.com/mauriciosantos/Buckets-JS
 */
"use strict";
/**top level name space 
 * @name ezdata
 */
let ezdata = {};
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
/**determine whether the item is function
 * 
 * @function
 * @private
 */
ezdata.isFunction = function (fn) {
    return (typeof fn) === "function"
}

/**create an empty linked list
 * 
 * @class basic linked list
 * @constructor
 */
ezdata.linkedList = function () {
    /**
     * @exports list 
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
        if (index === size - 1) return lastNode;
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
        if (typeof pos !== "number" || pos < 0 || pos >= size) return false;
        let node = new Node(val, undefined);
        if (size === 0) {
            firstNode = node;
            lastNode = node
        } else if (index === size) {
            lastNode.next = node;
            lastNode = node;
        } else if (index === 0) {
            node.next = firstNode;
            firstNode = node;
        } else {
            let prevNode = nodeAt(pos);
            node.next = prevNode.next;
            prevNode.next = node
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
     * 
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
     * 
     * @param {*} item 
     */
    list.remove = function (item) {
        if (!list.has(item)) return false;
        let current = firstNode, prev;
        while (current !== undefined) {
            if (current.val === target) {

            }
        }
        prev = current;
        current = current.next;
    }
    /**
     * 
     * @returns Boolean whether the list is empty
     */
    list.isEmpty = function () {
        return Boolean(size);
    }

    list.reverse = function(){
            
    }
    /**
     * clear the list
     */
    list.clear = function () {
        firstNode = undefined, lastNode = undefined, size = 0;
    }
    /**
     * Convert the linked list to an array, with given order of elements
     * @returns {Array}
     */
    list.toArray = function () {
        if (size = 0) return [];
        let current = firstNode, converted = [];
        while (current) {
            converted.unshift(current.val);
            current = current.next;
        }
        return converted;
    }
    return list;
};

/**
 *
 */
module.exports = ezdata;