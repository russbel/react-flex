!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReactFlex=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],3:[function(require,module,exports){
module.exports = require('./src')
},{"./src":10}],4:[function(require,module,exports){
'use strict'

var objectToString = Object.prototype.toString

module.exports = function(value){
    return objectToString.apply(value) === '[object Arguments]' || !!value.callee
}
},{}],5:[function(require,module,exports){
'use strict'

module.exports = function(value){
    return Array.isArray(value)
}
},{}],6:[function(require,module,exports){
'use strict'

module.exports = function(value){
    return typeof value == 'boolean'
}
},{}],7:[function(require,module,exports){
'use strict'

var objectToString = Object.prototype.toString

module.exports = function(value){
    return objectToString.apply(value) === '[object Date]'
}
},{}],8:[function(require,module,exports){
'use strict'

var number = require('./number')

module.exports = function(value){
    return number(value) && (value === parseFloat(value, 10)) && !(value === parseInt(value, 10))
}
},{"./number":12}],9:[function(require,module,exports){
'use strict'

var objectToString = Object.prototype.toString

module.exports = function(value){
    return objectToString.apply(value) === '[object Function]'
}
},{}],10:[function(require,module,exports){
'use strict'

module.exports = {
    'numeric'  : require('./numeric'),
    'number'   : require('./number'),
    'int'      : require('./int'),
    'float'    : require('./float'),
    'string'   : require('./string'),
    'function' : require('./function'),
    'object'   : require('./object'),
    'arguments': require('./arguments'),
    'boolean'  : require('./boolean'),
    'date'     : require('./date'),
    'regexp'   : require('./regexp'),
    'array'    : require('./array')
}
},{"./arguments":4,"./array":5,"./boolean":6,"./date":7,"./float":8,"./function":9,"./int":11,"./number":12,"./numeric":13,"./object":14,"./regexp":15,"./string":16}],11:[function(require,module,exports){
'use strict'

var number = require('./number')

module.exports = function(value){
    return number(value) && (value === parseInt(value, 10))
}
},{"./number":12}],12:[function(require,module,exports){
'use strict'

module.exports = function(value){
    return typeof value === 'number' && isFinite(value)
}
},{}],13:[function(require,module,exports){
'use strict'

module.exports = function(value){
    return !isNaN( parseFloat( value ) ) && isFinite( value )
}
},{}],14:[function(require,module,exports){
'use strict'

var objectToString = Object.prototype.toString

module.exports = function(value){
    return objectToString.apply(value) === '[object Object]'
}
},{}],15:[function(require,module,exports){
'use strict'

var objectToString = Object.prototype.toString

module.exports = function(value){
    return objectToString.apply(value) === '[object RegExp]'
}
},{}],16:[function(require,module,exports){
'use strict'

module.exports = function(value){
    return typeof value == 'string'
}
},{}],17:[function(require,module,exports){
'use strict'

module.exports = {
   prefixProperties: require('./src/prefixProperties') ,
   object: require('./src/toStyleObject'),
   string: require('./src/toStyleString')
}
},{"./src/prefixProperties":56,"./src/toStyleObject":58,"./src/toStyleString":59}],18:[function(require,module,exports){
module.exports = {
    toLowerFirst     : require('./src/toLowerFirst'),
    toUpperFirst     : require('./src/toUpperFirst'),
    separate         : require('./src/separate'),
    stripWhitespace  : require('./src/stripWhitespace'),
    compactWhitespace: require('./src/compactWhitespace'),
    camelize         : require('./src/camelize'),
    humanize         : require('./src/humanize'),
    hyphenate        : require('./src/hyphenate'),

    is: require('./src/is')
}
},{"./src/camelize":36,"./src/compactWhitespace":37,"./src/humanize":38,"./src/hyphenate":40,"./src/is":44,"./src/separate":47,"./src/stripWhitespace":48,"./src/toLowerFirst":49,"./src/toUpperFirst":50}],19:[function(require,module,exports){
    /**
     * Utility methods for working with functions.
     * These methods augment the Function prototype.
     *
     * Using {@link #before}
     *
     *      function log(m){
     *          console.log(m)
     *      }
     *
     *      var doLog = function (m){
     *          console.log('LOG ')
     *      }.before(log)
     *
     *      doLog('test')
     *      //will log
     *      //"LOG "
     *      //and then
     *      //"test"
     *
     *
     *
     * Using {@link #bindArgs}:
     *
     *      //returns the sum of all arguments
     *      function add(){
     *          var sum = 0
     *          [].from(arguments).forEach(function(n){
     *              sum += n
     *          })
     *
     *          return sum
     *      }
     *
     *      var add1 = add.bindArgs(1)
     *
     *      add1(2, 3) == 6
     *
     * Using {@link #lockArgs}:
     *
     *      function add(){
     *          var sum = 0
     *          [].from(arguments).forEach(function(n){
     *              sum += n
     *          })
     *
     *          return sum
     *      }
     *
     *      var add1_2   = add.lockArgs(1,2)
     *      var add1_2_3 = add.lockArgs(1,2,3)
     *
     *      add1_2(3,4)  == 3 //args are locked to only be 1 and 2
     *      add1_2_3(6)  == 6 //args are locked to only be 1, 2 and 3
     *
     *
     *
     * Using {@link #compose}:
     *
     *      function multiply(a,b){
     *          return a* b
     *      }
     *
     *      var multiply2 = multiply.curry()(2)
     *
     *      Function.compose(multiply2( add(5,6) )) == multiply2( add(5,6) )
     *
     *
     * @class Function
     */

    var SLICE = Array.prototype.slice

    var composeTwo = function(f, g) {
            return function () {
                return f(g.apply(this, arguments))
            }
        },

        curry = function(fn, n){
            if (typeof n !== 'number'){
                n = fn.length
            }

            function getCurryClosure(prevArgs){

                function curryClosure() {

                    var len  = arguments.length,
                        args = [].concat(prevArgs)

                    if (len){
                        args.push.apply(args, arguments)
                    }

                    if (args.length < n){
                        return getCurryClosure(args)
                    }

                    return fn.apply(this, args)
                }

                return curryClosure
            }

            return getCurryClosure([])
        },

        find = curry(function(fn, target){
            if (typeof target.find == 'function'){
                return target.find(fn)
            }

            if (Array.isArray(target)){
                var i   = 0
                var len = target.length
                var it

                for(; i < len; i++){
                    it = target[i]
                    if (fn(it, i, target)){
                        return it
                    }
                }

                return
            }

            if (typeof target == 'object'){
                var keys = Object.keys(target)
                var i = 0
                var len = keys.length
                var k
                var it

                for( ; i < len; i++){
                    k  = keys[i]
                    it = target[k]

                    if (fn(it, k, target)){
                        return it
                    }
                }
            }
        }),

        bindFunctionsOf = function(obj) {
            Object.keys(obj).forEach(function(k){
                if (typeof obj[k] == 'function'){
                    obj[k] = obj[k].bind(obj)
                }
            })

            return obj
        },

        /*
         * @param {Function...} an enumeration of functions, each consuming the result of the following function.
         *
         * For example: compose(c, b, a)(1,4) == c(b(a(1,4)))
         *
         * @return the result of the first function in the enumeration
         */
        compose = function(){

            var args = arguments
            var len  = args.length
            var i    = 0
            var f    = args[0]

            while (++i < len) {
                f = composeTwo(f, args[i])
            }

            return f
        },

        chain = function(where, fn, secondFn){
            var fns = [
                where === 'before'? secondFn: fn,
                where !== 'before'? secondFn: fn
            ]

            return function(){
                if (where === 'before'){
                    secondFn.apply(this, arguments)
                }

                var result = fn.apply(this, arguments)

                if (where !== 'before'){
                    secondFn.apply(this, arguments)
                }

                return result
            }
        },

        forward = function(fn, scope){
            return fn.bind?
                       fn.bind(scope):
                       function(){
                            return fn.apply(scope, arguments)
                       }
        },

        once = function(fn, scope){
            var called = false,
                result

            return function(){
                if (called){
                    return result
                }

                called = true

                return result = fn.call(scope || this)
            }
        },

        bindArgsArray = function(fn, args){
            return function(){
                var thisArgs = SLICE.call(args || [])

                if (arguments.length){
                    thisArgs.push.apply(thisArgs, arguments)
                }

                return fn.apply(this, thisArgs)
            }
        },

        bindArgs = function(fn){
            return bindArgsArray(fn, SLICE.call(arguments,1))
        },

        lock = function(fn, scope){
            var args = SLICE.call(arguments, 2)

            return function(){
                return fn.apply(scope, args)
            }
        },

        lockArgsArray = function(fn, args){

            return function(){
                if (!Array.isArray(args)){
                    args = SLICE.call(args || [])
                }

                return fn.apply(this, args)
            }
        },

        lockArgs = function(fn){
            return lockArgsArray(fn, SLICE.call(arguments, 1) )
        },

        skipArgs = function(fn, count){
            return function(){
                var args = SLICE.call(arguments, count || 0)

                return fn.apply(this, args)
            }
        },

        intercept = function(interceptedFn, interceptingFn, withStopArg){

            return function(){
                var args    = [].from(arguments),
                    stopArg = { stop: false }

                if (withStopArg){
                    args.push(stopArg)
                }

                var result = interceptingFn.apply(this, args)

                if (withStopArg){
                    if (stopArg.stop === true){
                        return result
                    }

                } else {
                    if (result === false){
                        return result
                    }
                }

                //the interception was not stopped
                return interceptedFn.apply(this, arguments)
            }

        },

        delay = function(fn, delay, scope){

            var delayIsNumber = delay * 1 == delay

            if (arguments.length == 2 && !delayIsNumber){
                scope = delay
                delay = 0
            } else {
                if (!delayIsNumber){
                    delay = 0
                }
            }

            return function(){
                var self = scope || this,
                    args = arguments

                if (delay < 0){
                    fn.apply(self, args)
                    return
                }

                if (delay || !setImmediate){
                    setTimeout(function(){
                        fn.apply(self, args)
                    }, delay)

                } else {
                    setImmediate(function(){
                        fn.apply(self, args)
                    })
                }
            }
        },

        defer = function(fn, scope){
            return delay(fn, 0, scope)
        },

        buffer = function(fn, delay, scope){

            var timeoutId = -1

            return function(){

                var self = scope || this,
                    args = arguments

                if (delay < 0){
                    fn.apply(self, args)
                    return
                }

                var withTimeout = delay || !setImmediate,
                    clearFn = withTimeout?
                                clearTimeout:
                                clearImmediate,
                    setFn   = withTimeout?
                                setTimeout:
                                setImmediate

                if (timeoutId !== -1){
                    clearFn(timeoutId)
                }

                timeoutId = setFn(function(){
                    fn.apply(self, args)
                    self = null
                }, delay)

            }

        },

        throttle = function(fn, delay, scope) {
            var timeoutId = -1,
                self,
                args

            return function () {

                self = scope || this
                args = arguments

                if (timeoutId !== -1) {
                    //the function was called once again in the delay interval
                } else {
                    timeoutId = setTimeout(function () {
                        fn.apply(self, args)

                        self = null
                        timeoutId = -1
                    }, delay)
                }

            }

        },

        maxArgs = function(fn, count){
            return function(){
                return fn.apply(this, SLICE.call(arguments, 0, count))
            }
        },

        spread = function(fn, delay, scope){

            var timeoutId       = -1
            var callCount       = 0
            var executeCount    = 0
            var nextArgs        = {}
            var increaseCounter = true
            var resultingFnUnbound
            var resultingFn

            resultingFn = resultingFnUnbound = function(){

                var args = arguments,
                    self = scope || this

                if (increaseCounter){
                    nextArgs[callCount++] = {args: args, scope: self}
                }

                if (timeoutId !== -1){
                    //the function was called once again in the delay interval
                } else {
                    timeoutId = setTimeout(function(){
                        fn.apply(self, args)

                        timeoutId = -1
                        executeCount++

                        if (callCount !== executeCount){
                            resultingFn = bindArgsArray(resultingFnUnbound, nextArgs[executeCount].args).bind(nextArgs[executeCount].scope)
                            delete nextArgs[executeCount]

                            increaseCounter = false
                            resultingFn.apply(self)
                            increaseCounter = true
                        } else {
                            nextArgs = {}
                        }
                    }, delay)
                }

            }

            return resultingFn
        },

        /*
         * @param {Array} args the array for which to create a cache key
         * @param {Number} [cacheParamNumber] the number of args to use for the cache key. Use this to limit the args that area actually used for the cache key
         */
        getCacheKey = function(args, cacheParamNumber){
            if (cacheParamNumber == null){
                cacheParamNumber = -1
            }

            var i        = 0,
                len      = Math.min(args.length, cacheParamNumber),
                cacheKey = [],
                it

            for ( ; i < len; i++){
                it = args[i]

                if (root.check.isPlainObject(it) || Array.isArray(it)){
                    cacheKey.push(JSON.stringify(it))
                } else {
                    cacheKey.push(String(it))
                }
            }

            return cacheKey.join(', ')
        },

        /*
         * @param {Function} fn - the function to cache results for
         * @param {Number} skipCacheParamNumber - the index of the boolean parameter that makes this function skip the caching and
         * actually return computed results.
         * @param {Function|String} cacheBucketMethod - a function or the name of a method on this object which makes caching distributed across multiple buckets.
         * If given, cached results will be searched into the cache corresponding to this bucket. If no result found, return computed result.
         *
         * For example this param is very useful when a function from a prototype is cached,
         * but we want to return the same cached results only for one object that inherits that proto, not for all objects. Thus, for example for Wes.Element,
         * we use the 'getId' cacheBucketMethod to indicate cached results for one object only.
         * @param {Function} [cacheKeyBuilder] A function to be used to compose the cache key
         *
         * @return {Function} a new function, which returns results from cache, if they are available, otherwise uses the given fn to compute the results.
         * This returned function has a 'clearCache' function attached, which clears the caching. If a parameter ( a bucket id) is  provided,
         * only clears the cache in the specified cache bucket.
         */
        cache = function(fn, config){
            config = config || {}

            var bucketCache = {},
                cache       = {},
                skipCacheParamNumber = config.skipCacheIndex,
                cacheBucketMethod    = config.cacheBucket,
                cacheKeyBuilder      = config.cacheKey,
                cacheArgsLength      = skipCacheParamNumber == null?
                                            fn.length:
                                            skipCacheParamNumber,
                cachingFn

            cachingFn = function(){
                var result,
                    skipCache = skipCacheParamNumber != null?
                                                arguments[skipCacheParamNumber] === true:
                                                false,
                    args = skipCache?
                                    SLICE.call(arguments, 0, cacheArgsLength):
                                    SLICE.call(arguments),

                    cacheBucketId = cacheBucketMethod != null?
                                        typeof cacheBucketMethod == 'function'?
                                            cacheBucketMethod():
                                            typeof this[cacheBucketMethod] == 'function'?
                                                this[cacheBucketMethod]():
                                                null
                                        :
                                        null,


                    cacheObject = cacheBucketId?
                                        bucketCache[cacheBucketId]:
                                        cache,

                    cacheKey = (cacheKeyBuilder || getCacheKey)(args, cacheArgsLength)

                if (cacheBucketId && !cacheObject){
                    cacheObject = bucketCache[cacheBucketId] = {}
                }

                if (skipCache || cacheObject[cacheKey] == null){
                    cacheObject[cacheKey] = result = fn.apply(this, args)
                } else {
                    result = cacheObject[cacheKey]
                }

                return result
            }

            /*
             * @param {String|Object|Number} [bucketId] the bucket for which to clear the cache. If none given, clears all the cache for this function.
             */
            cachingFn.clearCache = function(bucketId){
                if (bucketId){
                    delete bucketCache[String(bucketId)]
                } else {
                    cache = {}
                    bucketCache = {}
                }
            }

            /*
             *
             * @param {Array} cacheArgs The array of objects from which to create the cache key
             * @param {Number} [cacheParamNumber] A limit for the cache args that are actually used to compute the cache key.
             * @param {Function} [cacheKeyBuilder] The function to be used to compute the cache key from the given cacheArgs and cacheParamNumber
             */
            cachingFn.getCache = function(cacheArgs, cacheParamNumber, cacheKeyBuilder){
                return cachingFn.getBucketCache(null, cacheArgs, cacheParamNumber, cacheKeyBuilder)
            }

            /*
             *
             * @param {String} bucketId The id of the cache bucket from which to retrieve the cached value
             * @param {Array} cacheArgs The array of objects from which to create the cache key
             * @param {Number} [cacheParamNumber] A limit for the cache args that are actually used to compute the cache key.
             * @param {Function} [cacheKeyBuilder] The function to be used to compute the cache key from the given cacheArgs and cacheParamNumber
             */
            cachingFn.getBucketCache = function(bucketId, cacheArgs, cacheParamNumber, cacheKeyBuilder){
                var cacheObject = cache,
                    cacheKey = (cacheKeyBuilder || getCacheKey)(cacheArgs, cacheParamNumber)

                if (bucketId){
                    bucketId = String(bucketId);

                    cacheObject = bucketCache[bucketId] = bucketCache[bucketId] || {}
                }

                return cacheObject[cacheKey]
            }

            /*
             *
             * @param {Object} value The value to set in the cache
             * @param {Array} cacheArgs The array of objects from which to create the cache key
             * @param {Number} [cacheParamNumber] A limit for the cache args that are actually used to compute the cache key.
             * @param {Function} [cacheKeyBuilder] The function to be used to compute the cache key from the given cacheArgs and cacheParamNumber
             */
            cachingFn.setCache = function(value, cacheArgs, cacheParamNumber, cacheKeyBuilder){
                return cachingFn.setBucketCache(null, value, cacheArgs, cacheParamNumber, cacheKeyBuilder)
            }

            /*
             *
             * @param {String} bucketId The id of the cache bucket for which to set the cache value
             * @param {Object} value The value to set in the cache
             * @param {Array} cacheArgs The array of objects from which to create the cache key
             * @param {Number} [cacheParamNumber] A limit for the cache args that are actually used to compute the cache key.
             * @param {Function} [cacheKeyBuilder] The function to be used to compute the cache key from the given cacheArgs and cacheParamNumber
             */
            cachingFn.setBucketCache = function(bucketId, value, cacheArgs, cacheParamNumber, cacheKeyBuilder){

                var cacheObject = cache,
                    cacheKey = (cacheKeyBuilder || getCacheKey)(cacheArgs, cacheParamNumber)

                if (bucketId){
                    bucketId = String(bucketId)

                    cacheObject = bucketCache[bucketId] = bucketCache[bucketId] || {};
                }

                return cacheObject[cacheKey] = value
            }

            return cachingFn
        }

module.exports = {

    map: curry(function(fn, value){
        return value != undefined && typeof value.map?
                value.map(fn):
                fn(value)
    }),

    dot: curry(function(prop, value){
        return value != undefined? value[prop]: undefined
    }),

    maxArgs: curry(maxArgs),

    /**
     * @method compose
     *
     * Example:
     *
     *      zippy.Function.compose(c, b, a)
     *
     * See {@link Function#compose}
     */
    compose: compose,

    /**
     * See {@link Function#self}
     */
    self: function(fn){
        return fn
    },

    /**
     * See {@link Function#buffer}
     */
    buffer: buffer,

    /**
     * See {@link Function#delay}
     */
    delay: delay,

    /**
     * See {@link Function#defer}
     * @param {Function} fn
     * @param {Object} scope
     */
    defer:defer,

    /**
     * See {@link Function#skipArgs}
     * @param {Function} fn
     * @param {Number} [count=0] how many args to skip when calling the resulting function
     * @return {Function} The function that will call the original fn without the first count args.
     */
    skipArgs: skipArgs,

    /**
     * See {@link Function#intercept}
     */
    intercept: function(fn, interceptedFn, withStopArgs){
        return intercept(interceptedFn, fn, withStopArgs)
    },

    /**
     * See {@link Function#throttle}
     */
    throttle: throttle,

    /**
     * See {@link Function#spread}
     */
    spread: spread,

    /**
     * See {@link Function#chain}
     */
    chain: function(fn, where, mainFn){
        return chain(where, mainFn, fn)
    },

    /**
     * See {@link Function#before}
     */
    before: function(fn, otherFn){
        return chain('before', otherFn, fn)
    },

    /**
     * See {@link Function#after}
     */
    after: function(fn, otherFn){
        return chain('after', otherFn, fn)
    },

    /**
     * See {@link Function#curry}
     */
    curry: curry,

    /**
     * See {@link Function#forward}
     */
    forward: forward,

    /**
     * See {@link Function#once}
     */
    once: once,

    /**
     * See {@link Function#bindArgs}
     */
    bindArgs: function(fn){
        return bindArgsArray(fn, SLICE.call(arguments, 1))
    },

    /**
     * See {@link Function#bindArgsArray}
     */
    bindArgsArray: bindArgsArray,

    /**
     * See {@link Function#lockArgs}
     */
    lockArgs: function(fn){
        return lockArgsArray(fn, SLICE.call(arguments, 1))
    },

    /**
     * See {@link Function#lockArgsArray}
     */
    lockArgsArray: lockArgsArray,

    bindFunctionsOf: bindFunctionsOf,

    find: find
}
},{}],20:[function(require,module,exports){
module.exports=require(3)
},{"./src":27}],21:[function(require,module,exports){
module.exports=require(4)
},{}],22:[function(require,module,exports){
module.exports=require(5)
},{}],23:[function(require,module,exports){
module.exports=require(6)
},{}],24:[function(require,module,exports){
module.exports=require(7)
},{}],25:[function(require,module,exports){
module.exports=require(8)
},{"./number":29}],26:[function(require,module,exports){
module.exports=require(9)
},{}],27:[function(require,module,exports){
module.exports=require(10)
},{"./arguments":21,"./array":22,"./boolean":23,"./date":24,"./float":25,"./function":26,"./int":28,"./number":29,"./numeric":30,"./object":31,"./regexp":32,"./string":33}],28:[function(require,module,exports){
module.exports=require(11)
},{"./number":29}],29:[function(require,module,exports){
module.exports=require(12)
},{}],30:[function(require,module,exports){
module.exports=require(13)
},{}],31:[function(require,module,exports){
module.exports=require(14)
},{}],32:[function(require,module,exports){
module.exports=require(15)
},{}],33:[function(require,module,exports){
module.exports=require(16)
},{}],34:[function(require,module,exports){
module.exports = require('./lib/isemail');

},{"./lib/isemail":35}],35:[function(require,module,exports){
(function (process){
/**
 * To validate an email address according to RFCs 5321, 5322 and others
 *
 * Copyright © 2008-2011, Dominic Sayers
 * Test schema documentation Copyright © 2011, Daniel Marschall
 * Port for Node.js Copyright © 2013, GlobeSherpa
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   - Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *   - Neither the name of Dominic Sayers nor the names of its contributors may
 *     be used to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * @author      Dominic Sayers <dominic@sayers.cc>
 * @author      Eli Skeggs <eskeggs@globesherpa.com>
 * @copyright   2008-2011 Dominic Sayers
 * @copyright   2013-2014 GlobeSherpa
 * @license     http://www.opensource.org/licenses/bsd-license.php BSD License
 * @link        http://www.dominicsayers.com/isemail
 * @link        https://github.com/globesherpa/isemail
 * @version     1.1.1 - Optimization pass, simplify constants, style, dead code.
 */

// lazy-loaded
var dns, HAS_REQUIRE = typeof require !== 'undefined';

// categories
var ISEMAIL_VALID_CATEGORY = 1;
var ISEMAIL_DNSWARN = 7;
var ISEMAIL_RFC5321 = 15;
var ISEMAIL_CFWS = 31;
var ISEMAIL_DEPREC = 63;
var ISEMAIL_RFC5322 = 127;
var ISEMAIL_ERR = 255;

// diagnoses
// address is valid
var ISEMAIL_VALID = 0;
// address is valid but a DNS check was not successful
var ISEMAIL_DNSWARN_NO_MX_RECORD = 5;
var ISEMAIL_DNSWARN_NO_RECORD = 6;
// address is valid for SMTP but has unusual elements
var ISEMAIL_RFC5321_TLD = 9;
var ISEMAIL_RFC5321_TLDNUMERIC = 10;
var ISEMAIL_RFC5321_QUOTEDSTRING = 11;
var ISEMAIL_RFC5321_ADDRESSLITERAL = 12;
var ISEMAIL_RFC5321_IPV6DEPRECATED = 13;
// address is valid within the message but cannot be used unmodified for the
// envelope
var ISEMAIL_CFWS_COMMENT = 17;
var ISEMAIL_CFWS_FWS = 18;
// address contains deprecated elements but may still be valid in restricted
// contexts
var ISEMAIL_DEPREC_LOCALPART = 33;
var ISEMAIL_DEPREC_FWS = 34;
var ISEMAIL_DEPREC_QTEXT = 35;
var ISEMAIL_DEPREC_QP = 36;
var ISEMAIL_DEPREC_COMMENT = 37;
var ISEMAIL_DEPREC_CTEXT = 38;
var ISEMAIL_DEPREC_CFWS_NEAR_AT = 49;
// the address is only valid according to the broad definition of RFC 5322, but
// otherwise invalid
var ISEMAIL_RFC5322_DOMAIN = 65;
var ISEMAIL_RFC5322_TOOLONG = 66;
var ISEMAIL_RFC5322_LOCAL_TOOLONG = 67;
var ISEMAIL_RFC5322_DOMAIN_TOOLONG = 68;
var ISEMAIL_RFC5322_LABEL_TOOLONG = 69;
var ISEMAIL_RFC5322_DOMAINLITERAL = 70;
var ISEMAIL_RFC5322_DOMLIT_OBSDTEXT = 71;
var ISEMAIL_RFC5322_IPV6_GRPCOUNT = 72;
var ISEMAIL_RFC5322_IPV6_2X2XCOLON = 73;
var ISEMAIL_RFC5322_IPV6_BADCHAR = 74;
var ISEMAIL_RFC5322_IPV6_MAXGRPS = 75;
var ISEMAIL_RFC5322_IPV6_COLONSTRT = 76;
var ISEMAIL_RFC5322_IPV6_COLONEND = 77;
// address is invalid for any purpose
var ISEMAIL_ERR_EXPECTING_DTEXT = 129;
var ISEMAIL_ERR_NOLOCALPART = 130;
var ISEMAIL_ERR_NODOMAIN = 131;
var ISEMAIL_ERR_CONSECUTIVEDOTS = 132;
var ISEMAIL_ERR_ATEXT_AFTER_CFWS = 133;
var ISEMAIL_ERR_ATEXT_AFTER_QS = 134;
var ISEMAIL_ERR_ATEXT_AFTER_DOMLIT = 135;
var ISEMAIL_ERR_EXPECTING_QPAIR = 136;
var ISEMAIL_ERR_EXPECTING_ATEXT = 137;
var ISEMAIL_ERR_EXPECTING_QTEXT = 138;
var ISEMAIL_ERR_EXPECTING_CTEXT = 139;
var ISEMAIL_ERR_BACKSLASHEND = 140;
var ISEMAIL_ERR_DOT_START = 141;
var ISEMAIL_ERR_DOT_END = 142;
var ISEMAIL_ERR_DOMAINHYPHENSTART = 143;
var ISEMAIL_ERR_DOMAINHYPHENEND = 144;
var ISEMAIL_ERR_UNCLOSEDQUOTEDSTR = 145;
var ISEMAIL_ERR_UNCLOSEDCOMMENT = 146;
var ISEMAIL_ERR_UNCLOSEDDOMLIT = 147;
var ISEMAIL_ERR_FWS_CRLF_X2 = 148;
var ISEMAIL_ERR_FWS_CRLF_END = 149;
var ISEMAIL_ERR_CR_NO_LF = 150;
var ISEMAIL_ERR_UNKNOWN_TLD = 160;
var ISEMAIL_ERR_TOOSHORT_DOMAIN = 161;

// function control
var THRESHOLD = 16;
// email parts
var COMPONENT_LOCALPART = 0;
var COMPONENT_DOMAIN = 1;
var COMPONENT_LITERAL = 2;
var CONTEXT_COMMENT = 3;
var CONTEXT_FWS = 4;
var CONTEXT_QUOTEDSTRING = 5;
var CONTEXT_QUOTEDPAIR = 6;

// US-ASCII visible characters not valid for atext
// (http://tools.ietf.org/html/rfc5322#section-3.2.3)
var SPECIALS = '()<>[]:;@\\,."';

function optimizeLookup(string) {
  var body = '', min = 0x100, max = 0, lookup = new Array(min);
  for (var i = min - 1; i >= 0; i--) {
    lookup[i] = false;
  }
  for (var i = 0; i < string.length; i++) {
    var chr = string.charCodeAt(i);
    if (chr < min) {
      min = chr;
    }
    if (chr > max) {
      max = chr;
    }
    lookup[chr] = true;
  }
  lookup.length = max;
  var body = 'var lookup = ' + JSON.stringify(lookup) + ';\n';
  body += 'return function(code) {\n';
  body += '  if (code < ' + min + ' || code > ' + max + ') {\n';
  body += '    return false;\n';
  body += '  }\n';
  body += '  return lookup[code];\n';
  body += '}';
  return (new Function(body))();
}

var specialsLookup = optimizeLookup(SPECIALS);

// matches valid IPv4 addresses from the end of a string
var IPv4_REGEX =
  /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
var IPv6_REGEX = /^[a-fA-F\d]{0,4}$/;
var IPv6_REGEX_TEST = IPv6_REGEX.test.bind(IPv6_REGEX);

var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Get the largest number in the array.
 *
 * Returns -Infinity if the array is empty.
 *
 * @param {Array.<number>} array The array to scan.
 * @return {number} The largest number contained.
 */
function maxValue(array) {
  var v = -Infinity, i = 0, n = array.length;

  for (; i < n; i++) {
    if (array[i] > v) {
      v = array[i];
    }
  }

  return v;
}

/**
 * Check that an email address conforms to RFCs 5321, 5322 and others
 *
 * As of Version 3.0, we are now distinguishing clearly between a Mailbox
 * as defined by RFC 5321 and an addr-spec as defined by RFC 5322. Depending
 * on the context, either can be regarded as a valid email address. The
 * RFC 5321 Mailbox specification is more restrictive (comments, white space
 * and obsolete forms are not allowed).
 *
 * @param {string} email The email address to check.
 * @param {boolean} checkDNS If true then will check DNS for MX records. If true
 *   this isEmail _will_ be asynchronous.
 * @param {*} errorLevel Determines the boundary between valid and invalid
 *   addresses. Status codes above this number will be returned as-is, status
 *   codes below will be returned as ISEMAIL_VALID. Thus the calling program can
 *   simply look for ISEMAIL_VALID if it is only interested in whether an
 *   address is valid or not. The errorLevel will determine how "picky"
 *   isEmail() is about the address. If omitted or passed as false then
 *   isEmail() will return true or false rather than an integer error or
 *   warning. NB Note the difference between errorLevel = false and
 *   errorLevel = 0.
 * @return {*}
 */
function isEmail(email, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options || (options = {});

  var threshold, diagnose;
  if (typeof options.errorLevel === 'number') {
    diagnose = true;
    threshold = options.errorLevel;
  } else {
    diagnose = !!options.errorLevel;
    threshold = ISEMAIL_VALID;
  }

  if (options.tldWhitelist && typeof options.tldWhitelist !== 'object') {
    throw new TypeError('expected array or object tldWhitelist');
  }

  if (options.minDomainAtoms && (options.minDomainAtoms !==
      ((+options.minDomainAtoms) | 0) || options.minDomainAtoms < 0)) {
    throw new TypeError('expected positive integer minDomainAtoms');
  }

  var maxResult = ISEMAIL_VALID;

  function updateResult(value) {
    if (value > maxResult) {
      maxResult = value;
    }
  }

  var context = {
    now: COMPONENT_LOCALPART,
    prev: COMPONENT_LOCALPART,
    stack: [COMPONENT_LOCALPART]
  };

  var token = '', prevToken = '', charCode = 0;
  var parseData = {local: '', domain: ''};
  var atomList = {local: [''], domain: ['']};

  var elementCount = 0, elementLength = 0, crlfCount = 0;
  var hyphenFlag = false, assertEnd = false;

  for (var i = 0; i < email.length; i++) {
    token = email[i];

    switch (context.now) {
    // local-part
    case COMPONENT_LOCALPART:
      // http://tools.ietf.org/html/rfc5322#section-3.4.1
      //   local-part      =   dot-atom / quoted-string / obs-local-part
      //
      //   dot-atom        =   [CFWS] dot-atom-text [CFWS]
      //
      //   dot-atom-text   =   1*atext *("." 1*atext)
      //
      //   quoted-string   =   [CFWS]
      //                       DQUOTE *([FWS] qcontent) [FWS] DQUOTE
      //                       [CFWS]
      //
      //   obs-local-part  =   word *("." word)
      //
      //   word            =   atom / quoted-string
      //
      //   atom            =   [CFWS] 1*atext [CFWS]
      switch (token) {
      // comment
      case '(':
        if (elementLength === 0) {
          // comments are OK at the beginning of an element
          updateResult(elementCount === 0 ? ISEMAIL_CFWS_COMMENT :
            ISEMAIL_DEPREC_COMMENT);
        } else {
          updateResult(ISEMAIL_CFWS_COMMENT);
           // can't start a comment in an element, should be end
          assertEnd = true;
        }
        context.stack.push(context.now);
        context.now = CONTEXT_COMMENT;
        break;
      // next dot-atom element
      case '.':
        if (elementLength === 0) {
          // another dot, already?
          updateResult(elementCount === 0 ? ISEMAIL_ERR_DOT_START :
            ISEMAIL_ERR_CONSECUTIVEDOTS);
        } else {
          // the entire local-part can be a quoted string for RFC 5321
          // if it's just one atom that is quoted then it's an RFC 5322 obsolete
          // form
          if (assertEnd) {
            updateResult(ISEMAIL_DEPREC_LOCALPART);
          }

          // CFWS & quoted strings are OK again now we're at the beginning of an
          // element (although they are obsolete forms)
          assertEnd = false;
          elementLength = 0;
          elementCount++;
          parseData.local += token;
          atomList.local[elementCount] = ''; // TODO: push?
        }
        break;
      // quoted string
      case '"':
        if (elementLength === 0) {
          // the entire local-part can be a quoted string for RFC 5321
          // if it's just one atom that is quoted then it's an RFC 5322 obsolete
          // form
          updateResult(elementCount === 0 ? ISEMAIL_RFC5321_QUOTEDSTRING :
            ISEMAIL_DEPREC_LOCALPART);

          parseData.local += token;
          atomList.local[elementCount] += token;
          elementLength++;
          assertEnd = true; // quoted string must be the entire element
          context.stack.push(context.now);
          context.now = CONTEXT_QUOTEDSTRING;
        } else {
          updateResult(ISEMAIL_ERR_EXPECTING_ATEXT);
        }
        break;
      // folding white space
      case '\r':
        if ((++i === email.length) || email[i] !== '\n') {
          // fatal error
          updateResult(ISEMAIL_ERR_CR_NO_LF);
          break;
        }
      case ' ':
      case '\t':
        if (elementLength === 0) {
          updateResult(elementCount === 0 ? ISEMAIL_CFWS_FWS :
            ISEMAIL_DEPREC_FWS);
        } else {
          // we can't start FWS in the middle of an element, better be end
          assertEnd = true;
        }

        context.stack.push(context.now);
        context.now = CONTEXT_FWS;
        prevToken = token;
        break;
      // @
      case '@':
        // at this point we should have a valid local-part
        /* istanbul ignore next: logically unreachable */
        if (context.stack.length !== 1) {
          throw new Error('unexpected item on context stack');
        }

        if (parseData.local.length === 0) {
          // fatal error
          updateResult(ISEMAIL_ERR_NOLOCALPART);
        } else if (elementLength === 0) {
          // fatal error
          updateResult(ISEMAIL_ERR_DOT_END);
        // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.1
        //   the maximum total length of a user name or other local-part is 64
        //   octets
        } else if (parseData.local.length > 64) {
          updateResult(ISEMAIL_RFC5322_LOCAL_TOOLONG);
        // http://tools.ietf.org/html/rfc5322#section-3.4.1
        //   comments and folding white space
        //   SHOULD NOT be used around the "@" in the addr-spec
        //
        // http://tools.ietf.org/html/rfc2119
        // 4. SHOULD NOT  this phrase, or the phrase "NOT RECOMMENDED" mean that
        //    there may exist valid reasons in particular circumstances when the
        //    particular behavior is acceptable or even useful, but the full
        //    implications should be understood and the case carefully weighed
        //    before implementing any behavior described with this label
        } else if ((context.prev === CONTEXT_COMMENT) ||
            (context.prev === CONTEXT_FWS)) {
          updateResult(ISEMAIL_DEPREC_CFWS_NEAR_AT);
        }

        // clear everything down for the domain parsing
        context.now = COMPONENT_DOMAIN; // where we are
        context.stack[0] = COMPONENT_DOMAIN; // where we have been
        elementCount = 0;
        elementLength = 0;
        assertEnd = false; // CFWS can only appear at the end of the element
        break;
      // atext
      default:
        // http://tools.ietf.org/html/rfc5322#section-3.2.3
        //    atext = ALPHA / DIGIT / ; Printable US-ASCII
        //            "!" / "#" /     ;  characters not including
        //            "$" / "%" /     ;  specials.  Used for atoms.
        //            "&" / "'" /
        //            "*" / "+" /
        //            "-" / "/" /
        //            "=" / "?" /
        //            "^" / "_" /
        //            "`" / "{" /
        //            "|" / "}" /
        //            "~"
        if (assertEnd) {
          // we have encountered atext where it is no longer valid
          switch (context.prev) {
          case CONTEXT_COMMENT:
          case CONTEXT_FWS:
            updateResult(ISEMAIL_ERR_ATEXT_AFTER_CFWS);
            break;
          case CONTEXT_QUOTEDSTRING:
            updateResult(ISEMAIL_ERR_ATEXT_AFTER_QS);
            break;
          /* istanbul ignore next: logically unreachable */
          default:
            throw new Error('more atext found where none is allowed, ' +
              'but unrecognized prev context: ' + context.prev);
          }
        } else {
          context.prev = context.now;
          charCode = token.charCodeAt(0);

          if (charCode < 33 || charCode > 126 || charCode === 10 ||
              specialsLookup(charCode)) {
            // fatal error
            updateResult(ISEMAIL_ERR_EXPECTING_ATEXT);
          }

          parseData.local += token;
          atomList.local[elementCount] += token;
          elementLength++;
        }
      }
      break;
    case COMPONENT_DOMAIN:
      // http://tools.ietf.org/html/rfc5322#section-3.4.1
      //   domain          =   dot-atom / domain-literal / obs-domain
      //
      //   dot-atom        =   [CFWS] dot-atom-text [CFWS]
      //
      //   dot-atom-text   =   1*atext *("." 1*atext)
      //
      //   domain-literal  =   [CFWS] "[" *([FWS] dtext) [FWS] "]" [CFWS]
      //
      //   dtext           =   %d33-90 /          ; Printable US-ASCII
      //                       %d94-126 /         ;  characters not including
      //                       obs-dtext          ;  "[", "]", or "\"
      //
      //   obs-domain      =   atom *("." atom)
      //
      //   atom            =   [CFWS] 1*atext [CFWS]

      // http://tools.ietf.org/html/rfc5321#section-4.1.2
      //   Mailbox        = Local-part "@" ( Domain / address-literal )
      //
      //   Domain         = sub-domain *("." sub-domain)
      //
      //   address-literal  = "[" ( IPv4-address-literal /
      //                    IPv6-address-literal /
      //                    General-address-literal ) "]"
      //                    ; See Section 4.1.3

      // http://tools.ietf.org/html/rfc5322#section-3.4.1
      //      Note: A liberal syntax for the domain portion of addr-spec is
      //      given here.  However, the domain portion contains addressing
      //      information specified by and used in other protocols (e.g.,
      //      [RFC1034], [RFC1035], [RFC1123], [RFC5321]).  It is therefore
      //      incumbent upon implementations to conform to the syntax of
      //      addresses for the context in which they are used.
      // is_email() author's note: it's not clear how to interpret this in
      // the context of a general email address validator. The conclusion I
      // have reached is this: "addressing information" must comply with
      // RFC 5321 (and in turn RFC 1035), anything that is "semantically
      // invisible" must comply only with RFC 5322.
      switch (token) {
      // comment
      case '(':
        if (elementLength === 0) {
          // comments at the start of the domain are deprecated in the text
          // comments at the start of a subdomain are obs-domain
          // (http://tools.ietf.org/html/rfc5322#section-3.4.1)
          updateResult(elementCount === 0 ? ISEMAIL_DEPREC_CFWS_NEAR_AT :
            ISEMAIL_DEPREC_COMMENT);
        } else {
          updateResult(ISEMAIL_CFWS_COMMENT);
          assertEnd = true; // can't start a comment mid-element, better be end
        }

        context.stack.push(context.now);
        context.now = CONTEXT_COMMENT;
        break;
      // next dot-atom element
      case '.':
        if (elementLength === 0) {
          // another dot, already? fatal error
          updateResult(elementCount === 0 ? ISEMAIL_ERR_DOT_START :
            ISEMAIL_ERR_CONSECUTIVEDOTS);
        } else if (hyphenFlag) {
          // previous subdomain ended in a hyphen
          updateResult(ISEMAIL_ERR_DOMAINHYPHENEND); // fatal error
        } else if (elementLength > 63) {
          // Nowhere in RFC 5321 does it say explicitly that the
          // domain part of a Mailbox must be a valid domain according
          // to the DNS standards set out in RFC 1035, but this *is*
          // implied in several places. For instance, wherever the idea
          // of host routing is discussed the RFC says that the domain
          // must be looked up in the DNS. This would be nonsense unless
          // the domain was designed to be a valid DNS domain. Hence we
          // must conclude that the RFC 1035 restriction on label length
          // also applies to RFC 5321 domains.
          //
          // http://tools.ietf.org/html/rfc1035#section-2.3.4
          // labels          63 octets or less

          updateResult(ISEMAIL_RFC5322_LABEL_TOOLONG);
        }

        // CFWS is OK again now we're at the beginning of an element (although
        // it may be obsolete CFWS)
        assertEnd = false;
        elementLength = 0;
        elementCount++;
        atomList.domain[elementCount] = '';
        parseData.domain += token;

        break;
      // domain literal
      case '[':
        if (parseData.domain.length === 0) {
          // domain literal must be the only component
          assertEnd = true;
          elementLength++;
          context.stack.push(context.now);
          context.now = COMPONENT_LITERAL;
          parseData.domain += token;
          atomList.domain[elementCount] += token;
          parseData.literal = '';
        } else {
          // fatal error
          updateResult(ISEMAIL_ERR_EXPECTING_ATEXT);
        }
        break;
      // folding white space
      case '\r':
        if ((++i === email.length) || email[i] !== '\n') {
          // fatal error
          updateResult(ISEMAIL_ERR_CR_NO_LF);
          break;
        }
      case ' ':
      case '\t':
        if (elementLength === 0) {
          updateResult(elementCount === 0 ? ISEMAIL_DEPREC_CFWS_NEAR_AT :
            ISEMAIL_DEPREC_FWS);
        } else {
          // we can't start FWS in the middle of an element, so this better be
          // the end
          updateResult(ISEMAIL_CFWS_FWS);
          assertEnd = true;
        }

        context.stack.push(context.now);
        context.now = CONTEXT_FWS;
        prevToken = token;
        break;
      // atext
      default:
        // RFC 5322 allows any atext...
        // http://tools.ietf.org/html/rfc5322#section-3.2.3
        //    atext = ALPHA / DIGIT / ; Printable US-ASCII
        //            "!" / "#" /     ;  characters not including
        //            "$" / "%" /     ;  specials.  Used for atoms.
        //            "&" / "'" /
        //            "*" / "+" /
        //            "-" / "/" /
        //            "=" / "?" /
        //            "^" / "_" /
        //            "`" / "{" /
        //            "|" / "}" /
        //            "~"

        // But RFC 5321 only allows letter-digit-hyphen to comply with DNS rules
        //   (RFCs 1034 & 1123)
        // http://tools.ietf.org/html/rfc5321#section-4.1.2
        //   sub-domain     = Let-dig [Ldh-str]
        //
        //   Let-dig        = ALPHA / DIGIT
        //
        //   Ldh-str        = *( ALPHA / DIGIT / "-" ) Let-dig
        //
        if (assertEnd) {
          // we have encountered atext where it is no longer valid
          switch (context.prev) {
          case CONTEXT_COMMENT:
          case CONTEXT_FWS:
            updateResult(ISEMAIL_ERR_ATEXT_AFTER_CFWS);
            break;
          case COMPONENT_LITERAL:
            updateResult(ISEMAIL_ERR_ATEXT_AFTER_DOMLIT);
            break;
          /* istanbul ignore next: logically unreachable */
          default:
            throw new Error('more atext found where none is allowed, ' +
              'but unrecognized prev context: ' + context.prev);
          }
        }

        charCode = token.charCodeAt(0);
        // assume this token isn't a hyphen unless we discover it is
        hyphenFlag = false;

        if (charCode < 33 || charCode > 126 || specialsLookup(charCode)) {
          // fatal error
          updateResult(ISEMAIL_ERR_EXPECTING_ATEXT);
        } else if (token === '-') {
          if (elementLength === 0) {
            // hyphens can't be at the beginning of a subdomain
            updateResult(ISEMAIL_ERR_DOMAINHYPHENSTART); // fatal error
          }

          hyphenFlag = true;
        } else if (!((charCode > 47 && charCode < 58) ||
                     (charCode > 64 && charCode < 91) ||
                     (charCode > 96 && charCode < 123))) {
          // not an RFC 5321 subdomain, but still OK by RFC 5322
          updateResult(ISEMAIL_RFC5322_DOMAIN);
        }

        parseData.domain += token;
        atomList.domain[elementCount] += token;
        elementLength++;
      }
      break;
    // domain literal
    case COMPONENT_LITERAL:
      // http://tools.ietf.org/html/rfc5322#section-3.4.1
      //   domain-literal  =   [CFWS] "[" *([FWS] dtext) [FWS] "]" [CFWS]
      //
      //   dtext           =   %d33-90 /          ; Printable US-ASCII
      //                       %d94-126 /         ;  characters not including
      //                       obs-dtext          ;  "[", "]", or "\"
      //
      //   obs-dtext       =   obs-NO-WS-CTL / quoted-pair
      switch (token) {
      // end of domain literal
      case ']':
        if (maxResult < ISEMAIL_DEPREC) {
          // Could be a valid RFC 5321 address literal, so let's check

          // http://tools.ietf.org/html/rfc5321#section-4.1.2
          //   address-literal  = "[" ( IPv4-address-literal /
          //                    IPv6-address-literal /
          //                    General-address-literal ) "]"
          //                    ; See Section 4.1.3
          //
          // http://tools.ietf.org/html/rfc5321#section-4.1.3
          //   IPv4-address-literal  = Snum 3("."  Snum)
          //
          //   IPv6-address-literal  = "IPv6:" IPv6-addr
          //
          //   General-address-literal  = Standardized-tag ":" 1*dcontent
          //
          //   Standardized-tag  = Ldh-str
          //                     ; Standardized-tag MUST be specified in a
          //                     ; Standards-Track RFC and registered with IANA
          //
          //   dcontent      = %d33-90 / ; Printable US-ASCII
          //                 %d94-126 ; excl. "[", "\", "]"
          //
          //   Snum          = 1*3DIGIT
          //                 ; representing a decimal integer
          //                 ; value in the range 0 through 255
          //
          //   IPv6-addr     = IPv6-full / IPv6-comp / IPv6v4-full / IPv6v4-comp
          //
          //   IPv6-hex      = 1*4HEXDIG
          //
          //   IPv6-full     = IPv6-hex 7(":" IPv6-hex)
          //
          //   IPv6-comp     = [IPv6-hex *5(":" IPv6-hex)] "::"
          //                 [IPv6-hex *5(":" IPv6-hex)]
          //                 ; The "::" represents at least 2 16-bit groups of
          //                 ; zeros.  No more than 6 groups in addition to the
          //                 ; "::" may be present.
          //
          //   IPv6v4-full   = IPv6-hex 5(":" IPv6-hex) ":" IPv4-address-literal
          //
          //   IPv6v4-comp   = [IPv6-hex *3(":" IPv6-hex)] "::"
          //                 [IPv6-hex *3(":" IPv6-hex) ":"]
          //                 IPv4-address-literal
          //                 ; The "::" represents at least 2 16-bit groups of
          //                 ; zeros.  No more than 4 groups in addition to the
          //                 ; "::" and IPv4-address-literal may be present.
          //
          // is_email() author's note: We can't use ip2long() to validate
          // IPv4 addresses because it accepts abbreviated addresses
          // (xxx.xxx.xxx), expanding the last group to complete the address.
          // filter_var() validates IPv6 address inconsistently (up to PHP 5.3.3
          // at least) -- see http://bugs.php.net/bug.php?id=53236 for example

          // TODO: var here?
          var maxGroups = 8, matchesIP, index = false;
          var addressLiteral = parseData.literal;

          // maybe extract IPv4 part from the end of the address-literal
          if (matchesIP = IPv4_REGEX.exec(addressLiteral)) {
            if ((index = matchesIP.index) !== 0) {
              // convert IPv4 part to IPv6 format for futher testing
              addressLiteral = addressLiteral.slice(0, matchesIP.index) + '0:0';
            }
          }

          if (index === 0) {
            // nothing there except a valid IPv4 address, so...
            updateResult(ISEMAIL_RFC5321_ADDRESSLITERAL);
          } else if (addressLiteral.slice(0, 5).toLowerCase() !== 'ipv6:') {
            updateResult(ISEMAIL_RFC5322_DOMAINLITERAL);
          } else {
            var match = addressLiteral.substr(5);
            matchesIP = match.split(':');
            index = match.indexOf('::');

            if (!~index) {
              // need exactly the right number of groups
              if (matchesIP.length !== maxGroups) {
                updateResult(ISEMAIL_RFC5322_IPV6_GRPCOUNT);
              }
            } else if (index !== match.lastIndexOf('::')) {
              updateResult(ISEMAIL_RFC5322_IPV6_2X2XCOLON);
            } else {
              if (index === 0 || index === match.length - 2) {
                // RFC 4291 allows :: at the start or end of an address with
                // 7 other groups in addition
                maxGroups++;
              }

              if (matchesIP.length > maxGroups) {
                updateResult(ISEMAIL_RFC5322_IPV6_MAXGRPS);
              } else if (matchesIP.length === maxGroups) {
                // eliding a single "::"
                updateResult(ISEMAIL_RFC5321_IPV6DEPRECATED);
              }
            }

            // IPv6 testing strategy
            if (match[0] === ':' && match[1] !== ':') {
              updateResult(ISEMAIL_RFC5322_IPV6_COLONSTRT);
            } else if (match[match.length - 1] === ':' &&
                       match[match.length - 2] !== ':') {
              updateResult(ISEMAIL_RFC5322_IPV6_COLONEND);
            } else if (matchesIP.every(IPv6_REGEX_TEST)) {
              updateResult(ISEMAIL_RFC5321_ADDRESSLITERAL);
            } else {
              updateResult(ISEMAIL_RFC5322_IPV6_BADCHAR);
            }
          }
        } else {
          updateResult(ISEMAIL_RFC5322_DOMAINLITERAL);
        }

        parseData.domain += token;
        atomList.domain[elementCount] += token;
        elementLength++;
        context.prev = context.now;
        context.now = context.stack.pop();
        break;
      case '\\':
        updateResult(ISEMAIL_RFC5322_DOMLIT_OBSDTEXT);
        context.stack.push(context.now);
        context.now = CONTEXT_QUOTEDPAIR;
        break;
      // folding white space
      case '\r':
        if ((++i === email.length) || email[i] !== '\n') {
          // fatal error
          updateResult(ISEMAIL_ERR_CR_NO_LF);
          break;
        }
      case ' ':
      case '\t':
        updateResult(ISEMAIL_CFWS_FWS);

        context.stack.push(context.now);
        context.now = CONTEXT_FWS;
        prevToken = token;
        break;
      // dtext
      default:
        // http://tools.ietf.org/html/rfc5322#section-3.4.1
        //   dtext         =   %d33-90 /  ; Printable US-ASCII
        //                     %d94-126 / ;  characters not including
        //                     obs-dtext  ;  "[", "]", or "\"
        //
        //   obs-dtext     =   obs-NO-WS-CTL / quoted-pair
        //
        //   obs-NO-WS-CTL =   %d1-8 /    ; US-ASCII control
        //                     %d11 /     ;  characters that do not
        //                     %d12 /     ;  include the carriage
        //                     %d14-31 /  ;  return, line feed, and
        //                     %d127      ;  white space characters
        charCode = token.charCodeAt(0);

        // CR, LF, SP & HTAB have already been parsed above
        if (charCode > 127 || charCode === 0 || token === '[') {
          // fatal error
          updateResult(ISEMAIL_ERR_EXPECTING_DTEXT);
          break;
        } else if (charCode < 33 || charCode === 127) {
          updateResult(ISEMAIL_RFC5322_DOMLIT_OBSDTEXT);
        }

        parseData.literal += token;
        parseData.domain += token;
        atomList.domain[elementCount] += token;
        elementLength++;
      }
      break;
    // quoted string
    case CONTEXT_QUOTEDSTRING:
      // http://tools.ietf.org/html/rfc5322#section-3.2.4
      //   quoted-string = [CFWS]
      //                   DQUOTE *([FWS] qcontent) [FWS] DQUOTE
      //                   [CFWS]
      //
      //   qcontent      = qtext / quoted-pair
      switch (token) {
      // quoted pair
      case '\\':
        context.stack.push(context.now);
        context.now = CONTEXT_QUOTEDPAIR;
        break;
      // folding white space
      // inside a quoted string, spaces are allowed as regular characters
      // it's only FWS if we include HTAB or CRLF
      case '\r':
        if ((++i === email.length) || email[i] !== '\n') {
          // fatal error
          updateResult(ISEMAIL_ERR_CR_NO_LF);
          break;
        }
      case '\t':
        // http://tools.ietf.org/html/rfc5322#section-3.2.2
        //   Runs of FWS, comment, or CFWS that occur between lexical tokens in
        //   a structured header field are semantically interpreted as a single
        //   space character.

        // http://tools.ietf.org/html/rfc5322#section-3.2.4
        //   the CRLF in any FWS/CFWS that appears within the quoted-string [is]
        //   semantically "invisible" and therefore not part of the
        //   quoted-string

        parseData.local += ' ';
        atomList.local[elementCount] += ' ';
        elementLength++;

        updateResult(ISEMAIL_CFWS_FWS);
        context.stack.push(context.now);
        context.now = CONTEXT_FWS;
        prevToken = token;
        break;
      // end of quoted string
      case '"':
        parseData.local += token;
        atomList.local[elementCount] += token;
        elementLength++;
        context.prev = context.now;
        context.now = context.stack.pop();
        break;
      // qtext
      default:
        // http://tools.ietf.org/html/rfc5322#section-3.2.4
        //   qtext          =   %d33 /             ; Printable US-ASCII
        //                      %d35-91 /          ;  characters not including
        //                      %d93-126 /         ;  "\" or the quote character
        //                      obs-qtext
        //
        //   obs-qtext      =   obs-NO-WS-CTL
        //
        //   obs-NO-WS-CTL  =   %d1-8 /            ; US-ASCII control
        //                      %d11 /             ;  characters that do not
        //                      %d12 /             ;  include the carriage
        //                      %d14-31 /          ;  return, line feed, and
        //                      %d127              ;  white space characters
        charCode = token.charCodeAt(0);

        if (charCode > 127 || charCode === 0 || charCode === 10) {
          updateResult(ISEMAIL_ERR_EXPECTING_QTEXT);
        } else if (charCode < 32 || charCode === 127) {
          updateResult(ISEMAIL_DEPREC_QTEXT);
        }

        parseData.local += token;
        atomList.local[elementCount] += token;
        elementLength++;
      }

      // http://tools.ietf.org/html/rfc5322#section-3.4.1
      //   If the string can be represented as a dot-atom (that is, it contains
      //   no characters other than atext characters or "." surrounded by atext
      //   characters), then the dot-atom form SHOULD be used and the quoted-
      //   string form SHOULD NOT be used.

      break;
    // quoted pair
    case CONTEXT_QUOTEDPAIR:
      // http://tools.ietf.org/html/rfc5322#section-3.2.1
      //   quoted-pair     =   ("\" (VCHAR / WSP)) / obs-qp
      //
      //   VCHAR           =  %d33-126   ; visible (printing) characters
      //   WSP             =  SP / HTAB  ; white space
      //
      //   obs-qp          =   "\" (%d0 / obs-NO-WS-CTL / LF / CR)
      //
      //   obs-NO-WS-CTL   =   %d1-8 /   ; US-ASCII control
      //                       %d11 /    ;  characters that do not
      //                       %d12 /    ;  include the carriage
      //                       %d14-31 / ;  return, line feed, and
      //                       %d127     ;  white space characters
      //
      // i.e. obs-qp       =  "\" (%d0-8, %d10-31 / %d127)
      charCode = token.charCodeAt(0);

      if (charCode > 127) {
        // fatal error
        updateResult(ISEMAIL_ERR_EXPECTING_QPAIR);
      } else if ((charCode < 31 && charCode !== 9) || charCode === 127) {
        // SP & HTAB are allowed
        updateResult(ISEMAIL_DEPREC_QP);
      }

      // At this point we know where this qpair occurred so
      // we could check to see if the character actually
      // needed to be quoted at all.
      // http://tools.ietf.org/html/rfc5321#section-4.1.2
      //   the sending system SHOULD transmit the
      //   form that uses the minimum quoting possible.

      // TODO: check whether the character needs to be quoted (escaped)
      // in this context

      context.prev = context.now;
      context.now = context.stack.pop(); // end of qpair
      token = '\\' + token;

      switch (context.now) {
      case CONTEXT_COMMENT: break;
      case CONTEXT_QUOTEDSTRING:
        parseData.local += token;
        atomList.local[elementCount] += token;

        // the maximum sizes specified by RFC 5321 are octet counts,
        // so we must include the backslash
        elementLength += 2;
        break;
      case COMPONENT_LITERAL:
        parseData.domain += token;
        atomList.domain[elementCount] += token;

        // the maximum sizes specified by RFC 5321 are octet counts,
        // so we must include the backslash
        elementLength += 2;
        break;
      /* istanbul ignore next: logically unreachable */
      default:
        throw new Error('quoted pair logic invoked in an invalid context: ' +
          context.now);
      }
      break;
    // comment
    case CONTEXT_COMMENT:
      // http://tools.ietf.org/html/rfc5322#section-3.2.2
      //   comment  = "(" *([FWS] ccontent) [FWS] ")"
      //
      //   ccontent = ctext / quoted-pair / comment
      switch (token) {
      // nested comment
      case '(':
        // nested comments are ok
        context.stack.push(context.now);
        context.now = CONTEXT_COMMENT;
        break;
      // end of comment
      case ')':
        context.prev = context.now;
        context.now = context.stack.pop();

        break;
      // quoted pair
      case '\\':
        context.stack.push(context.now);
        context.now = CONTEXT_QUOTEDPAIR;
        break;
      // folding white space
      case '\r':
        if ((++i === email.length) || email[i] !== '\n') {
          // fatal error
          updateResult(ISEMAIL_ERR_CR_NO_LF);
          break;
        }
      case ' ':
      case '\t':
        updateResult(ISEMAIL_CFWS_FWS);

        context.stack.push(context.now);
        context.now = CONTEXT_FWS;
        prevToken = token;
        break;
      // ctext
      default:
        // http://tools.ietf.org/html/rfc5322#section-3.2.3
        //   ctext         = %d33-39 /  ; Printable US-ASCII
        //                   %d42-91 /  ;  characters not including
        //                   %d93-126 / ;  "(", ")", or "\"
        //                   obs-ctext
        //
        //   obs-ctext     = obs-NO-WS-CTL
        //
        //   obs-NO-WS-CTL = %d1-8 /    ; US-ASCII control
        //                   %d11 /     ;  characters that do not
        //                   %d12 /     ;  include the carriage
        //                   %d14-31 /  ;  return, line feed, and
        //                   %d127      ;  white space characters
        charCode = token.charCodeAt(0);

        if (charCode > 127 || charCode === 0 || charCode === 10) {
          // fatal error
          updateResult(ISEMAIL_ERR_EXPECTING_CTEXT);
          break;
        } else if (charCode < 32 || charCode === 127) {
          updateResult(ISEMAIL_DEPREC_CTEXT);
        }
      }
      break;
    // folding white space
    case CONTEXT_FWS:
      // http://tools.ietf.org/html/rfc5322#section-3.2.2
      //   FWS     =   ([*WSP CRLF] 1*WSP) /  obs-FWS
      //                                   ; Folding white space

      // But note the erratum:
      // http://www.rfc-editor.org/errata_search.php?rfc=5322&eid=1908:
      //   In the obsolete syntax, any amount of folding white space MAY be
      //   inserted where the obs-FWS rule is allowed.  This creates the
      //   possibility of having two consecutive "folds" in a line, and
      //   therefore the possibility that a line which makes up a folded header
      //   field could be composed entirely of white space.
      //
      //   obs-FWS =   1*([CRLF] WSP)

      if (prevToken === '\r') {
        if (token === '\r') {
          // fatal error
          updateResult(ISEMAIL_ERR_FWS_CRLF_X2);
          break;
        }

        if (++crlfCount > 1) {
          // multiple folds = obsolete FWS
          updateResult(ISEMAIL_DEPREC_FWS);
        } else {
          crlfCount = 1;
        }
      }

      switch (token) {
      case '\r':
        if ((++i === email.length) || email[i] !== '\n') {
          // fatal error
          updateResult(ISEMAIL_ERR_CR_NO_LF);
        }
        break;
      case ' ':
      case '\t':
        break;
      default:
        if (prevToken === '\r') {
          // fatal error
          updateResult(ISEMAIL_ERR_FWS_CRLF_END);
        }

        crlfCount = 0;

        context.prev = context.now;
        context.now = context.stack.pop(); // end of FWS

        i--; // look at this token again in the parent context
      }
      prevToken = token;
      break;
    // unexpected context
    /* istanbul ignore next: logically unreachable */
    default:
      throw new Error('unknown context: ' + context.now);
    } // primary state machine

    if (maxResult > ISEMAIL_RFC5322) {
      // fatal error, no point continuing
      break;
    }
  } // token loop

  // check for errors
  if (maxResult < ISEMAIL_RFC5322) {
    // fatal errors
    if (context.now === CONTEXT_QUOTEDSTRING) {
      updateResult(ISEMAIL_ERR_UNCLOSEDQUOTEDSTR);
    } else if (context.now === CONTEXT_QUOTEDPAIR) {
      updateResult(ISEMAIL_ERR_BACKSLASHEND);
    } else if (context.now === CONTEXT_COMMENT) {
      updateResult(ISEMAIL_ERR_UNCLOSEDCOMMENT);
    } else if (context.now === COMPONENT_LITERAL) {
      updateResult(ISEMAIL_ERR_UNCLOSEDDOMLIT);
    } else if (token === '\r') {
      updateResult(ISEMAIL_ERR_FWS_CRLF_END);
    } else if (parseData.domain.length === 0) {
      updateResult(ISEMAIL_ERR_NODOMAIN);
    } else if (elementLength === 0) {
      updateResult(ISEMAIL_ERR_DOT_END);
    } else if (hyphenFlag) {
      updateResult(ISEMAIL_ERR_DOMAINHYPHENEND);

    // other errors
    } else if (parseData.domain.length > 255) {
      // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.2
      //   The maximum total length of a domain name or number is 255 octets.
      updateResult(ISEMAIL_RFC5322_DOMAIN_TOOLONG);
    } else if (parseData.local.length + parseData.domain.length + /* '@' */ 1 >
        254) {
      // http://tools.ietf.org/html/rfc5321#section-4.1.2
      //   Forward-path   = Path
      //
      //   Path           = "<" [ A-d-l ":" ] Mailbox ">"
      //
      // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.3
      //   The maximum total length of a reverse-path or forward-path is 256
      //   octets (including the punctuation and element separators).
      //
      // Thus, even without (obsolete) routing information, the Mailbox can
      // only be 254 characters long. This is confirmed by this verified
      // erratum to RFC 3696:
      //
      // http://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
      //   However, there is a restriction in RFC 2821 on the length of an
      //   address in MAIL and RCPT commands of 254 characters.  Since addresses
      //   that do not fit in those fields are not normally useful, the upper
      //   limit on address lengths should normally be considered to be 254.
      updateResult(ISEMAIL_RFC5322_TOOLONG);
    } else if (elementLength > 63) {
      // http://tools.ietf.org/html/rfc1035#section-2.3.4
      // labels   63 octets or less
      updateResult(ISEMAIL_RFC5322_LABEL_TOOLONG);
    } else if (options.minDomainAtoms && atomList.domain.length <
        options.minDomainAtoms) {
      updateResult(ISEMAIL_ERR_TOOSHORT_DOMAIN);
    } else if (options.tldWhitelist) {
      var tldAtom = atomList.domain[elementCount], tldValid = false, n;
      if (Array.isArray(options.tldWhitelist)) {
        for (i = 0, n = options.tldWhitelist.length; i < n; i++) {
          if (tldAtom === options.tldWhitelist[i]) {
            tldValid = true;
            break;
          }
        }
      } else {
        tldValid = hasOwn.call(options.tldWhitelist, tldAtom);
      }
      if (!tldValid) {
        updateResult(ISEMAIL_ERR_UNKNOWN_TLD);
      }
    }
  } // check for errors

  var dnsPositive = false;

  if (options.checkDNS && maxResult < ISEMAIL_DNSWARN && HAS_REQUIRE) {
    dns || (dns = require('dns'));
    // http://tools.ietf.org/html/rfc5321#section-2.3.5
    //   Names that can
    //   be resolved to MX RRs or address (i.e., A or AAAA) RRs (as discussed
    //   in Section 5) are permitted, as are CNAME RRs whose targets can be
    //   resolved, in turn, to MX or address RRs.
    //
    // http://tools.ietf.org/html/rfc5321#section-5.1
    //   The lookup first attempts to locate an MX record associated with the
    //   name.  If a CNAME record is found, the resulting name is processed as
    //   if it were the initial name. ... If an empty list of MXs is returned,
    //   the address is treated as if it was associated with an implicit MX
    //   RR, with a preference of 0, pointing to that host.
    //
    // isEmail() author's note: We will regard the existence of a CNAME to be
    // sufficient evidence of the domain's existence. For performance reasons
    // we will not repeat the DNS lookup for the CNAME's target, but we will
    // raise a warning because we didn't immediately find an MX record.
    if (elementCount === 0) {
      // checking TLD DNS only works if you explicitly check from the root
      parseData.domain += '.';
    }

    var dnsDomain = parseData.domain;
    dns.resolveMx(dnsDomain, function(err, records) {
      if ((err && err.code !== dns.NODATA) || (!err && !records)) {
        updateResult(ISEMAIL_DNSWARN_NO_RECORD);
        return finish();
      }
      if (records && records.length) {
        dnsPositive = true;
        return finish();
      }
      var done = false, count = 3;
      updateResult(ISEMAIL_DNSWARN_NO_MX_RECORD);
      dns.resolveCname(dnsDomain, handleRecords);
      dns.resolve4(dnsDomain, handleRecords);
      dns.resolve6(dnsDomain, handleRecords);
      function handleRecords(err, records) {
        if (done) return;
        count--;
        if (!err && records && records.length) {
          done = true;
          return finish();
        }
        if (count === 0) {
          // no usable records for the domain can be found
          updateResult(ISEMAIL_DNSWARN_NO_RECORD);
          done = true;
          finish();
        }
      }
    });
  } else if (options.checkDNS) {
    // guarantee asynchronicity
    typeof process !== 'undefined' && process &&
      typeof process.nextTick === 'function'
      ? process.nextTick(finish)
      : setTimeout(finish, 1);
  } else {
    return finish();
  } // checkDNS

  function finish() {
    if (!dnsPositive && maxResult < ISEMAIL_DNSWARN) {
      if (elementCount === 0) {
        updateResult(ISEMAIL_RFC5321_TLD);
      } else {
        var charCode = atomList.domain[elementCount].charCodeAt(0);
        if (charCode >= 48 && charCode <= 57) {
          updateResult(ISEMAIL_RFC5321_TLDNUMERIC);
        }
      }
    }

    if (maxResult < threshold) {
      maxResult = ISEMAIL_VALID;
    }

    if (!diagnose) {
      maxResult = maxResult < THRESHOLD;
    }

    if (typeof callback === 'function') {
      callback(maxResult);
    }

    return maxResult;
  } // finish
} // isEmail

module.exports = isEmail;

}).call(this,require('_process'))
},{"_process":2,"dns":1}],36:[function(require,module,exports){
'use strict'

var toCamelFn = function(str, letter){
       return letter ? letter.toUpperCase(): ''
   }

var hyphenRe = require('./hyphenRe')

module.exports = function(str){
   return str?
          str.replace(hyphenRe, toCamelFn):
          ''
}
},{"./hyphenRe":39}],37:[function(require,module,exports){
var RE = /\s+/g

module.exports = function(str){
    if (!str){
        return ''
    }

    return str.trim().replace(RE, ' ')
}
},{}],38:[function(require,module,exports){
'use strict'

var separate     = require('./separate')
var camelize     = require('./camelize')
var toUpperFirst = require('./toUpperFirst')
var hyphenRe     = require('./hyphenRe')

function toLowerAndSpace(str, letter){
    return letter? ' ' + letter.toLowerCase(): ' '
}

module.exports = function(name, config){

    var str = config && config.capitalize?
                    separate(camelize(name), ' '):
                    separate(name, ' ').replace(hyphenRe, toLowerAndSpace)

    return toUpperFirst(str.trim())
}

},{"./camelize":36,"./hyphenRe":39,"./separate":47,"./toUpperFirst":50}],39:[function(require,module,exports){
module.exports = /[-\s]+(.)?/g
},{}],40:[function(require,module,exports){
'use strict'

var separate = require('./separate')

module.exports = function(name){
   return separate(name).toLowerCase()
}
},{"./separate":47}],41:[function(require,module,exports){
'use strict'

module.exports = require('./match')(/^[a-zA-Z0-9]+$/)
},{"./match":45}],42:[function(require,module,exports){
module.exports = require('isemail')
},{"isemail":34}],43:[function(require,module,exports){
'use strict'

var regex = /^[A-F0-9]{8}(?:-?[A-F0-9]{4}){3}-?[A-F0-9]{12}$/i
var regex2 = /^\{[A-F0-9]{8}(?:-?[A-F0-9]{4}){3}-?[A-F0-9]{12}\}$/i

module.exports = function(value){
    return regex.test(value) || regex2.test(value)
}


},{}],44:[function(require,module,exports){
module.exports = {
    alphanum: require('./alphanum'),
    match   : require('./match'),
    guid   : require('./guid'),
    email   : require('./email'),
    numeric   : require('./numeric')
}
},{"./alphanum":41,"./email":42,"./guid":43,"./match":45,"./numeric":46}],45:[function(require,module,exports){
'use strict'

var F = require('functionally')

module.exports = F.curry(function(re, value){
    return !!re.test(value)
})
},{"functionally":19}],46:[function(require,module,exports){
'use strict'

module.exports = require('i-s').numeric
},{"i-s":20}],47:[function(require,module,exports){
'use strict'

var doubleColonRe      = /::/g
var upperToLowerRe     = /([A-Z]+)([A-Z][a-z])/g
var lowerToUpperRe     = /([a-z\d])([A-Z])/g
var underscoreToDashRe = /_/g

module.exports = function(name, separator){

   return name?
           name.replace(doubleColonRe, '/')
                .replace(upperToLowerRe, '$1_$2')
                .replace(lowerToUpperRe, '$1_$2')
                .replace(underscoreToDashRe, separator || '-')
            :
            ''
}
},{}],48:[function(require,module,exports){
var RE = /\s/g

module.exports = function(str){
    if (!str){
        return ''
    }

    return str.replace(RE, '')
}
},{}],49:[function(require,module,exports){
module.exports = function(str){
    return str.length?
            str.charAt(0).toLowerCase() + str.substring(1):
            str
}
},{}],50:[function(require,module,exports){
'use strict'

module.exports = function(value){
    return value.length?
                value.charAt(0).toUpperCase() + value.substring(1):
                value
}
},{}],51:[function(require,module,exports){
module.exports = require('./prefixer')()
},{"./prefixer":57}],52:[function(require,module,exports){
'use strict'

var objectHasOwn = Object.prototype.hasOwnProperty

module.exports = function(object, propertyName){
    return objectHasOwn.call(object, propertyName)
}
},{}],53:[function(require,module,exports){
'use strict'

var objectToString = Object.prototype.toString

module.exports = function(v) {
    return objectToString.apply(v) === '[object Function]'
}

},{}],54:[function(require,module,exports){
'use strict'

var objectToString = Object.prototype.toString

module.exports = function(v){
    return !!v && objectToString.call(v) === '[object Object]'
}


},{}],55:[function(require,module,exports){
var toUpperFirst = require('ustring').toUpperFirst

var re         = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/

var docStyle   = typeof document == 'undefined'?
                    {}:
                    document.documentElement.style

var prefixInfo = (function(){

    var prefix = (function(){

            for (var prop in docStyle) {
                if( re.test(prop) ) {
                    // test is faster than match, so it's better to perform
                    // that on the lot and match only when necessary
                    return  prop.match(re)[0]
                }
            }

            // Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
            // However (prop in style) returns the correct value, so we'll have to test for
            // the precence of a specific property
            if ('WebkitOpacity' in docStyle){
                return 'Webkit'
            }

            if ('KhtmlOpacity' in docStyle) {
                return 'Khtml'
            }

            return ''
        })(),

    lower = prefix.toLowerCase()

    return {
        style       : prefix,
        css       : '-' + lower + '-',
        dom       : ({
            Webkit: 'WebKit',
            ms    : 'MS',
            o     : 'WebKit'
        })[prefix] || toUpperFirst(prefix)
    }

})()

module.exports = prefixInfo
},{"ustring":18}],56:[function(require,module,exports){
module.exports = {
    'border-radius'              : 1,
    'border-top-left-radius'     : 1,
    'border-top-right-radius'    : 1,
    'border-bottom-left-radius'  : 1,
    'border-bottom-right-radius' : 1,
    'box-shadow'                 : 1,
    'order'                      : 1,
    'flex'                       : function(name, prefix){
        return [prefix + 'box-flex']
    },
    'box-flex'                   : 1,
    'box-align'                  : 1,
    'animation'                  : 1,
    'animation-duration'         : 1,
    'animation-name'             : 1,
    'transition'                 : 1,
    'transition-duration'        : 1,
    'transform'                  : 1,
    'transform-style'            : 1,
    'transform-origin'           : 1,
    'backface-visibility'        : 1,
    'perspective'                : 1,
    'box-pack'                   : 1
}
},{}],57:[function(require,module,exports){
'use strict'

var ustring = require('ustring')
var camelize = ustring.camelize
var hyphenate = ustring.hyphenate
var toLowerFirst = ustring.toLowerFirst
var toUpperFirst = ustring.toUpperFirst

var prefixInfo = require('./prefixInfo')
var prefixProperties = require('./prefixProperties')

var docStyle = typeof document == 'undefined'?
                {}:
                document.documentElement.style

module.exports = function(asStylePrefix){

    return function(name, config){
        config = config || {}

        var styleName = toLowerFirst(camelize(name)),
            cssName   = hyphenate(name),

            theName   = asStylePrefix?
                            styleName:
                            cssName,

            thePrefix = prefixInfo.style?
                            asStylePrefix?
                                prefixInfo.style:
                                prefixInfo.css
                            :
                            ''

        if ( styleName in docStyle ) {
            return config.asString?
                              theName :
                            [ theName ]
        }

        //not a valid style name, so we'll return the value with a prefix

        var upperCased     = theName,
            prefixProperty = prefixProperties[cssName],
            result         = []

        if (asStylePrefix){
            upperCased = toUpperFirst(theName)
        }

        if (typeof prefixProperty == 'function'){
            var prefixedCss = prefixProperty(theName, thePrefix) || []
            if (prefixedCss && !Array.isArray(prefixedCss)){
                prefixedCss = [prefixedCss]
            }

            if (prefixedCss.length){
                prefixedCss = prefixedCss.map(function(property){
                    return asStylePrefix?
                                toLowerFirst(camelize(property)):
                                hyphenate(property)

                })
            }

            result = result.concat(prefixedCss)
        }

        if (thePrefix){
            result.push(thePrefix + upperCased)
        }

        result.push(theName)

        if (config.asString || result.length == 1){
            return result[0]
        }

        return result
    }
}
},{"./prefixInfo":55,"./prefixProperties":56,"ustring":18}],58:[function(require,module,exports){
'use strict'

var ustring = require('ustring')

var prefixInfo  = require('./prefixInfo')
var cssPrefixFn = require('./cssPrefix')

var HYPHENATE   = ustring.hyphenate
var HAS_OWN     = require('./hasOwn')
var IS_OBJECT   = require('./isObject')
var IS_FUNCTION = require('./isFunction')

var applyPrefix = function(target, property, value, normalizeFn){
    cssPrefixFn(property).forEach(function(p){
        target[normalizeFn? normalizeFn(p): p] = value
    })
}

var toObject = function(str){
    str = (str || '').split(';')

    var result = {}

    str.forEach(function(item){
        var split = item.split(':')

        if (split.length == 2){
            result[split[0].trim()] = split[1].trim()
        }
    })

    return result
}

/**
 * @ignore
 * @method toStyleObject
 *
 * @param  {Object} styles The object to convert to a style object.
 * @param  {Object} [config]
 * @param  {Boolean} [config.addUnits=true] True if you want to add units when numerical values are encountered.
 * @param  {Object}  config.cssUnitless An object whose keys represent css numerical property names that will not be appended with units.
 * @param  {Object}  config.prefixProperties An object whose keys represent css property names that should be prefixed
 * @param  {String}  config.cssUnit='px' The css unit to append to numerical values. Defaults to 'px'
 * @param  {String}  config.normalizeName A function that normalizes a name to a valid css property name
 * @param  {String}  config.scope
 *
 * @return {Object} The object, normalized with css style names
 */
var TO_STYLE_OBJECT = function(styles, config, prepend, result){

    if (typeof styles == 'string'){
        styles = toObject(styles)
    }

    config = config || {}
    result = result || {}

    var scope    = config.scope || {},

        //configs
        addUnits = config.addUnits != null?
                            config.addUnits:
                            scope && scope.addUnits != null?
                                scope.addUnits:
                                true,

        cssUnitless      = (config.cssUnitless != null?
                                config.cssUnitless:
                                scope?
                                    scope.cssUnitless:
                                    null) || {},
        cssUnit          = (config.cssUnit || scope? scope.cssUnit: null) || 'px',
        prefixProperties = (config.prefixProperties || (scope? scope.prefixProperties: null)) || {},

        normalizeFn = config.normalizeName || HYPHENATE,

        processed,
        styleName,

        propName,
        propValue,
        propCssUnit,
        propType,
        propIsNumber,

        fnPropValue,
        prefix

    for (propName in styles) if (HAS_OWN(styles, propName)) {

        propValue = styles[ propName ]

        //the hyphenated style name (css property name)
        styleName = normalizeFn(prepend? prepend + propName: propName)

        processed = false
        prefix    = false

        if (IS_FUNCTION(propValue)) {

            //a function can either return a css value
            //or an object with { value, prefix, name }
            fnPropValue = propValue.call(scope || styles, propValue, propName, styleName, styles)

            if (IS_OBJECT(fnPropValue) && fnPropValue.value != null){

                propValue = fnPropValue.value
                prefix    = fnPropValue.prefix
                styleName = fnPropValue.name?
                                normalizeFn(fnPropValue.name):
                                styleName

            } else {
                propValue = fnPropValue
            }
        }

        propType     = typeof propValue
        propIsNumber = propType == 'number' || (propType == 'string' && propValue != '' && propValue * 1 == propValue)

        if (propValue == null || styleName == null || styleName === ''){
            continue
        }

        if (propIsNumber || propType == 'string'){
           processed = true
        }

        if (!processed && propValue.value != null && propValue.prefix){
           processed = true
           prefix    = propValue.prefix
           propValue = propValue.value
        }

        if (processed){

            prefix = prefix || !!prefixProperties[styleName]

            if (propIsNumber){
                propValue = addUnits && !(styleName in cssUnitless) ?
                                propValue + cssUnit:
                                propValue + ''//change it to a string, so that jquery does not append px or other units
            }

            //special border treatment
            if (
                    (
                     styleName == 'border' ||
                    (!styleName.indexOf('border')
                        &&
                        !~styleName.indexOf('radius')
                        &&
                        !~styleName.indexOf('width'))
                    ) &&
                    propIsNumber
                ){

                styleName = normalizeFn(styleName + '-width')
            }

            //special border radius treatment
            if (!styleName.indexOf('border-radius-')){
                styleName.replace(/border(-radius)(-(.*))/, function(str, radius, theRest){
                    var positions = {
                        '-top'    : ['-top-left',      '-top-right' ],
                        '-left'   : ['-top-left',    '-bottom-left' ],
                        '-right'  : ['-top-right',   '-bottom-right'],
                        '-bottom' : ['-bottom-left', '-bottom-right']
                    }

                    if (theRest in positions){
                        styleName = []

                        positions[theRest].forEach(function(pos){
                            styleName.push(normalizeFn('border' + pos + radius))
                        })
                    } else {

                        styleName = normalizeFn('border'+ theRest + radius)
                    }

                })

                if (Array.isArray(styleName)){
                    styleName.forEach(function(styleName){
                        if (prefix){
                            applyPrefix(result, styleName, propValue, normalizeFn)
                        } else {
                            result[normalizeFn(styleName)] = propValue
                        }
                    })

                    continue
                }
            }

            if (prefix){
                applyPrefix(result, styleName, propValue, normalizeFn)
            } else {
                result[normalizeFn(styleName)] = propValue
            }

        } else {

            //the propValue must be an object, so go down the hierarchy
            TO_STYLE_OBJECT(propValue, config, styleName + '-', result)
        }
    }

    return result
}

module.exports = TO_STYLE_OBJECT
},{"./cssPrefix":51,"./hasOwn":52,"./isFunction":53,"./isObject":54,"./prefixInfo":55,"ustring":18}],59:[function(require,module,exports){
'use strict'

var toStyleObject = require('./toStyleObject')
var hasOwn        = require('./hasOwn')

/**
 * @ignore
 * @method toStyleString
 *
 * @param  {Object} styles The object to convert to a style string.
 * @param  {Object} config
 * @param  {Boolean} config.addUnits=true True if you want to add units when numerical values are encountered. Defaults to true
 * @param  {Object}  config.cssUnitless An object whose keys represent css numerical property names that will not be appended with units.
 * @param  {Object}  config.prefixProperties An object whose keys represent css property names that should be prefixed
 * @param  {String}  config.cssUnit='px' The css unit to append to numerical values. Defaults to 'px'
 * @param  {String}  config.scope
 *
 * @return {Object} The object, normalized with css style names
 */
module.exports = function(styles, config){
    styles = toStyleObject(styles, config)

    var result = []
    var prop

    for(prop in styles) if (hasOwn(styles, prop)){
        result.push(prop + ': ' + styles[prop])
    }

    return result.join('; ')
}
},{"./hasOwn":52,"./toStyleObject":58}],60:[function(require,module,exports){
/** @jsx React.DOM */

module.exports = React.createClass({displayName: 'exports',

    mixins: [require('./common')],

    orientation: 'vertical',

    getInitialState: function(){
        return {}
    },

    render: function(){
        return (
            React.DOM.div({className: "rf-column rf-layout"}, 
                this.renderChildren()
            )
        )
    }
})
},{"./common":64}],61:[function(require,module,exports){
/** @jsx React.DOM */

var RowLayout = require('./RowLayout')
var ColumnLayout = require('./ColumnLayout')

var common         = require('./common')
var renderChildren = common.renderChildren

module.exports = React.createClass({displayName: 'exports',

    mixins: [
        common
    ],

    render: function(){
        var children = this.props.children.concat()

        var rowLayout = RowLayout(null, 
                            children[children.length - 1]
                        )

        var columnLayout = ColumnLayout(null, 
                            children.slice(0, children.length - 1)
                        )

        this.asChildLayout(columnLayout)
        this.asChildLayout(rowLayout)

        return (
            React.DOM.div({className: "rf-layout rf-composite rf-v-column-n-row-1 "+(this.props.horizontal?'rf-horizontal':'rf-vertical')}, 
                this.renderChildren([columnLayout, rowLayout], this)
            )
        )
    },

    asChildLayout: function(layout){
        var defaultProps = common.getDefaultProps()

        Object.keys(defaultProps).forEach(function(key){
            layout.props[key] = layout.props[key] || this.props[key]
        }, this)
    }
})
},{"./ColumnLayout":60,"./RowLayout":63,"./common":64}],62:[function(require,module,exports){
/** @jsx React.DOM */

var RowLayout = require('./RowLayout')
var ColumnLayout = require('./ColumnLayout')

var common         = require('./common')
var renderChildren = common.renderChildren

module.exports = React.createClass({displayName: 'exports',

    mixins: [
        common
    ],

    render: function(){
        var children = this.props.children.concat()

        var rowLayout = RowLayout(null, 
                            children[0]
                        )

        var columnLayout = ColumnLayout(null, 
                            children.slice(1)
                        )

        this.asChildLayout(rowLayout)
        this.asChildLayout(columnLayout)

        return (
            React.DOM.div({className: "rf-layout rf-composite rf-row-1-column-n "+(this.props.horizontal?'rf-horizontal':'rf-vertical')}, 
                this.renderChildren([rowLayout, columnLayout], this)
            )
        )
    },

    asChildLayout: function(layout){
        var defaultProps = common.getDefaultProps()

        Object.keys(defaultProps).forEach(function(key){
            layout.props[key] = layout.props[key] || this.props[key]
        }, this)
    }
})
},{"./ColumnLayout":60,"./RowLayout":63,"./common":64}],63:[function(require,module,exports){
/** @jsx React.DOM */

module.exports = React.createClass({displayName: 'exports',

    mixins: [
        require('./common')
    ],

    orientation: 'horizontal',

    getInitialState: function(){
        return {}
    },

    render: function(){
        return (
            React.DOM.div({className: "rf-row rf-layout"}, 
                this.renderChildren()
            )
        )
    }
})
},{"./common":64}],64:[function(require,module,exports){
var toStyle = require('to-style').object
var isNumeric = require('i-s').numeric

function getBorderSize(layout){
    var bordered   = layout.props.bordered
    var borderSize = bordered?
                        isNumeric(bordered)?
                        bordered: parseInt(bordered, 10) || 1
                        :
                        0

    return borderSize
}

function getFlex(item){
    var flex = item.props.flex

    return isNumeric(flex)?
                parseInt(flex, 10):
                0
}

function itemPadding(item, index, layout){

    var style = {}

    if (layout.props.layoutPadding){
        style.padding = layout.props.layoutPadding
    }
    if (item.props.layoutPadding){
        style.padding = item.props.layoutPadding
    }

    var borderSize = getBorderSize(layout)

    if (borderSize && index){
        var borderPos = layout.orientation == 'vertical'? 'border-top': 'border-left'

        style[borderPos + '-width'] = borderSize
        style[borderPos + '-style'] = 'solid'
    }

    var itemFlex = getFlex(item)

    if (itemFlex && itemFlex > 10){
        style.flex = itemFlex
    }

    return toStyle(style)
}

function itemClass(item, index, layout){
    var result = ['rf-layout-item']

    var borderSize = getBorderSize(layout)
    var itemFlex   = getFlex(item)

    if (itemFlex && itemFlex <= 10){
        result.push('u-flex-' + itemFlex)
    }

    if (borderSize && index){
        result.push('rf-bordered')
    }

    return result.join(' ')
}

module.exports = {

    getDefaultProps: require('./getDefaultProps'),

    renderChildren: require('./renderChildren')(itemClass, itemPadding)
}
},{"./getDefaultProps":65,"./renderChildren":67,"i-s":3,"to-style":17}],65:[function(require,module,exports){
module.exports = function(){
    return {
        bordered: 1,
        layoutPadding: 0
    }
}
},{}],66:[function(require,module,exports){
module.exports = {
    RowLayout   : require('./RowLayout'),
    ColumnLayout: require('./ColumnLayout'),
    Row1ColumnN : require('./Row1ColumnN'),
    ColumnNRow1 : require('./ColumnNRow1')
}
},{"./ColumnLayout":60,"./ColumnNRow1":61,"./Row1ColumnN":62,"./RowLayout":63}],67:[function(require,module,exports){
/** @jsx React.DOM */
module.exports = function(itemClass, itemPadding){
    return function(children, layout){
        if (children && !Array.isArray(children)){
            children = [children]
        }

        return React.Children.map(children || this.props.children, function(item, index){
            return React.DOM.div({className: itemClass(item, index, this), style: itemPadding(item, index, this)}, item)
        }, layout || this)
    }
}
},{}]},{},[66])(66)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy9pLXMvaW5kZXguanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9ub2RlX21vZHVsZXMvaS1zL3NyYy9hcmd1bWVudHMuanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9ub2RlX21vZHVsZXMvaS1zL3NyYy9hcnJheS5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy9pLXMvc3JjL2Jvb2xlYW4uanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9ub2RlX21vZHVsZXMvaS1zL3NyYy9kYXRlLmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL2ktcy9zcmMvZmxvYXQuanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9ub2RlX21vZHVsZXMvaS1zL3NyYy9mdW5jdGlvbi5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy9pLXMvc3JjL2luZGV4LmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL2ktcy9zcmMvaW50LmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL2ktcy9zcmMvbnVtYmVyLmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL2ktcy9zcmMvbnVtZXJpYy5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy9pLXMvc3JjL29iamVjdC5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy9pLXMvc3JjL3JlZ2V4cC5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy9pLXMvc3JjL3N0cmluZy5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9pbmRleC5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9ub2RlX21vZHVsZXMvdXN0cmluZy9pbmRleC5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9ub2RlX21vZHVsZXMvdXN0cmluZy9ub2RlX21vZHVsZXMvZnVuY3Rpb25hbGx5L2luZGV4LmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL3RvLXN0eWxlL25vZGVfbW9kdWxlcy91c3RyaW5nL25vZGVfbW9kdWxlcy9pc2VtYWlsL2luZGV4LmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL3RvLXN0eWxlL25vZGVfbW9kdWxlcy91c3RyaW5nL25vZGVfbW9kdWxlcy9pc2VtYWlsL2xpYi9pc2VtYWlsLmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL3RvLXN0eWxlL25vZGVfbW9kdWxlcy91c3RyaW5nL3NyYy9jYW1lbGl6ZS5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9ub2RlX21vZHVsZXMvdXN0cmluZy9zcmMvY29tcGFjdFdoaXRlc3BhY2UuanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9ub2RlX21vZHVsZXMvdG8tc3R5bGUvbm9kZV9tb2R1bGVzL3VzdHJpbmcvc3JjL2h1bWFuaXplLmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL3RvLXN0eWxlL25vZGVfbW9kdWxlcy91c3RyaW5nL3NyYy9oeXBoZW5SZS5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9ub2RlX21vZHVsZXMvdXN0cmluZy9zcmMvaHlwaGVuYXRlLmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL3RvLXN0eWxlL25vZGVfbW9kdWxlcy91c3RyaW5nL3NyYy9pcy9hbHBoYW51bS5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9ub2RlX21vZHVsZXMvdXN0cmluZy9zcmMvaXMvZW1haWwuanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9ub2RlX21vZHVsZXMvdG8tc3R5bGUvbm9kZV9tb2R1bGVzL3VzdHJpbmcvc3JjL2lzL2d1aWQuanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9ub2RlX21vZHVsZXMvdG8tc3R5bGUvbm9kZV9tb2R1bGVzL3VzdHJpbmcvc3JjL2lzL2luZGV4LmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL3RvLXN0eWxlL25vZGVfbW9kdWxlcy91c3RyaW5nL3NyYy9pcy9tYXRjaC5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9ub2RlX21vZHVsZXMvdXN0cmluZy9zcmMvaXMvbnVtZXJpYy5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9ub2RlX21vZHVsZXMvdXN0cmluZy9zcmMvc2VwYXJhdGUuanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9ub2RlX21vZHVsZXMvdG8tc3R5bGUvbm9kZV9tb2R1bGVzL3VzdHJpbmcvc3JjL3N0cmlwV2hpdGVzcGFjZS5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9ub2RlX21vZHVsZXMvdXN0cmluZy9zcmMvdG9Mb3dlckZpcnN0LmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL3RvLXN0eWxlL25vZGVfbW9kdWxlcy91c3RyaW5nL3NyYy90b1VwcGVyRmlyc3QuanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9ub2RlX21vZHVsZXMvdG8tc3R5bGUvc3JjL2Nzc1ByZWZpeC5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9zcmMvaGFzT3duLmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL3RvLXN0eWxlL3NyYy9pc0Z1bmN0aW9uLmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvbm9kZV9tb2R1bGVzL3RvLXN0eWxlL3NyYy9pc09iamVjdC5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9zcmMvcHJlZml4SW5mby5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9zcmMvcHJlZml4UHJvcGVydGllcy5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L25vZGVfbW9kdWxlcy90by1zdHlsZS9zcmMvcHJlZml4ZXIuanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9ub2RlX21vZHVsZXMvdG8tc3R5bGUvc3JjL3RvU3R5bGVPYmplY3QuanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9ub2RlX21vZHVsZXMvdG8tc3R5bGUvc3JjL3RvU3R5bGVTdHJpbmcuanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9zcmMvanMvQ29sdW1uTGF5b3V0LmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvc3JjL2pzL0NvbHVtbk5Sb3cxLmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvc3JjL2pzL1JvdzFDb2x1bW5OLmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvc3JjL2pzL1Jvd0xheW91dC5qcyIsIi9ob21lL3JhZHUvY29kZS9yZWFjdC1mbGV4L3NyYy9qcy9jb21tb24uanMiLCIvaG9tZS9yYWR1L2NvZGUvcmVhY3QtZmxleC9zcmMvanMvZ2V0RGVmYXVsdFByb3BzLmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvc3JjL2pzL2luZGV4LmpzIiwiL2hvbWUvcmFkdS9jb2RlL3JlYWN0LWZsZXgvc3JjL2pzL3JlbmRlckNoaWxkcmVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcnZCQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2p3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTs7QUNGQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIixudWxsLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zcmMnKSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsdWUpe1xuICAgIHJldHVybiBvYmplY3RUb1N0cmluZy5hcHBseSh2YWx1ZSkgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nIHx8ICEhdmFsdWUuY2FsbGVlXG59IiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsdWUpe1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKVxufSIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdib29sZWFuJ1xufSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsdWUpe1xuICAgIHJldHVybiBvYmplY3RUb1N0cmluZy5hcHBseSh2YWx1ZSkgPT09ICdbb2JqZWN0IERhdGVdJ1xufSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgbnVtYmVyID0gcmVxdWlyZSgnLi9udW1iZXInKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICByZXR1cm4gbnVtYmVyKHZhbHVlKSAmJiAodmFsdWUgPT09IHBhcnNlRmxvYXQodmFsdWUsIDEwKSkgJiYgISh2YWx1ZSA9PT0gcGFyc2VJbnQodmFsdWUsIDEwKSlcbn0iLCIndXNlIHN0cmljdCdcblxudmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuYXBwbHkodmFsdWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nXG59IiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdudW1lcmljJyAgOiByZXF1aXJlKCcuL251bWVyaWMnKSxcbiAgICAnbnVtYmVyJyAgIDogcmVxdWlyZSgnLi9udW1iZXInKSxcbiAgICAnaW50JyAgICAgIDogcmVxdWlyZSgnLi9pbnQnKSxcbiAgICAnZmxvYXQnICAgIDogcmVxdWlyZSgnLi9mbG9hdCcpLFxuICAgICdzdHJpbmcnICAgOiByZXF1aXJlKCcuL3N0cmluZycpLFxuICAgICdmdW5jdGlvbicgOiByZXF1aXJlKCcuL2Z1bmN0aW9uJyksXG4gICAgJ29iamVjdCcgICA6IHJlcXVpcmUoJy4vb2JqZWN0JyksXG4gICAgJ2FyZ3VtZW50cyc6IHJlcXVpcmUoJy4vYXJndW1lbnRzJyksXG4gICAgJ2Jvb2xlYW4nICA6IHJlcXVpcmUoJy4vYm9vbGVhbicpLFxuICAgICdkYXRlJyAgICAgOiByZXF1aXJlKCcuL2RhdGUnKSxcbiAgICAncmVnZXhwJyAgIDogcmVxdWlyZSgnLi9yZWdleHAnKSxcbiAgICAnYXJyYXknICAgIDogcmVxdWlyZSgnLi9hcnJheScpXG59IiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBudW1iZXIgPSByZXF1aXJlKCcuL251bWJlcicpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsdWUpe1xuICAgIHJldHVybiBudW1iZXIodmFsdWUpICYmICh2YWx1ZSA9PT0gcGFyc2VJbnQodmFsdWUsIDEwKSlcbn0iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodmFsdWUpXG59IiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsdWUpe1xuICAgIHJldHVybiAhaXNOYU4oIHBhcnNlRmxvYXQoIHZhbHVlICkgKSAmJiBpc0Zpbml0ZSggdmFsdWUgKVxufSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsdWUpe1xuICAgIHJldHVybiBvYmplY3RUb1N0cmluZy5hcHBseSh2YWx1ZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nXG59IiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmFwcGx5KHZhbHVlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcbn0iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJ1xufSIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgIHByZWZpeFByb3BlcnRpZXM6IHJlcXVpcmUoJy4vc3JjL3ByZWZpeFByb3BlcnRpZXMnKSAsXG4gICBvYmplY3Q6IHJlcXVpcmUoJy4vc3JjL3RvU3R5bGVPYmplY3QnKSxcbiAgIHN0cmluZzogcmVxdWlyZSgnLi9zcmMvdG9TdHlsZVN0cmluZycpXG59IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdG9Mb3dlckZpcnN0ICAgICA6IHJlcXVpcmUoJy4vc3JjL3RvTG93ZXJGaXJzdCcpLFxuICAgIHRvVXBwZXJGaXJzdCAgICAgOiByZXF1aXJlKCcuL3NyYy90b1VwcGVyRmlyc3QnKSxcbiAgICBzZXBhcmF0ZSAgICAgICAgIDogcmVxdWlyZSgnLi9zcmMvc2VwYXJhdGUnKSxcbiAgICBzdHJpcFdoaXRlc3BhY2UgIDogcmVxdWlyZSgnLi9zcmMvc3RyaXBXaGl0ZXNwYWNlJyksXG4gICAgY29tcGFjdFdoaXRlc3BhY2U6IHJlcXVpcmUoJy4vc3JjL2NvbXBhY3RXaGl0ZXNwYWNlJyksXG4gICAgY2FtZWxpemUgICAgICAgICA6IHJlcXVpcmUoJy4vc3JjL2NhbWVsaXplJyksXG4gICAgaHVtYW5pemUgICAgICAgICA6IHJlcXVpcmUoJy4vc3JjL2h1bWFuaXplJyksXG4gICAgaHlwaGVuYXRlICAgICAgICA6IHJlcXVpcmUoJy4vc3JjL2h5cGhlbmF0ZScpLFxuXG4gICAgaXM6IHJlcXVpcmUoJy4vc3JjL2lzJylcbn0iLCIgICAgLyoqXHJcbiAgICAgKiBVdGlsaXR5IG1ldGhvZHMgZm9yIHdvcmtpbmcgd2l0aCBmdW5jdGlvbnMuXHJcbiAgICAgKiBUaGVzZSBtZXRob2RzIGF1Z21lbnQgdGhlIEZ1bmN0aW9uIHByb3RvdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBVc2luZyB7QGxpbmsgI2JlZm9yZX1cclxuICAgICAqXHJcbiAgICAgKiAgICAgIGZ1bmN0aW9uIGxvZyhtKXtcclxuICAgICAqICAgICAgICAgIGNvbnNvbGUubG9nKG0pXHJcbiAgICAgKiAgICAgIH1cclxuICAgICAqXHJcbiAgICAgKiAgICAgIHZhciBkb0xvZyA9IGZ1bmN0aW9uIChtKXtcclxuICAgICAqICAgICAgICAgIGNvbnNvbGUubG9nKCdMT0cgJylcclxuICAgICAqICAgICAgfS5iZWZvcmUobG9nKVxyXG4gICAgICpcclxuICAgICAqICAgICAgZG9Mb2coJ3Rlc3QnKVxyXG4gICAgICogICAgICAvL3dpbGwgbG9nXHJcbiAgICAgKiAgICAgIC8vXCJMT0cgXCJcclxuICAgICAqICAgICAgLy9hbmQgdGhlblxyXG4gICAgICogICAgICAvL1widGVzdFwiXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBVc2luZyB7QGxpbmsgI2JpbmRBcmdzfTpcclxuICAgICAqXHJcbiAgICAgKiAgICAgIC8vcmV0dXJucyB0aGUgc3VtIG9mIGFsbCBhcmd1bWVudHNcclxuICAgICAqICAgICAgZnVuY3Rpb24gYWRkKCl7XHJcbiAgICAgKiAgICAgICAgICB2YXIgc3VtID0gMFxyXG4gICAgICogICAgICAgICAgW10uZnJvbShhcmd1bWVudHMpLmZvckVhY2goZnVuY3Rpb24obil7XHJcbiAgICAgKiAgICAgICAgICAgICAgc3VtICs9IG5cclxuICAgICAqICAgICAgICAgIH0pXHJcbiAgICAgKlxyXG4gICAgICogICAgICAgICAgcmV0dXJuIHN1bVxyXG4gICAgICogICAgICB9XHJcbiAgICAgKlxyXG4gICAgICogICAgICB2YXIgYWRkMSA9IGFkZC5iaW5kQXJncygxKVxyXG4gICAgICpcclxuICAgICAqICAgICAgYWRkMSgyLCAzKSA9PSA2XHJcbiAgICAgKlxyXG4gICAgICogVXNpbmcge0BsaW5rICNsb2NrQXJnc306XHJcbiAgICAgKlxyXG4gICAgICogICAgICBmdW5jdGlvbiBhZGQoKXtcclxuICAgICAqICAgICAgICAgIHZhciBzdW0gPSAwXHJcbiAgICAgKiAgICAgICAgICBbXS5mcm9tKGFyZ3VtZW50cykuZm9yRWFjaChmdW5jdGlvbihuKXtcclxuICAgICAqICAgICAgICAgICAgICBzdW0gKz0gblxyXG4gICAgICogICAgICAgICAgfSlcclxuICAgICAqXHJcbiAgICAgKiAgICAgICAgICByZXR1cm4gc3VtXHJcbiAgICAgKiAgICAgIH1cclxuICAgICAqXHJcbiAgICAgKiAgICAgIHZhciBhZGQxXzIgICA9IGFkZC5sb2NrQXJncygxLDIpXHJcbiAgICAgKiAgICAgIHZhciBhZGQxXzJfMyA9IGFkZC5sb2NrQXJncygxLDIsMylcclxuICAgICAqXHJcbiAgICAgKiAgICAgIGFkZDFfMigzLDQpICA9PSAzIC8vYXJncyBhcmUgbG9ja2VkIHRvIG9ubHkgYmUgMSBhbmQgMlxyXG4gICAgICogICAgICBhZGQxXzJfMyg2KSAgPT0gNiAvL2FyZ3MgYXJlIGxvY2tlZCB0byBvbmx5IGJlIDEsIDIgYW5kIDNcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIFVzaW5nIHtAbGluayAjY29tcG9zZX06XHJcbiAgICAgKlxyXG4gICAgICogICAgICBmdW5jdGlvbiBtdWx0aXBseShhLGIpe1xyXG4gICAgICogICAgICAgICAgcmV0dXJuIGEqIGJcclxuICAgICAqICAgICAgfVxyXG4gICAgICpcclxuICAgICAqICAgICAgdmFyIG11bHRpcGx5MiA9IG11bHRpcGx5LmN1cnJ5KCkoMilcclxuICAgICAqXHJcbiAgICAgKiAgICAgIEZ1bmN0aW9uLmNvbXBvc2UobXVsdGlwbHkyKCBhZGQoNSw2KSApKSA9PSBtdWx0aXBseTIoIGFkZCg1LDYpIClcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQGNsYXNzIEZ1bmN0aW9uXHJcbiAgICAgKi9cclxuXHJcbiAgICB2YXIgU0xJQ0UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcclxuXHJcbiAgICB2YXIgY29tcG9zZVR3byA9IGZ1bmN0aW9uKGYsIGcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmKGcuYXBwbHkodGhpcywgYXJndW1lbnRzKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGN1cnJ5ID0gZnVuY3Rpb24oZm4sIG4pe1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInKXtcclxuICAgICAgICAgICAgICAgIG4gPSBmbi5sZW5ndGhcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0Q3VycnlDbG9zdXJlKHByZXZBcmdzKXtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjdXJyeUNsb3N1cmUoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW4gID0gYXJndW1lbnRzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncyA9IFtdLmNvbmNhdChwcmV2QXJncylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaC5hcHBseShhcmdzLCBhcmd1bWVudHMpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBuKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldEN1cnJ5Q2xvc3VyZShhcmdzKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJ5Q2xvc3VyZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2V0Q3VycnlDbG9zdXJlKFtdKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpbmQgPSBjdXJyeShmdW5jdGlvbihmbiwgdGFyZ2V0KXtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQuZmluZCA9PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQuZmluZChmbilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSAgID0gMFxyXG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IHRhcmdldC5sZW5ndGhcclxuICAgICAgICAgICAgICAgIHZhciBpdFxyXG5cclxuICAgICAgICAgICAgICAgIGZvcig7IGkgPCBsZW47IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXQgPSB0YXJnZXRbaV1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm4oaXQsIGksIHRhcmdldCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwXHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuID0ga2V5cy5sZW5ndGhcclxuICAgICAgICAgICAgICAgIHZhciBrXHJcbiAgICAgICAgICAgICAgICB2YXIgaXRcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IoIDsgaSA8IGxlbjsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBrICA9IGtleXNbaV1cclxuICAgICAgICAgICAgICAgICAgICBpdCA9IHRhcmdldFtrXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm4oaXQsIGssIHRhcmdldCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgYmluZEZ1bmN0aW9uc09mID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbihrKXtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2tdID09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialtrXSA9IG9ialtrXS5iaW5kKG9iailcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvYmpcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb24uLi59IGFuIGVudW1lcmF0aW9uIG9mIGZ1bmN0aW9ucywgZWFjaCBjb25zdW1pbmcgdGhlIHJlc3VsdCBvZiB0aGUgZm9sbG93aW5nIGZ1bmN0aW9uLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogRm9yIGV4YW1wbGU6IGNvbXBvc2UoYywgYiwgYSkoMSw0KSA9PSBjKGIoYSgxLDQpKSlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgZmlyc3QgZnVuY3Rpb24gaW4gdGhlIGVudW1lcmF0aW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29tcG9zZSA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50c1xyXG4gICAgICAgICAgICB2YXIgbGVuICA9IGFyZ3MubGVuZ3RoXHJcbiAgICAgICAgICAgIHZhciBpICAgID0gMFxyXG4gICAgICAgICAgICB2YXIgZiAgICA9IGFyZ3NbMF1cclxuXHJcbiAgICAgICAgICAgIHdoaWxlICgrK2kgPCBsZW4pIHtcclxuICAgICAgICAgICAgICAgIGYgPSBjb21wb3NlVHdvKGYsIGFyZ3NbaV0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2hhaW4gPSBmdW5jdGlvbih3aGVyZSwgZm4sIHNlY29uZEZuKXtcclxuICAgICAgICAgICAgdmFyIGZucyA9IFtcclxuICAgICAgICAgICAgICAgIHdoZXJlID09PSAnYmVmb3JlJz8gc2Vjb25kRm46IGZuLFxyXG4gICAgICAgICAgICAgICAgd2hlcmUgIT09ICdiZWZvcmUnPyBzZWNvbmRGbjogZm5cclxuICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZiAod2hlcmUgPT09ICdiZWZvcmUnKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAod2hlcmUgIT09ICdiZWZvcmUnKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZm9yd2FyZCA9IGZ1bmN0aW9uKGZuLCBzY29wZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBmbi5iaW5kP1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGZuLmJpbmQoc2NvcGUpOlxyXG4gICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkoc2NvcGUsIGFyZ3VtZW50cylcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25jZSA9IGZ1bmN0aW9uKGZuLCBzY29wZSl7XHJcbiAgICAgICAgICAgIHZhciBjYWxsZWQgPSBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJlc3VsdFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGVkKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgPSBmbi5jYWxsKHNjb3BlIHx8IHRoaXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaW5kQXJnc0FycmF5ID0gZnVuY3Rpb24oZm4sIGFyZ3Mpe1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzQXJncyA9IFNMSUNFLmNhbGwoYXJncyB8fCBbXSlcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc0FyZ3MucHVzaC5hcHBseSh0aGlzQXJncywgYXJndW1lbnRzKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCB0aGlzQXJncylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJpbmRBcmdzID0gZnVuY3Rpb24oZm4pe1xyXG4gICAgICAgICAgICByZXR1cm4gYmluZEFyZ3NBcnJheShmbiwgU0xJQ0UuY2FsbChhcmd1bWVudHMsMSkpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9jayA9IGZ1bmN0aW9uKGZuLCBzY29wZSl7XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gU0xJQ0UuY2FsbChhcmd1bWVudHMsIDIpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShzY29wZSwgYXJncylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxvY2tBcmdzQXJyYXkgPSBmdW5jdGlvbihmbiwgYXJncyl7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcmdzKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IFNMSUNFLmNhbGwoYXJncyB8fCBbXSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxvY2tBcmdzID0gZnVuY3Rpb24oZm4pe1xyXG4gICAgICAgICAgICByZXR1cm4gbG9ja0FyZ3NBcnJheShmbiwgU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpIClcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBza2lwQXJncyA9IGZ1bmN0aW9uKGZuLCBjb3VudCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBTTElDRS5jYWxsKGFyZ3VtZW50cywgY291bnQgfHwgMClcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGludGVyY2VwdCA9IGZ1bmN0aW9uKGludGVyY2VwdGVkRm4sIGludGVyY2VwdGluZ0ZuLCB3aXRoU3RvcEFyZyl7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHZhciBhcmdzICAgID0gW10uZnJvbShhcmd1bWVudHMpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3BBcmcgPSB7IHN0b3A6IGZhbHNlIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAod2l0aFN0b3BBcmcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdG9wQXJnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBpbnRlcmNlcHRpbmdGbi5hcHBseSh0aGlzLCBhcmdzKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3aXRoU3RvcEFyZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0b3BBcmcuc3RvcCA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy90aGUgaW50ZXJjZXB0aW9uIHdhcyBub3Qgc3RvcHBlZFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVyY2VwdGVkRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRlbGF5ID0gZnVuY3Rpb24oZm4sIGRlbGF5LCBzY29wZSl7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVsYXlJc051bWJlciA9IGRlbGF5ICogMSA9PSBkZWxheVxyXG5cclxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMiAmJiAhZGVsYXlJc051bWJlcil7XHJcbiAgICAgICAgICAgICAgICBzY29wZSA9IGRlbGF5XHJcbiAgICAgICAgICAgICAgICBkZWxheSA9IDBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghZGVsYXlJc051bWJlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsYXkgPSAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSBzY29wZSB8fCB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHNcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsYXkgPCAwKXtcclxuICAgICAgICAgICAgICAgICAgICBmbi5hcHBseShzZWxmLCBhcmdzKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkZWxheSB8fCAhc2V0SW1tZWRpYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLmFwcGx5KHNlbGYsIGFyZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZGVsYXkpXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uYXBwbHkoc2VsZiwgYXJncylcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVmZXIgPSBmdW5jdGlvbihmbiwgc2NvcGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gZGVsYXkoZm4sIDAsIHNjb3BlKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJ1ZmZlciA9IGZ1bmN0aW9uKGZuLCBkZWxheSwgc2NvcGUpe1xyXG5cclxuICAgICAgICAgICAgdmFyIHRpbWVvdXRJZCA9IC0xXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHNjb3BlIHx8IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50c1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkZWxheSA8IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLmFwcGx5KHNlbGYsIGFyZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdpdGhUaW1lb3V0ID0gZGVsYXkgfHwgIXNldEltbWVkaWF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckZuID0gd2l0aFRpbWVvdXQ/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldEZuICAgPSB3aXRoVGltZW91dD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aW1lb3V0SWQgIT09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckZuKHRpbWVvdXRJZClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0SWQgPSBzZXRGbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLmFwcGx5KHNlbGYsIGFyZ3MpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZiA9IG51bGxcclxuICAgICAgICAgICAgICAgIH0sIGRlbGF5KVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0aHJvdHRsZSA9IGZ1bmN0aW9uKGZuLCBkZWxheSwgc2NvcGUpIHtcclxuICAgICAgICAgICAgdmFyIHRpbWVvdXRJZCA9IC0xLFxyXG4gICAgICAgICAgICAgICAgc2VsZixcclxuICAgICAgICAgICAgICAgIGFyZ3NcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZiA9IHNjb3BlIHx8IHRoaXNcclxuICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHNcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGltZW91dElkICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIGZ1bmN0aW9uIHdhcyBjYWxsZWQgb25jZSBhZ2FpbiBpbiB0aGUgZGVsYXkgaW50ZXJ2YWxcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLmFwcGx5KHNlbGYsIGFyZ3MpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0SWQgPSAtMVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGRlbGF5KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtYXhBcmdzID0gZnVuY3Rpb24oZm4sIGNvdW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgU0xJQ0UuY2FsbChhcmd1bWVudHMsIDAsIGNvdW50KSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNwcmVhZCA9IGZ1bmN0aW9uKGZuLCBkZWxheSwgc2NvcGUpe1xyXG5cclxuICAgICAgICAgICAgdmFyIHRpbWVvdXRJZCAgICAgICA9IC0xXHJcbiAgICAgICAgICAgIHZhciBjYWxsQ291bnQgICAgICAgPSAwXHJcbiAgICAgICAgICAgIHZhciBleGVjdXRlQ291bnQgICAgPSAwXHJcbiAgICAgICAgICAgIHZhciBuZXh0QXJncyAgICAgICAgPSB7fVxyXG4gICAgICAgICAgICB2YXIgaW5jcmVhc2VDb3VudGVyID0gdHJ1ZVxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0aW5nRm5VbmJvdW5kXHJcbiAgICAgICAgICAgIHZhciByZXN1bHRpbmdGblxyXG5cclxuICAgICAgICAgICAgcmVzdWx0aW5nRm4gPSByZXN1bHRpbmdGblVuYm91bmQgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYgPSBzY29wZSB8fCB0aGlzXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluY3JlYXNlQ291bnRlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFyZ3NbY2FsbENvdW50KytdID0ge2FyZ3M6IGFyZ3MsIHNjb3BlOiBzZWxmfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aW1lb3V0SWQgIT09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoZSBmdW5jdGlvbiB3YXMgY2FsbGVkIG9uY2UgYWdhaW4gaW4gdGhlIGRlbGF5IGludGVydmFsXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uYXBwbHkoc2VsZiwgYXJncylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXRJZCA9IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVDb3VudCsrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbENvdW50ICE9PSBleGVjdXRlQ291bnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0aW5nRm4gPSBiaW5kQXJnc0FycmF5KHJlc3VsdGluZ0ZuVW5ib3VuZCwgbmV4dEFyZ3NbZXhlY3V0ZUNvdW50XS5hcmdzKS5iaW5kKG5leHRBcmdzW2V4ZWN1dGVDb3VudF0uc2NvcGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbmV4dEFyZ3NbZXhlY3V0ZUNvdW50XVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlYXNlQ291bnRlciA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRpbmdGbi5hcHBseShzZWxmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jcmVhc2VDb3VudGVyID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFyZ3MgPSB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZGVsYXkpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0aW5nRm5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgdGhlIGFycmF5IGZvciB3aGljaCB0byBjcmVhdGUgYSBjYWNoZSBrZXlcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gW2NhY2hlUGFyYW1OdW1iZXJdIHRoZSBudW1iZXIgb2YgYXJncyB0byB1c2UgZm9yIHRoZSBjYWNoZSBrZXkuIFVzZSB0aGlzIHRvIGxpbWl0IHRoZSBhcmdzIHRoYXQgYXJlYSBhY3R1YWxseSB1c2VkIGZvciB0aGUgY2FjaGUga2V5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0Q2FjaGVLZXkgPSBmdW5jdGlvbihhcmdzLCBjYWNoZVBhcmFtTnVtYmVyKXtcclxuICAgICAgICAgICAgaWYgKGNhY2hlUGFyYW1OdW1iZXIgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBjYWNoZVBhcmFtTnVtYmVyID0gLTFcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGkgICAgICAgID0gMCxcclxuICAgICAgICAgICAgICAgIGxlbiAgICAgID0gTWF0aC5taW4oYXJncy5sZW5ndGgsIGNhY2hlUGFyYW1OdW1iZXIpLFxyXG4gICAgICAgICAgICAgICAgY2FjaGVLZXkgPSBbXSxcclxuICAgICAgICAgICAgICAgIGl0XHJcblxyXG4gICAgICAgICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpdCA9IGFyZ3NbaV1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocm9vdC5jaGVjay5pc1BsYWluT2JqZWN0KGl0KSB8fCBBcnJheS5pc0FycmF5KGl0KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVLZXkucHVzaChKU09OLnN0cmluZ2lmeShpdCkpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlS2V5LnB1c2goU3RyaW5nKGl0KSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlS2V5LmpvaW4oJywgJylcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gdGhlIGZ1bmN0aW9uIHRvIGNhY2hlIHJlc3VsdHMgZm9yXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHNraXBDYWNoZVBhcmFtTnVtYmVyIC0gdGhlIGluZGV4IG9mIHRoZSBib29sZWFuIHBhcmFtZXRlciB0aGF0IG1ha2VzIHRoaXMgZnVuY3Rpb24gc2tpcCB0aGUgY2FjaGluZyBhbmRcclxuICAgICAgICAgKiBhY3R1YWxseSByZXR1cm4gY29tcHV0ZWQgcmVzdWx0cy5cclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FjaGVCdWNrZXRNZXRob2QgLSBhIGZ1bmN0aW9uIG9yIHRoZSBuYW1lIG9mIGEgbWV0aG9kIG9uIHRoaXMgb2JqZWN0IHdoaWNoIG1ha2VzIGNhY2hpbmcgZGlzdHJpYnV0ZWQgYWNyb3NzIG11bHRpcGxlIGJ1Y2tldHMuXHJcbiAgICAgICAgICogSWYgZ2l2ZW4sIGNhY2hlZCByZXN1bHRzIHdpbGwgYmUgc2VhcmNoZWQgaW50byB0aGUgY2FjaGUgY29ycmVzcG9uZGluZyB0byB0aGlzIGJ1Y2tldC4gSWYgbm8gcmVzdWx0IGZvdW5kLCByZXR1cm4gY29tcHV0ZWQgcmVzdWx0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogRm9yIGV4YW1wbGUgdGhpcyBwYXJhbSBpcyB2ZXJ5IHVzZWZ1bCB3aGVuIGEgZnVuY3Rpb24gZnJvbSBhIHByb3RvdHlwZSBpcyBjYWNoZWQsXHJcbiAgICAgICAgICogYnV0IHdlIHdhbnQgdG8gcmV0dXJuIHRoZSBzYW1lIGNhY2hlZCByZXN1bHRzIG9ubHkgZm9yIG9uZSBvYmplY3QgdGhhdCBpbmhlcml0cyB0aGF0IHByb3RvLCBub3QgZm9yIGFsbCBvYmplY3RzLiBUaHVzLCBmb3IgZXhhbXBsZSBmb3IgV2VzLkVsZW1lbnQsXHJcbiAgICAgICAgICogd2UgdXNlIHRoZSAnZ2V0SWQnIGNhY2hlQnVja2V0TWV0aG9kIHRvIGluZGljYXRlIGNhY2hlZCByZXN1bHRzIGZvciBvbmUgb2JqZWN0IG9ubHkuXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhY2hlS2V5QnVpbGRlcl0gQSBmdW5jdGlvbiB0byBiZSB1c2VkIHRvIGNvbXBvc2UgdGhlIGNhY2hlIGtleVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IGEgbmV3IGZ1bmN0aW9uLCB3aGljaCByZXR1cm5zIHJlc3VsdHMgZnJvbSBjYWNoZSwgaWYgdGhleSBhcmUgYXZhaWxhYmxlLCBvdGhlcndpc2UgdXNlcyB0aGUgZ2l2ZW4gZm4gdG8gY29tcHV0ZSB0aGUgcmVzdWx0cy5cclxuICAgICAgICAgKiBUaGlzIHJldHVybmVkIGZ1bmN0aW9uIGhhcyBhICdjbGVhckNhY2hlJyBmdW5jdGlvbiBhdHRhY2hlZCwgd2hpY2ggY2xlYXJzIHRoZSBjYWNoaW5nLiBJZiBhIHBhcmFtZXRlciAoIGEgYnVja2V0IGlkKSBpcyAgcHJvdmlkZWQsXHJcbiAgICAgICAgICogb25seSBjbGVhcnMgdGhlIGNhY2hlIGluIHRoZSBzcGVjaWZpZWQgY2FjaGUgYnVja2V0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNhY2hlID0gZnVuY3Rpb24oZm4sIGNvbmZpZyl7XHJcbiAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fVxyXG5cclxuICAgICAgICAgICAgdmFyIGJ1Y2tldENhY2hlID0ge30sXHJcbiAgICAgICAgICAgICAgICBjYWNoZSAgICAgICA9IHt9LFxyXG4gICAgICAgICAgICAgICAgc2tpcENhY2hlUGFyYW1OdW1iZXIgPSBjb25maWcuc2tpcENhY2hlSW5kZXgsXHJcbiAgICAgICAgICAgICAgICBjYWNoZUJ1Y2tldE1ldGhvZCAgICA9IGNvbmZpZy5jYWNoZUJ1Y2tldCxcclxuICAgICAgICAgICAgICAgIGNhY2hlS2V5QnVpbGRlciAgICAgID0gY29uZmlnLmNhY2hlS2V5LFxyXG4gICAgICAgICAgICAgICAgY2FjaGVBcmdzTGVuZ3RoICAgICAgPSBza2lwQ2FjaGVQYXJhbU51bWJlciA9PSBudWxsP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmxlbmd0aDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lwQ2FjaGVQYXJhbU51bWJlcixcclxuICAgICAgICAgICAgICAgIGNhY2hpbmdGblxyXG5cclxuICAgICAgICAgICAgY2FjaGluZ0ZuID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcENhY2hlID0gc2tpcENhY2hlUGFyYW1OdW1iZXIgIT0gbnVsbD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRzW3NraXBDYWNoZVBhcmFtTnVtYmVyXSA9PT0gdHJ1ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IHNraXBDYWNoZT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU0xJQ0UuY2FsbChhcmd1bWVudHMsIDAsIGNhY2hlQXJnc0xlbmd0aCk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNMSUNFLmNhbGwoYXJndW1lbnRzKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVCdWNrZXRJZCA9IGNhY2hlQnVja2V0TWV0aG9kICE9IG51bGw/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgY2FjaGVCdWNrZXRNZXRob2QgPT0gJ2Z1bmN0aW9uJz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZUJ1Y2tldE1ldGhvZCgpOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzW2NhY2hlQnVja2V0TWV0aG9kXSA9PSAnZnVuY3Rpb24nP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2NhY2hlQnVja2V0TWV0aG9kXSgpOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVPYmplY3QgPSBjYWNoZUJ1Y2tldElkP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVja2V0Q2FjaGVbY2FjaGVCdWNrZXRJZF06XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVLZXkgPSAoY2FjaGVLZXlCdWlsZGVyIHx8IGdldENhY2hlS2V5KShhcmdzLCBjYWNoZUFyZ3NMZW5ndGgpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlQnVja2V0SWQgJiYgIWNhY2hlT2JqZWN0KXtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZU9iamVjdCA9IGJ1Y2tldENhY2hlW2NhY2hlQnVja2V0SWRdID0ge31cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2tpcENhY2hlIHx8IGNhY2hlT2JqZWN0W2NhY2hlS2V5XSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZU9iamVjdFtjYWNoZUtleV0gPSByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBjYWNoZU9iamVjdFtjYWNoZUtleV1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxOdW1iZXJ9IFtidWNrZXRJZF0gdGhlIGJ1Y2tldCBmb3Igd2hpY2ggdG8gY2xlYXIgdGhlIGNhY2hlLiBJZiBub25lIGdpdmVuLCBjbGVhcnMgYWxsIHRoZSBjYWNoZSBmb3IgdGhpcyBmdW5jdGlvbi5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNhY2hpbmdGbi5jbGVhckNhY2hlID0gZnVuY3Rpb24oYnVja2V0SWQpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1Y2tldElkKXtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYnVja2V0Q2FjaGVbU3RyaW5nKGJ1Y2tldElkKV1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUgPSB7fVxyXG4gICAgICAgICAgICAgICAgICAgIGJ1Y2tldENhY2hlID0ge31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtIHtBcnJheX0gY2FjaGVBcmdzIFRoZSBhcnJheSBvZiBvYmplY3RzIGZyb20gd2hpY2ggdG8gY3JlYXRlIHRoZSBjYWNoZSBrZXlcclxuICAgICAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjYWNoZVBhcmFtTnVtYmVyXSBBIGxpbWl0IGZvciB0aGUgY2FjaGUgYXJncyB0aGF0IGFyZSBhY3R1YWxseSB1c2VkIHRvIGNvbXB1dGUgdGhlIGNhY2hlIGtleS5cclxuICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhY2hlS2V5QnVpbGRlcl0gVGhlIGZ1bmN0aW9uIHRvIGJlIHVzZWQgdG8gY29tcHV0ZSB0aGUgY2FjaGUga2V5IGZyb20gdGhlIGdpdmVuIGNhY2hlQXJncyBhbmQgY2FjaGVQYXJhbU51bWJlclxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY2FjaGluZ0ZuLmdldENhY2hlID0gZnVuY3Rpb24oY2FjaGVBcmdzLCBjYWNoZVBhcmFtTnVtYmVyLCBjYWNoZUtleUJ1aWxkZXIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hpbmdGbi5nZXRCdWNrZXRDYWNoZShudWxsLCBjYWNoZUFyZ3MsIGNhY2hlUGFyYW1OdW1iZXIsIGNhY2hlS2V5QnVpbGRlcilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGJ1Y2tldElkIFRoZSBpZCBvZiB0aGUgY2FjaGUgYnVja2V0IGZyb20gd2hpY2ggdG8gcmV0cmlldmUgdGhlIGNhY2hlZCB2YWx1ZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBjYWNoZUFyZ3MgVGhlIGFycmF5IG9mIG9iamVjdHMgZnJvbSB3aGljaCB0byBjcmVhdGUgdGhlIGNhY2hlIGtleVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gW2NhY2hlUGFyYW1OdW1iZXJdIEEgbGltaXQgZm9yIHRoZSBjYWNoZSBhcmdzIHRoYXQgYXJlIGFjdHVhbGx5IHVzZWQgdG8gY29tcHV0ZSB0aGUgY2FjaGUga2V5LlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FjaGVLZXlCdWlsZGVyXSBUaGUgZnVuY3Rpb24gdG8gYmUgdXNlZCB0byBjb21wdXRlIHRoZSBjYWNoZSBrZXkgZnJvbSB0aGUgZ2l2ZW4gY2FjaGVBcmdzIGFuZCBjYWNoZVBhcmFtTnVtYmVyXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjYWNoaW5nRm4uZ2V0QnVja2V0Q2FjaGUgPSBmdW5jdGlvbihidWNrZXRJZCwgY2FjaGVBcmdzLCBjYWNoZVBhcmFtTnVtYmVyLCBjYWNoZUtleUJ1aWxkZXIpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNhY2hlT2JqZWN0ID0gY2FjaGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVLZXkgPSAoY2FjaGVLZXlCdWlsZGVyIHx8IGdldENhY2hlS2V5KShjYWNoZUFyZ3MsIGNhY2hlUGFyYW1OdW1iZXIpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJ1Y2tldElkKXtcclxuICAgICAgICAgICAgICAgICAgICBidWNrZXRJZCA9IFN0cmluZyhidWNrZXRJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlT2JqZWN0ID0gYnVja2V0Q2FjaGVbYnVja2V0SWRdID0gYnVja2V0Q2FjaGVbYnVja2V0SWRdIHx8IHt9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlT2JqZWN0W2NhY2hlS2V5XVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldCBpbiB0aGUgY2FjaGVcclxuICAgICAgICAgICAgICogQHBhcmFtIHtBcnJheX0gY2FjaGVBcmdzIFRoZSBhcnJheSBvZiBvYmplY3RzIGZyb20gd2hpY2ggdG8gY3JlYXRlIHRoZSBjYWNoZSBrZXlcclxuICAgICAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjYWNoZVBhcmFtTnVtYmVyXSBBIGxpbWl0IGZvciB0aGUgY2FjaGUgYXJncyB0aGF0IGFyZSBhY3R1YWxseSB1c2VkIHRvIGNvbXB1dGUgdGhlIGNhY2hlIGtleS5cclxuICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhY2hlS2V5QnVpbGRlcl0gVGhlIGZ1bmN0aW9uIHRvIGJlIHVzZWQgdG8gY29tcHV0ZSB0aGUgY2FjaGUga2V5IGZyb20gdGhlIGdpdmVuIGNhY2hlQXJncyBhbmQgY2FjaGVQYXJhbU51bWJlclxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY2FjaGluZ0ZuLnNldENhY2hlID0gZnVuY3Rpb24odmFsdWUsIGNhY2hlQXJncywgY2FjaGVQYXJhbU51bWJlciwgY2FjaGVLZXlCdWlsZGVyKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoaW5nRm4uc2V0QnVja2V0Q2FjaGUobnVsbCwgdmFsdWUsIGNhY2hlQXJncywgY2FjaGVQYXJhbU51bWJlciwgY2FjaGVLZXlCdWlsZGVyKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gYnVja2V0SWQgVGhlIGlkIG9mIHRoZSBjYWNoZSBidWNrZXQgZm9yIHdoaWNoIHRvIHNldCB0aGUgY2FjaGUgdmFsdWVcclxuICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgaW4gdGhlIGNhY2hlXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGNhY2hlQXJncyBUaGUgYXJyYXkgb2Ygb2JqZWN0cyBmcm9tIHdoaWNoIHRvIGNyZWF0ZSB0aGUgY2FjaGUga2V5XHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbY2FjaGVQYXJhbU51bWJlcl0gQSBsaW1pdCBmb3IgdGhlIGNhY2hlIGFyZ3MgdGhhdCBhcmUgYWN0dWFsbHkgdXNlZCB0byBjb21wdXRlIHRoZSBjYWNoZSBrZXkuXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWNoZUtleUJ1aWxkZXJdIFRoZSBmdW5jdGlvbiB0byBiZSB1c2VkIHRvIGNvbXB1dGUgdGhlIGNhY2hlIGtleSBmcm9tIHRoZSBnaXZlbiBjYWNoZUFyZ3MgYW5kIGNhY2hlUGFyYW1OdW1iZXJcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNhY2hpbmdGbi5zZXRCdWNrZXRDYWNoZSA9IGZ1bmN0aW9uKGJ1Y2tldElkLCB2YWx1ZSwgY2FjaGVBcmdzLCBjYWNoZVBhcmFtTnVtYmVyLCBjYWNoZUtleUJ1aWxkZXIpe1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjYWNoZU9iamVjdCA9IGNhY2hlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlS2V5ID0gKGNhY2hlS2V5QnVpbGRlciB8fCBnZXRDYWNoZUtleSkoY2FjaGVBcmdzLCBjYWNoZVBhcmFtTnVtYmVyKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChidWNrZXRJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVja2V0SWQgPSBTdHJpbmcoYnVja2V0SWQpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlT2JqZWN0ID0gYnVja2V0Q2FjaGVbYnVja2V0SWRdID0gYnVja2V0Q2FjaGVbYnVja2V0SWRdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZU9iamVjdFtjYWNoZUtleV0gPSB2YWx1ZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGluZ0ZuXHJcbiAgICAgICAgfVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgbWFwOiBjdXJyeShmdW5jdGlvbihmbiwgdmFsdWUpe1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSAhPSB1bmRlZmluZWQgJiYgdHlwZW9mIHZhbHVlLm1hcD9cclxuICAgICAgICAgICAgICAgIHZhbHVlLm1hcChmbik6XHJcbiAgICAgICAgICAgICAgICBmbih2YWx1ZSlcclxuICAgIH0pLFxyXG5cclxuICAgIGRvdDogY3VycnkoZnVuY3Rpb24ocHJvcCwgdmFsdWUpe1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSAhPSB1bmRlZmluZWQ/IHZhbHVlW3Byb3BdOiB1bmRlZmluZWRcclxuICAgIH0pLFxyXG5cclxuICAgIG1heEFyZ3M6IGN1cnJ5KG1heEFyZ3MpLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG1ldGhvZCBjb21wb3NlXHJcbiAgICAgKlxyXG4gICAgICogRXhhbXBsZTpcclxuICAgICAqXHJcbiAgICAgKiAgICAgIHppcHB5LkZ1bmN0aW9uLmNvbXBvc2UoYywgYiwgYSlcclxuICAgICAqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI2NvbXBvc2V9XHJcbiAgICAgKi9cclxuICAgIGNvbXBvc2U6IGNvbXBvc2UsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI3NlbGZ9XHJcbiAgICAgKi9cclxuICAgIHNlbGY6IGZ1bmN0aW9uKGZuKXtcclxuICAgICAgICByZXR1cm4gZm5cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI2J1ZmZlcn1cclxuICAgICAqL1xyXG4gICAgYnVmZmVyOiBidWZmZXIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI2RlbGF5fVxyXG4gICAgICovXHJcbiAgICBkZWxheTogZGVsYXksXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI2RlZmVyfVxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxyXG4gICAgICovXHJcbiAgICBkZWZlcjpkZWZlcixcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlZSB7QGxpbmsgRnVuY3Rpb24jc2tpcEFyZ3N9XHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb3VudD0wXSBob3cgbWFueSBhcmdzIHRvIHNraXAgd2hlbiBjYWxsaW5nIHRoZSByZXN1bHRpbmcgZnVuY3Rpb25cclxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgZnVuY3Rpb24gdGhhdCB3aWxsIGNhbGwgdGhlIG9yaWdpbmFsIGZuIHdpdGhvdXQgdGhlIGZpcnN0IGNvdW50IGFyZ3MuXHJcbiAgICAgKi9cclxuICAgIHNraXBBcmdzOiBza2lwQXJncyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlZSB7QGxpbmsgRnVuY3Rpb24jaW50ZXJjZXB0fVxyXG4gICAgICovXHJcbiAgICBpbnRlcmNlcHQ6IGZ1bmN0aW9uKGZuLCBpbnRlcmNlcHRlZEZuLCB3aXRoU3RvcEFyZ3Mpe1xyXG4gICAgICAgIHJldHVybiBpbnRlcmNlcHQoaW50ZXJjZXB0ZWRGbiwgZm4sIHdpdGhTdG9wQXJncylcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI3Rocm90dGxlfVxyXG4gICAgICovXHJcbiAgICB0aHJvdHRsZTogdGhyb3R0bGUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI3NwcmVhZH1cclxuICAgICAqL1xyXG4gICAgc3ByZWFkOiBzcHJlYWQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI2NoYWlufVxyXG4gICAgICovXHJcbiAgICBjaGFpbjogZnVuY3Rpb24oZm4sIHdoZXJlLCBtYWluRm4pe1xyXG4gICAgICAgIHJldHVybiBjaGFpbih3aGVyZSwgbWFpbkZuLCBmbilcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI2JlZm9yZX1cclxuICAgICAqL1xyXG4gICAgYmVmb3JlOiBmdW5jdGlvbihmbiwgb3RoZXJGbil7XHJcbiAgICAgICAgcmV0dXJuIGNoYWluKCdiZWZvcmUnLCBvdGhlckZuLCBmbilcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI2FmdGVyfVxyXG4gICAgICovXHJcbiAgICBhZnRlcjogZnVuY3Rpb24oZm4sIG90aGVyRm4pe1xyXG4gICAgICAgIHJldHVybiBjaGFpbignYWZ0ZXInLCBvdGhlckZuLCBmbilcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI2N1cnJ5fVxyXG4gICAgICovXHJcbiAgICBjdXJyeTogY3VycnksXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI2ZvcndhcmR9XHJcbiAgICAgKi9cclxuICAgIGZvcndhcmQ6IGZvcndhcmQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI29uY2V9XHJcbiAgICAgKi9cclxuICAgIG9uY2U6IG9uY2UsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUge0BsaW5rIEZ1bmN0aW9uI2JpbmRBcmdzfVxyXG4gICAgICovXHJcbiAgICBiaW5kQXJnczogZnVuY3Rpb24oZm4pe1xyXG4gICAgICAgIHJldHVybiBiaW5kQXJnc0FycmF5KGZuLCBTTElDRS5jYWxsKGFyZ3VtZW50cywgMSkpXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VlIHtAbGluayBGdW5jdGlvbiNiaW5kQXJnc0FycmF5fVxyXG4gICAgICovXHJcbiAgICBiaW5kQXJnc0FycmF5OiBiaW5kQXJnc0FycmF5LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VlIHtAbGluayBGdW5jdGlvbiNsb2NrQXJnc31cclxuICAgICAqL1xyXG4gICAgbG9ja0FyZ3M6IGZ1bmN0aW9uKGZuKXtcclxuICAgICAgICByZXR1cm4gbG9ja0FyZ3NBcnJheShmbiwgU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlZSB7QGxpbmsgRnVuY3Rpb24jbG9ja0FyZ3NBcnJheX1cclxuICAgICAqL1xyXG4gICAgbG9ja0FyZ3NBcnJheTogbG9ja0FyZ3NBcnJheSxcclxuXHJcbiAgICBiaW5kRnVuY3Rpb25zT2Y6IGJpbmRGdW5jdGlvbnNPZixcclxuXHJcbiAgICBmaW5kOiBmaW5kXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2lzZW1haWwnKTtcbiIsIihmdW5jdGlvbiAocHJvY2Vzcyl7XG4vKipcbiAqIFRvIHZhbGlkYXRlIGFuIGVtYWlsIGFkZHJlc3MgYWNjb3JkaW5nIHRvIFJGQ3MgNTMyMSwgNTMyMiBhbmQgb3RoZXJzXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMDgtMjAxMSwgRG9taW5pYyBTYXllcnNcbiAqIFRlc3Qgc2NoZW1hIGRvY3VtZW50YXRpb24gQ29weXJpZ2h0IMKpIDIwMTEsIERhbmllbCBNYXJzY2hhbGxcbiAqIFBvcnQgZm9yIE5vZGUuanMgQ29weXJpZ2h0IMKpIDIwMTMsIEdsb2JlU2hlcnBhXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogICAtIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICAtIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiAgICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgIC0gTmVpdGhlciB0aGUgbmFtZSBvZiBEb21pbmljIFNheWVycyBub3IgdGhlIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnMgbWF5XG4gKiAgICAgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dFxuICogICAgIHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIlxuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqIEBhdXRob3IgICAgICBEb21pbmljIFNheWVycyA8ZG9taW5pY0BzYXllcnMuY2M+XG4gKiBAYXV0aG9yICAgICAgRWxpIFNrZWdncyA8ZXNrZWdnc0BnbG9iZXNoZXJwYS5jb20+XG4gKiBAY29weXJpZ2h0ICAgMjAwOC0yMDExIERvbWluaWMgU2F5ZXJzXG4gKiBAY29weXJpZ2h0ICAgMjAxMy0yMDE0IEdsb2JlU2hlcnBhXG4gKiBAbGljZW5zZSAgICAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9ic2QtbGljZW5zZS5waHAgQlNEIExpY2Vuc2VcbiAqIEBsaW5rICAgICAgICBodHRwOi8vd3d3LmRvbWluaWNzYXllcnMuY29tL2lzZW1haWxcbiAqIEBsaW5rICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vZ2xvYmVzaGVycGEvaXNlbWFpbFxuICogQHZlcnNpb24gICAgIDEuMS4xIC0gT3B0aW1pemF0aW9uIHBhc3MsIHNpbXBsaWZ5IGNvbnN0YW50cywgc3R5bGUsIGRlYWQgY29kZS5cbiAqL1xuXG4vLyBsYXp5LWxvYWRlZFxudmFyIGRucywgSEFTX1JFUVVJUkUgPSB0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8vIGNhdGVnb3JpZXNcbnZhciBJU0VNQUlMX1ZBTElEX0NBVEVHT1JZID0gMTtcbnZhciBJU0VNQUlMX0ROU1dBUk4gPSA3O1xudmFyIElTRU1BSUxfUkZDNTMyMSA9IDE1O1xudmFyIElTRU1BSUxfQ0ZXUyA9IDMxO1xudmFyIElTRU1BSUxfREVQUkVDID0gNjM7XG52YXIgSVNFTUFJTF9SRkM1MzIyID0gMTI3O1xudmFyIElTRU1BSUxfRVJSID0gMjU1O1xuXG4vLyBkaWFnbm9zZXNcbi8vIGFkZHJlc3MgaXMgdmFsaWRcbnZhciBJU0VNQUlMX1ZBTElEID0gMDtcbi8vIGFkZHJlc3MgaXMgdmFsaWQgYnV0IGEgRE5TIGNoZWNrIHdhcyBub3Qgc3VjY2Vzc2Z1bFxudmFyIElTRU1BSUxfRE5TV0FSTl9OT19NWF9SRUNPUkQgPSA1O1xudmFyIElTRU1BSUxfRE5TV0FSTl9OT19SRUNPUkQgPSA2O1xuLy8gYWRkcmVzcyBpcyB2YWxpZCBmb3IgU01UUCBidXQgaGFzIHVudXN1YWwgZWxlbWVudHNcbnZhciBJU0VNQUlMX1JGQzUzMjFfVExEID0gOTtcbnZhciBJU0VNQUlMX1JGQzUzMjFfVExETlVNRVJJQyA9IDEwO1xudmFyIElTRU1BSUxfUkZDNTMyMV9RVU9URURTVFJJTkcgPSAxMTtcbnZhciBJU0VNQUlMX1JGQzUzMjFfQUREUkVTU0xJVEVSQUwgPSAxMjtcbnZhciBJU0VNQUlMX1JGQzUzMjFfSVBWNkRFUFJFQ0FURUQgPSAxMztcbi8vIGFkZHJlc3MgaXMgdmFsaWQgd2l0aGluIHRoZSBtZXNzYWdlIGJ1dCBjYW5ub3QgYmUgdXNlZCB1bm1vZGlmaWVkIGZvciB0aGVcbi8vIGVudmVsb3BlXG52YXIgSVNFTUFJTF9DRldTX0NPTU1FTlQgPSAxNztcbnZhciBJU0VNQUlMX0NGV1NfRldTID0gMTg7XG4vLyBhZGRyZXNzIGNvbnRhaW5zIGRlcHJlY2F0ZWQgZWxlbWVudHMgYnV0IG1heSBzdGlsbCBiZSB2YWxpZCBpbiByZXN0cmljdGVkXG4vLyBjb250ZXh0c1xudmFyIElTRU1BSUxfREVQUkVDX0xPQ0FMUEFSVCA9IDMzO1xudmFyIElTRU1BSUxfREVQUkVDX0ZXUyA9IDM0O1xudmFyIElTRU1BSUxfREVQUkVDX1FURVhUID0gMzU7XG52YXIgSVNFTUFJTF9ERVBSRUNfUVAgPSAzNjtcbnZhciBJU0VNQUlMX0RFUFJFQ19DT01NRU5UID0gMzc7XG52YXIgSVNFTUFJTF9ERVBSRUNfQ1RFWFQgPSAzODtcbnZhciBJU0VNQUlMX0RFUFJFQ19DRldTX05FQVJfQVQgPSA0OTtcbi8vIHRoZSBhZGRyZXNzIGlzIG9ubHkgdmFsaWQgYWNjb3JkaW5nIHRvIHRoZSBicm9hZCBkZWZpbml0aW9uIG9mIFJGQyA1MzIyLCBidXRcbi8vIG90aGVyd2lzZSBpbnZhbGlkXG52YXIgSVNFTUFJTF9SRkM1MzIyX0RPTUFJTiA9IDY1O1xudmFyIElTRU1BSUxfUkZDNTMyMl9UT09MT05HID0gNjY7XG52YXIgSVNFTUFJTF9SRkM1MzIyX0xPQ0FMX1RPT0xPTkcgPSA2NztcbnZhciBJU0VNQUlMX1JGQzUzMjJfRE9NQUlOX1RPT0xPTkcgPSA2ODtcbnZhciBJU0VNQUlMX1JGQzUzMjJfTEFCRUxfVE9PTE9ORyA9IDY5O1xudmFyIElTRU1BSUxfUkZDNTMyMl9ET01BSU5MSVRFUkFMID0gNzA7XG52YXIgSVNFTUFJTF9SRkM1MzIyX0RPTUxJVF9PQlNEVEVYVCA9IDcxO1xudmFyIElTRU1BSUxfUkZDNTMyMl9JUFY2X0dSUENPVU5UID0gNzI7XG52YXIgSVNFTUFJTF9SRkM1MzIyX0lQVjZfMlgyWENPTE9OID0gNzM7XG52YXIgSVNFTUFJTF9SRkM1MzIyX0lQVjZfQkFEQ0hBUiA9IDc0O1xudmFyIElTRU1BSUxfUkZDNTMyMl9JUFY2X01BWEdSUFMgPSA3NTtcbnZhciBJU0VNQUlMX1JGQzUzMjJfSVBWNl9DT0xPTlNUUlQgPSA3NjtcbnZhciBJU0VNQUlMX1JGQzUzMjJfSVBWNl9DT0xPTkVORCA9IDc3O1xuLy8gYWRkcmVzcyBpcyBpbnZhbGlkIGZvciBhbnkgcHVycG9zZVxudmFyIElTRU1BSUxfRVJSX0VYUEVDVElOR19EVEVYVCA9IDEyOTtcbnZhciBJU0VNQUlMX0VSUl9OT0xPQ0FMUEFSVCA9IDEzMDtcbnZhciBJU0VNQUlMX0VSUl9OT0RPTUFJTiA9IDEzMTtcbnZhciBJU0VNQUlMX0VSUl9DT05TRUNVVElWRURPVFMgPSAxMzI7XG52YXIgSVNFTUFJTF9FUlJfQVRFWFRfQUZURVJfQ0ZXUyA9IDEzMztcbnZhciBJU0VNQUlMX0VSUl9BVEVYVF9BRlRFUl9RUyA9IDEzNDtcbnZhciBJU0VNQUlMX0VSUl9BVEVYVF9BRlRFUl9ET01MSVQgPSAxMzU7XG52YXIgSVNFTUFJTF9FUlJfRVhQRUNUSU5HX1FQQUlSID0gMTM2O1xudmFyIElTRU1BSUxfRVJSX0VYUEVDVElOR19BVEVYVCA9IDEzNztcbnZhciBJU0VNQUlMX0VSUl9FWFBFQ1RJTkdfUVRFWFQgPSAxMzg7XG52YXIgSVNFTUFJTF9FUlJfRVhQRUNUSU5HX0NURVhUID0gMTM5O1xudmFyIElTRU1BSUxfRVJSX0JBQ0tTTEFTSEVORCA9IDE0MDtcbnZhciBJU0VNQUlMX0VSUl9ET1RfU1RBUlQgPSAxNDE7XG52YXIgSVNFTUFJTF9FUlJfRE9UX0VORCA9IDE0MjtcbnZhciBJU0VNQUlMX0VSUl9ET01BSU5IWVBIRU5TVEFSVCA9IDE0MztcbnZhciBJU0VNQUlMX0VSUl9ET01BSU5IWVBIRU5FTkQgPSAxNDQ7XG52YXIgSVNFTUFJTF9FUlJfVU5DTE9TRURRVU9URURTVFIgPSAxNDU7XG52YXIgSVNFTUFJTF9FUlJfVU5DTE9TRURDT01NRU5UID0gMTQ2O1xudmFyIElTRU1BSUxfRVJSX1VOQ0xPU0VERE9NTElUID0gMTQ3O1xudmFyIElTRU1BSUxfRVJSX0ZXU19DUkxGX1gyID0gMTQ4O1xudmFyIElTRU1BSUxfRVJSX0ZXU19DUkxGX0VORCA9IDE0OTtcbnZhciBJU0VNQUlMX0VSUl9DUl9OT19MRiA9IDE1MDtcbnZhciBJU0VNQUlMX0VSUl9VTktOT1dOX1RMRCA9IDE2MDtcbnZhciBJU0VNQUlMX0VSUl9UT09TSE9SVF9ET01BSU4gPSAxNjE7XG5cbi8vIGZ1bmN0aW9uIGNvbnRyb2xcbnZhciBUSFJFU0hPTEQgPSAxNjtcbi8vIGVtYWlsIHBhcnRzXG52YXIgQ09NUE9ORU5UX0xPQ0FMUEFSVCA9IDA7XG52YXIgQ09NUE9ORU5UX0RPTUFJTiA9IDE7XG52YXIgQ09NUE9ORU5UX0xJVEVSQUwgPSAyO1xudmFyIENPTlRFWFRfQ09NTUVOVCA9IDM7XG52YXIgQ09OVEVYVF9GV1MgPSA0O1xudmFyIENPTlRFWFRfUVVPVEVEU1RSSU5HID0gNTtcbnZhciBDT05URVhUX1FVT1RFRFBBSVIgPSA2O1xuXG4vLyBVUy1BU0NJSSB2aXNpYmxlIGNoYXJhY3RlcnMgbm90IHZhbGlkIGZvciBhdGV4dFxuLy8gKGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzUzMjIjc2VjdGlvbi0zLjIuMylcbnZhciBTUEVDSUFMUyA9ICcoKTw+W106O0BcXFxcLC5cIic7XG5cbmZ1bmN0aW9uIG9wdGltaXplTG9va3VwKHN0cmluZykge1xuICB2YXIgYm9keSA9ICcnLCBtaW4gPSAweDEwMCwgbWF4ID0gMCwgbG9va3VwID0gbmV3IEFycmF5KG1pbik7XG4gIGZvciAodmFyIGkgPSBtaW4gLSAxOyBpID49IDA7IGktLSkge1xuICAgIGxvb2t1cFtpXSA9IGZhbHNlO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNociA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjaHIgPCBtaW4pIHtcbiAgICAgIG1pbiA9IGNocjtcbiAgICB9XG4gICAgaWYgKGNociA+IG1heCkge1xuICAgICAgbWF4ID0gY2hyO1xuICAgIH1cbiAgICBsb29rdXBbY2hyXSA9IHRydWU7XG4gIH1cbiAgbG9va3VwLmxlbmd0aCA9IG1heDtcbiAgdmFyIGJvZHkgPSAndmFyIGxvb2t1cCA9ICcgKyBKU09OLnN0cmluZ2lmeShsb29rdXApICsgJztcXG4nO1xuICBib2R5ICs9ICdyZXR1cm4gZnVuY3Rpb24oY29kZSkge1xcbic7XG4gIGJvZHkgKz0gJyAgaWYgKGNvZGUgPCAnICsgbWluICsgJyB8fCBjb2RlID4gJyArIG1heCArICcpIHtcXG4nO1xuICBib2R5ICs9ICcgICAgcmV0dXJuIGZhbHNlO1xcbic7XG4gIGJvZHkgKz0gJyAgfVxcbic7XG4gIGJvZHkgKz0gJyAgcmV0dXJuIGxvb2t1cFtjb2RlXTtcXG4nO1xuICBib2R5ICs9ICd9JztcbiAgcmV0dXJuIChuZXcgRnVuY3Rpb24oYm9keSkpKCk7XG59XG5cbnZhciBzcGVjaWFsc0xvb2t1cCA9IG9wdGltaXplTG9va3VwKFNQRUNJQUxTKTtcblxuLy8gbWF0Y2hlcyB2YWxpZCBJUHY0IGFkZHJlc3NlcyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbnZhciBJUHY0X1JFR0VYID1cbiAgL1xcYig/Oig/OjI1WzAtNV18MlswLTRdXFxkfFswMV0/XFxkXFxkPylcXC4pezN9KD86MjVbMC01XXwyWzAtNF1cXGR8WzAxXT9cXGRcXGQ/KSQvO1xudmFyIElQdjZfUkVHRVggPSAvXlthLWZBLUZcXGRdezAsNH0kLztcbnZhciBJUHY2X1JFR0VYX1RFU1QgPSBJUHY2X1JFR0VYLnRlc3QuYmluZChJUHY2X1JFR0VYKTtcblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogR2V0IHRoZSBsYXJnZXN0IG51bWJlciBpbiB0aGUgYXJyYXkuXG4gKlxuICogUmV0dXJucyAtSW5maW5pdHkgaWYgdGhlIGFycmF5IGlzIGVtcHR5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPG51bWJlcj59IGFycmF5IFRoZSBhcnJheSB0byBzY2FuLlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbGFyZ2VzdCBudW1iZXIgY29udGFpbmVkLlxuICovXG5mdW5jdGlvbiBtYXhWYWx1ZShhcnJheSkge1xuICB2YXIgdiA9IC1JbmZpbml0eSwgaSA9IDAsIG4gPSBhcnJheS5sZW5ndGg7XG5cbiAgZm9yICg7IGkgPCBuOyBpKyspIHtcbiAgICBpZiAoYXJyYXlbaV0gPiB2KSB7XG4gICAgICB2ID0gYXJyYXlbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHY7XG59XG5cbi8qKlxuICogQ2hlY2sgdGhhdCBhbiBlbWFpbCBhZGRyZXNzIGNvbmZvcm1zIHRvIFJGQ3MgNTMyMSwgNTMyMiBhbmQgb3RoZXJzXG4gKlxuICogQXMgb2YgVmVyc2lvbiAzLjAsIHdlIGFyZSBub3cgZGlzdGluZ3Vpc2hpbmcgY2xlYXJseSBiZXR3ZWVuIGEgTWFpbGJveFxuICogYXMgZGVmaW5lZCBieSBSRkMgNTMyMSBhbmQgYW4gYWRkci1zcGVjIGFzIGRlZmluZWQgYnkgUkZDIDUzMjIuIERlcGVuZGluZ1xuICogb24gdGhlIGNvbnRleHQsIGVpdGhlciBjYW4gYmUgcmVnYXJkZWQgYXMgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLiBUaGVcbiAqIFJGQyA1MzIxIE1haWxib3ggc3BlY2lmaWNhdGlvbiBpcyBtb3JlIHJlc3RyaWN0aXZlIChjb21tZW50cywgd2hpdGUgc3BhY2VcbiAqIGFuZCBvYnNvbGV0ZSBmb3JtcyBhcmUgbm90IGFsbG93ZWQpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbCBUaGUgZW1haWwgYWRkcmVzcyB0byBjaGVjay5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tETlMgSWYgdHJ1ZSB0aGVuIHdpbGwgY2hlY2sgRE5TIGZvciBNWCByZWNvcmRzLiBJZiB0cnVlXG4gKiAgIHRoaXMgaXNFbWFpbCBfd2lsbF8gYmUgYXN5bmNocm9ub3VzLlxuICogQHBhcmFtIHsqfSBlcnJvckxldmVsIERldGVybWluZXMgdGhlIGJvdW5kYXJ5IGJldHdlZW4gdmFsaWQgYW5kIGludmFsaWRcbiAqICAgYWRkcmVzc2VzLiBTdGF0dXMgY29kZXMgYWJvdmUgdGhpcyBudW1iZXIgd2lsbCBiZSByZXR1cm5lZCBhcy1pcywgc3RhdHVzXG4gKiAgIGNvZGVzIGJlbG93IHdpbGwgYmUgcmV0dXJuZWQgYXMgSVNFTUFJTF9WQUxJRC4gVGh1cyB0aGUgY2FsbGluZyBwcm9ncmFtIGNhblxuICogICBzaW1wbHkgbG9vayBmb3IgSVNFTUFJTF9WQUxJRCBpZiBpdCBpcyBvbmx5IGludGVyZXN0ZWQgaW4gd2hldGhlciBhblxuICogICBhZGRyZXNzIGlzIHZhbGlkIG9yIG5vdC4gVGhlIGVycm9yTGV2ZWwgd2lsbCBkZXRlcm1pbmUgaG93IFwicGlja3lcIlxuICogICBpc0VtYWlsKCkgaXMgYWJvdXQgdGhlIGFkZHJlc3MuIElmIG9taXR0ZWQgb3IgcGFzc2VkIGFzIGZhbHNlIHRoZW5cbiAqICAgaXNFbWFpbCgpIHdpbGwgcmV0dXJuIHRydWUgb3IgZmFsc2UgcmF0aGVyIHRoYW4gYW4gaW50ZWdlciBlcnJvciBvclxuICogICB3YXJuaW5nLiBOQiBOb3RlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gZXJyb3JMZXZlbCA9IGZhbHNlIGFuZFxuICogICBlcnJvckxldmVsID0gMC5cbiAqIEByZXR1cm4geyp9XG4gKi9cbmZ1bmN0aW9uIGlzRW1haWwoZW1haWwsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcblxuICB2YXIgdGhyZXNob2xkLCBkaWFnbm9zZTtcbiAgaWYgKHR5cGVvZiBvcHRpb25zLmVycm9yTGV2ZWwgPT09ICdudW1iZXInKSB7XG4gICAgZGlhZ25vc2UgPSB0cnVlO1xuICAgIHRocmVzaG9sZCA9IG9wdGlvbnMuZXJyb3JMZXZlbDtcbiAgfSBlbHNlIHtcbiAgICBkaWFnbm9zZSA9ICEhb3B0aW9ucy5lcnJvckxldmVsO1xuICAgIHRocmVzaG9sZCA9IElTRU1BSUxfVkFMSUQ7XG4gIH1cblxuICBpZiAob3B0aW9ucy50bGRXaGl0ZWxpc3QgJiYgdHlwZW9mIG9wdGlvbnMudGxkV2hpdGVsaXN0ICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIGFycmF5IG9yIG9iamVjdCB0bGRXaGl0ZWxpc3QnKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLm1pbkRvbWFpbkF0b21zICYmIChvcHRpb25zLm1pbkRvbWFpbkF0b21zICE9PVxuICAgICAgKCgrb3B0aW9ucy5taW5Eb21haW5BdG9tcykgfCAwKSB8fCBvcHRpb25zLm1pbkRvbWFpbkF0b21zIDwgMCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBwb3NpdGl2ZSBpbnRlZ2VyIG1pbkRvbWFpbkF0b21zJyk7XG4gIH1cblxuICB2YXIgbWF4UmVzdWx0ID0gSVNFTUFJTF9WQUxJRDtcblxuICBmdW5jdGlvbiB1cGRhdGVSZXN1bHQodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPiBtYXhSZXN1bHQpIHtcbiAgICAgIG1heFJlc3VsdCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb250ZXh0ID0ge1xuICAgIG5vdzogQ09NUE9ORU5UX0xPQ0FMUEFSVCxcbiAgICBwcmV2OiBDT01QT05FTlRfTE9DQUxQQVJULFxuICAgIHN0YWNrOiBbQ09NUE9ORU5UX0xPQ0FMUEFSVF1cbiAgfTtcblxuICB2YXIgdG9rZW4gPSAnJywgcHJldlRva2VuID0gJycsIGNoYXJDb2RlID0gMDtcbiAgdmFyIHBhcnNlRGF0YSA9IHtsb2NhbDogJycsIGRvbWFpbjogJyd9O1xuICB2YXIgYXRvbUxpc3QgPSB7bG9jYWw6IFsnJ10sIGRvbWFpbjogWycnXX07XG5cbiAgdmFyIGVsZW1lbnRDb3VudCA9IDAsIGVsZW1lbnRMZW5ndGggPSAwLCBjcmxmQ291bnQgPSAwO1xuICB2YXIgaHlwaGVuRmxhZyA9IGZhbHNlLCBhc3NlcnRFbmQgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVtYWlsLmxlbmd0aDsgaSsrKSB7XG4gICAgdG9rZW4gPSBlbWFpbFtpXTtcblxuICAgIHN3aXRjaCAoY29udGV4dC5ub3cpIHtcbiAgICAvLyBsb2NhbC1wYXJ0XG4gICAgY2FzZSBDT01QT05FTlRfTE9DQUxQQVJUOlxuICAgICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTMyMiNzZWN0aW9uLTMuNC4xXG4gICAgICAvLyAgIGxvY2FsLXBhcnQgICAgICA9ICAgZG90LWF0b20gLyBxdW90ZWQtc3RyaW5nIC8gb2JzLWxvY2FsLXBhcnRcbiAgICAgIC8vXG4gICAgICAvLyAgIGRvdC1hdG9tICAgICAgICA9ICAgW0NGV1NdIGRvdC1hdG9tLXRleHQgW0NGV1NdXG4gICAgICAvL1xuICAgICAgLy8gICBkb3QtYXRvbS10ZXh0ICAgPSAgIDEqYXRleHQgKihcIi5cIiAxKmF0ZXh0KVxuICAgICAgLy9cbiAgICAgIC8vICAgcXVvdGVkLXN0cmluZyAgID0gICBbQ0ZXU11cbiAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICBEUVVPVEUgKihbRldTXSBxY29udGVudCkgW0ZXU10gRFFVT1RFXG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgW0NGV1NdXG4gICAgICAvL1xuICAgICAgLy8gICBvYnMtbG9jYWwtcGFydCAgPSAgIHdvcmQgKihcIi5cIiB3b3JkKVxuICAgICAgLy9cbiAgICAgIC8vICAgd29yZCAgICAgICAgICAgID0gICBhdG9tIC8gcXVvdGVkLXN0cmluZ1xuICAgICAgLy9cbiAgICAgIC8vICAgYXRvbSAgICAgICAgICAgID0gICBbQ0ZXU10gMSphdGV4dCBbQ0ZXU11cbiAgICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIGNvbW1lbnRcbiAgICAgIGNhc2UgJygnOlxuICAgICAgICBpZiAoZWxlbWVudExlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIC8vIGNvbW1lbnRzIGFyZSBPSyBhdCB0aGUgYmVnaW5uaW5nIG9mIGFuIGVsZW1lbnRcbiAgICAgICAgICB1cGRhdGVSZXN1bHQoZWxlbWVudENvdW50ID09PSAwID8gSVNFTUFJTF9DRldTX0NPTU1FTlQgOlxuICAgICAgICAgICAgSVNFTUFJTF9ERVBSRUNfQ09NTUVOVCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfQ0ZXU19DT01NRU5UKTtcbiAgICAgICAgICAgLy8gY2FuJ3Qgc3RhcnQgYSBjb21tZW50IGluIGFuIGVsZW1lbnQsIHNob3VsZCBiZSBlbmRcbiAgICAgICAgICBhc3NlcnRFbmQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuc3RhY2sucHVzaChjb250ZXh0Lm5vdyk7XG4gICAgICAgIGNvbnRleHQubm93ID0gQ09OVEVYVF9DT01NRU5UO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIG5leHQgZG90LWF0b20gZWxlbWVudFxuICAgICAgY2FzZSAnLic6XG4gICAgICAgIGlmIChlbGVtZW50TGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgLy8gYW5vdGhlciBkb3QsIGFscmVhZHk/XG4gICAgICAgICAgdXBkYXRlUmVzdWx0KGVsZW1lbnRDb3VudCA9PT0gMCA/IElTRU1BSUxfRVJSX0RPVF9TVEFSVCA6XG4gICAgICAgICAgICBJU0VNQUlMX0VSUl9DT05TRUNVVElWRURPVFMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRoZSBlbnRpcmUgbG9jYWwtcGFydCBjYW4gYmUgYSBxdW90ZWQgc3RyaW5nIGZvciBSRkMgNTMyMVxuICAgICAgICAgIC8vIGlmIGl0J3MganVzdCBvbmUgYXRvbSB0aGF0IGlzIHF1b3RlZCB0aGVuIGl0J3MgYW4gUkZDIDUzMjIgb2Jzb2xldGVcbiAgICAgICAgICAvLyBmb3JtXG4gICAgICAgICAgaWYgKGFzc2VydEVuZCkge1xuICAgICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfREVQUkVDX0xPQ0FMUEFSVCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ0ZXUyAmIHF1b3RlZCBzdHJpbmdzIGFyZSBPSyBhZ2FpbiBub3cgd2UncmUgYXQgdGhlIGJlZ2lubmluZyBvZiBhblxuICAgICAgICAgIC8vIGVsZW1lbnQgKGFsdGhvdWdoIHRoZXkgYXJlIG9ic29sZXRlIGZvcm1zKVxuICAgICAgICAgIGFzc2VydEVuZCA9IGZhbHNlO1xuICAgICAgICAgIGVsZW1lbnRMZW5ndGggPSAwO1xuICAgICAgICAgIGVsZW1lbnRDb3VudCsrO1xuICAgICAgICAgIHBhcnNlRGF0YS5sb2NhbCArPSB0b2tlbjtcbiAgICAgICAgICBhdG9tTGlzdC5sb2NhbFtlbGVtZW50Q291bnRdID0gJyc7IC8vIFRPRE86IHB1c2g/XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBxdW90ZWQgc3RyaW5nXG4gICAgICBjYXNlICdcIic6XG4gICAgICAgIGlmIChlbGVtZW50TGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgLy8gdGhlIGVudGlyZSBsb2NhbC1wYXJ0IGNhbiBiZSBhIHF1b3RlZCBzdHJpbmcgZm9yIFJGQyA1MzIxXG4gICAgICAgICAgLy8gaWYgaXQncyBqdXN0IG9uZSBhdG9tIHRoYXQgaXMgcXVvdGVkIHRoZW4gaXQncyBhbiBSRkMgNTMyMiBvYnNvbGV0ZVxuICAgICAgICAgIC8vIGZvcm1cbiAgICAgICAgICB1cGRhdGVSZXN1bHQoZWxlbWVudENvdW50ID09PSAwID8gSVNFTUFJTF9SRkM1MzIxX1FVT1RFRFNUUklORyA6XG4gICAgICAgICAgICBJU0VNQUlMX0RFUFJFQ19MT0NBTFBBUlQpO1xuXG4gICAgICAgICAgcGFyc2VEYXRhLmxvY2FsICs9IHRva2VuO1xuICAgICAgICAgIGF0b21MaXN0LmxvY2FsW2VsZW1lbnRDb3VudF0gKz0gdG9rZW47XG4gICAgICAgICAgZWxlbWVudExlbmd0aCsrO1xuICAgICAgICAgIGFzc2VydEVuZCA9IHRydWU7IC8vIHF1b3RlZCBzdHJpbmcgbXVzdCBiZSB0aGUgZW50aXJlIGVsZW1lbnRcbiAgICAgICAgICBjb250ZXh0LnN0YWNrLnB1c2goY29udGV4dC5ub3cpO1xuICAgICAgICAgIGNvbnRleHQubm93ID0gQ09OVEVYVF9RVU9URURTVFJJTkc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX0VYUEVDVElOR19BVEVYVCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBmb2xkaW5nIHdoaXRlIHNwYWNlXG4gICAgICBjYXNlICdcXHInOlxuICAgICAgICBpZiAoKCsraSA9PT0gZW1haWwubGVuZ3RoKSB8fCBlbWFpbFtpXSAhPT0gJ1xcbicpIHtcbiAgICAgICAgICAvLyBmYXRhbCBlcnJvclxuICAgICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX0VSUl9DUl9OT19MRik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGNhc2UgJyAnOlxuICAgICAgY2FzZSAnXFx0JzpcbiAgICAgICAgaWYgKGVsZW1lbnRMZW5ndGggPT09IDApIHtcbiAgICAgICAgICB1cGRhdGVSZXN1bHQoZWxlbWVudENvdW50ID09PSAwID8gSVNFTUFJTF9DRldTX0ZXUyA6XG4gICAgICAgICAgICBJU0VNQUlMX0RFUFJFQ19GV1MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHdlIGNhbid0IHN0YXJ0IEZXUyBpbiB0aGUgbWlkZGxlIG9mIGFuIGVsZW1lbnQsIGJldHRlciBiZSBlbmRcbiAgICAgICAgICBhc3NlcnRFbmQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5zdGFjay5wdXNoKGNvbnRleHQubm93KTtcbiAgICAgICAgY29udGV4dC5ub3cgPSBDT05URVhUX0ZXUztcbiAgICAgICAgcHJldlRva2VuID0gdG9rZW47XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gQFxuICAgICAgY2FzZSAnQCc6XG4gICAgICAgIC8vIGF0IHRoaXMgcG9pbnQgd2Ugc2hvdWxkIGhhdmUgYSB2YWxpZCBsb2NhbC1wYXJ0XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBsb2dpY2FsbHkgdW5yZWFjaGFibGUgKi9cbiAgICAgICAgaWYgKGNvbnRleHQuc3RhY2subGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmV4cGVjdGVkIGl0ZW0gb24gY29udGV4dCBzdGFjaycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlRGF0YS5sb2NhbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAvLyBmYXRhbCBlcnJvclxuICAgICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX0VSUl9OT0xPQ0FMUEFSVCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudExlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIC8vIGZhdGFsIGVycm9yXG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX0RPVF9FTkQpO1xuICAgICAgICAvLyBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1MzIxI3NlY3Rpb24tNC41LjMuMS4xXG4gICAgICAgIC8vICAgdGhlIG1heGltdW0gdG90YWwgbGVuZ3RoIG9mIGEgdXNlciBuYW1lIG9yIG90aGVyIGxvY2FsLXBhcnQgaXMgNjRcbiAgICAgICAgLy8gICBvY3RldHNcbiAgICAgICAgfSBlbHNlIGlmIChwYXJzZURhdGEubG9jYWwubGVuZ3RoID4gNjQpIHtcbiAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9SRkM1MzIyX0xPQ0FMX1RPT0xPTkcpO1xuICAgICAgICAvLyBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1MzIyI3NlY3Rpb24tMy40LjFcbiAgICAgICAgLy8gICBjb21tZW50cyBhbmQgZm9sZGluZyB3aGl0ZSBzcGFjZVxuICAgICAgICAvLyAgIFNIT1VMRCBOT1QgYmUgdXNlZCBhcm91bmQgdGhlIFwiQFwiIGluIHRoZSBhZGRyLXNwZWNcbiAgICAgICAgLy9cbiAgICAgICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMjExOVxuICAgICAgICAvLyA0LiBTSE9VTEQgTk9UICB0aGlzIHBocmFzZSwgb3IgdGhlIHBocmFzZSBcIk5PVCBSRUNPTU1FTkRFRFwiIG1lYW4gdGhhdFxuICAgICAgICAvLyAgICB0aGVyZSBtYXkgZXhpc3QgdmFsaWQgcmVhc29ucyBpbiBwYXJ0aWN1bGFyIGNpcmN1bXN0YW5jZXMgd2hlbiB0aGVcbiAgICAgICAgLy8gICAgcGFydGljdWxhciBiZWhhdmlvciBpcyBhY2NlcHRhYmxlIG9yIGV2ZW4gdXNlZnVsLCBidXQgdGhlIGZ1bGxcbiAgICAgICAgLy8gICAgaW1wbGljYXRpb25zIHNob3VsZCBiZSB1bmRlcnN0b29kIGFuZCB0aGUgY2FzZSBjYXJlZnVsbHkgd2VpZ2hlZFxuICAgICAgICAvLyAgICBiZWZvcmUgaW1wbGVtZW50aW5nIGFueSBiZWhhdmlvciBkZXNjcmliZWQgd2l0aCB0aGlzIGxhYmVsXG4gICAgICAgIH0gZWxzZSBpZiAoKGNvbnRleHQucHJldiA9PT0gQ09OVEVYVF9DT01NRU5UKSB8fFxuICAgICAgICAgICAgKGNvbnRleHQucHJldiA9PT0gQ09OVEVYVF9GV1MpKSB7XG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfREVQUkVDX0NGV1NfTkVBUl9BVCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhciBldmVyeXRoaW5nIGRvd24gZm9yIHRoZSBkb21haW4gcGFyc2luZ1xuICAgICAgICBjb250ZXh0Lm5vdyA9IENPTVBPTkVOVF9ET01BSU47IC8vIHdoZXJlIHdlIGFyZVxuICAgICAgICBjb250ZXh0LnN0YWNrWzBdID0gQ09NUE9ORU5UX0RPTUFJTjsgLy8gd2hlcmUgd2UgaGF2ZSBiZWVuXG4gICAgICAgIGVsZW1lbnRDb3VudCA9IDA7XG4gICAgICAgIGVsZW1lbnRMZW5ndGggPSAwO1xuICAgICAgICBhc3NlcnRFbmQgPSBmYWxzZTsgLy8gQ0ZXUyBjYW4gb25seSBhcHBlYXIgYXQgdGhlIGVuZCBvZiB0aGUgZWxlbWVudFxuICAgICAgICBicmVhaztcbiAgICAgIC8vIGF0ZXh0XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1MzIyI3NlY3Rpb24tMy4yLjNcbiAgICAgICAgLy8gICAgYXRleHQgPSBBTFBIQSAvIERJR0lUIC8gOyBQcmludGFibGUgVVMtQVNDSUlcbiAgICAgICAgLy8gICAgICAgICAgICBcIiFcIiAvIFwiI1wiIC8gICAgIDsgIGNoYXJhY3RlcnMgbm90IGluY2x1ZGluZ1xuICAgICAgICAvLyAgICAgICAgICAgIFwiJFwiIC8gXCIlXCIgLyAgICAgOyAgc3BlY2lhbHMuICBVc2VkIGZvciBhdG9tcy5cbiAgICAgICAgLy8gICAgICAgICAgICBcIiZcIiAvIFwiJ1wiIC9cbiAgICAgICAgLy8gICAgICAgICAgICBcIipcIiAvIFwiK1wiIC9cbiAgICAgICAgLy8gICAgICAgICAgICBcIi1cIiAvIFwiL1wiIC9cbiAgICAgICAgLy8gICAgICAgICAgICBcIj1cIiAvIFwiP1wiIC9cbiAgICAgICAgLy8gICAgICAgICAgICBcIl5cIiAvIFwiX1wiIC9cbiAgICAgICAgLy8gICAgICAgICAgICBcImBcIiAvIFwie1wiIC9cbiAgICAgICAgLy8gICAgICAgICAgICBcInxcIiAvIFwifVwiIC9cbiAgICAgICAgLy8gICAgICAgICAgICBcIn5cIlxuICAgICAgICBpZiAoYXNzZXJ0RW5kKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBlbmNvdW50ZXJlZCBhdGV4dCB3aGVyZSBpdCBpcyBubyBsb25nZXIgdmFsaWRcbiAgICAgICAgICBzd2l0Y2ggKGNvbnRleHQucHJldikge1xuICAgICAgICAgIGNhc2UgQ09OVEVYVF9DT01NRU5UOlxuICAgICAgICAgIGNhc2UgQ09OVEVYVF9GV1M6XG4gICAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9FUlJfQVRFWFRfQUZURVJfQ0ZXUyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIENPTlRFWFRfUVVPVEVEU1RSSU5HOlxuICAgICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX0FURVhUX0FGVEVSX1FTKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBsb2dpY2FsbHkgdW5yZWFjaGFibGUgKi9cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtb3JlIGF0ZXh0IGZvdW5kIHdoZXJlIG5vbmUgaXMgYWxsb3dlZCwgJyArXG4gICAgICAgICAgICAgICdidXQgdW5yZWNvZ25pemVkIHByZXYgY29udGV4dDogJyArIGNvbnRleHQucHJldik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRleHQucHJldiA9IGNvbnRleHQubm93O1xuICAgICAgICAgIGNoYXJDb2RlID0gdG9rZW4uY2hhckNvZGVBdCgwKTtcblxuICAgICAgICAgIGlmIChjaGFyQ29kZSA8IDMzIHx8IGNoYXJDb2RlID4gMTI2IHx8IGNoYXJDb2RlID09PSAxMCB8fFxuICAgICAgICAgICAgICBzcGVjaWFsc0xvb2t1cChjaGFyQ29kZSkpIHtcbiAgICAgICAgICAgIC8vIGZhdGFsIGVycm9yXG4gICAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9FUlJfRVhQRUNUSU5HX0FURVhUKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXJzZURhdGEubG9jYWwgKz0gdG9rZW47XG4gICAgICAgICAgYXRvbUxpc3QubG9jYWxbZWxlbWVudENvdW50XSArPSB0b2tlbjtcbiAgICAgICAgICBlbGVtZW50TGVuZ3RoKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQ09NUE9ORU5UX0RPTUFJTjpcbiAgICAgIC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzUzMjIjc2VjdGlvbi0zLjQuMVxuICAgICAgLy8gICBkb21haW4gICAgICAgICAgPSAgIGRvdC1hdG9tIC8gZG9tYWluLWxpdGVyYWwgLyBvYnMtZG9tYWluXG4gICAgICAvL1xuICAgICAgLy8gICBkb3QtYXRvbSAgICAgICAgPSAgIFtDRldTXSBkb3QtYXRvbS10ZXh0IFtDRldTXVxuICAgICAgLy9cbiAgICAgIC8vICAgZG90LWF0b20tdGV4dCAgID0gICAxKmF0ZXh0ICooXCIuXCIgMSphdGV4dClcbiAgICAgIC8vXG4gICAgICAvLyAgIGRvbWFpbi1saXRlcmFsICA9ICAgW0NGV1NdIFwiW1wiICooW0ZXU10gZHRleHQpIFtGV1NdIFwiXVwiIFtDRldTXVxuICAgICAgLy9cbiAgICAgIC8vICAgZHRleHQgICAgICAgICAgID0gICAlZDMzLTkwIC8gICAgICAgICAgOyBQcmludGFibGUgVVMtQVNDSUlcbiAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAlZDk0LTEyNiAvICAgICAgICAgOyAgY2hhcmFjdGVycyBub3QgaW5jbHVkaW5nXG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgb2JzLWR0ZXh0ICAgICAgICAgIDsgIFwiW1wiLCBcIl1cIiwgb3IgXCJcXFwiXG4gICAgICAvL1xuICAgICAgLy8gICBvYnMtZG9tYWluICAgICAgPSAgIGF0b20gKihcIi5cIiBhdG9tKVxuICAgICAgLy9cbiAgICAgIC8vICAgYXRvbSAgICAgICAgICAgID0gICBbQ0ZXU10gMSphdGV4dCBbQ0ZXU11cblxuICAgICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTMyMSNzZWN0aW9uLTQuMS4yXG4gICAgICAvLyAgIE1haWxib3ggICAgICAgID0gTG9jYWwtcGFydCBcIkBcIiAoIERvbWFpbiAvIGFkZHJlc3MtbGl0ZXJhbCApXG4gICAgICAvL1xuICAgICAgLy8gICBEb21haW4gICAgICAgICA9IHN1Yi1kb21haW4gKihcIi5cIiBzdWItZG9tYWluKVxuICAgICAgLy9cbiAgICAgIC8vICAgYWRkcmVzcy1saXRlcmFsICA9IFwiW1wiICggSVB2NC1hZGRyZXNzLWxpdGVyYWwgL1xuICAgICAgLy8gICAgICAgICAgICAgICAgICAgIElQdjYtYWRkcmVzcy1saXRlcmFsIC9cbiAgICAgIC8vICAgICAgICAgICAgICAgICAgICBHZW5lcmFsLWFkZHJlc3MtbGl0ZXJhbCApIFwiXVwiXG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgOyBTZWUgU2VjdGlvbiA0LjEuM1xuXG4gICAgICAvLyBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1MzIyI3NlY3Rpb24tMy40LjFcbiAgICAgIC8vICAgICAgTm90ZTogQSBsaWJlcmFsIHN5bnRheCBmb3IgdGhlIGRvbWFpbiBwb3J0aW9uIG9mIGFkZHItc3BlYyBpc1xuICAgICAgLy8gICAgICBnaXZlbiBoZXJlLiAgSG93ZXZlciwgdGhlIGRvbWFpbiBwb3J0aW9uIGNvbnRhaW5zIGFkZHJlc3NpbmdcbiAgICAgIC8vICAgICAgaW5mb3JtYXRpb24gc3BlY2lmaWVkIGJ5IGFuZCB1c2VkIGluIG90aGVyIHByb3RvY29scyAoZS5nLixcbiAgICAgIC8vICAgICAgW1JGQzEwMzRdLCBbUkZDMTAzNV0sIFtSRkMxMTIzXSwgW1JGQzUzMjFdKS4gIEl0IGlzIHRoZXJlZm9yZVxuICAgICAgLy8gICAgICBpbmN1bWJlbnQgdXBvbiBpbXBsZW1lbnRhdGlvbnMgdG8gY29uZm9ybSB0byB0aGUgc3ludGF4IG9mXG4gICAgICAvLyAgICAgIGFkZHJlc3NlcyBmb3IgdGhlIGNvbnRleHQgaW4gd2hpY2ggdGhleSBhcmUgdXNlZC5cbiAgICAgIC8vIGlzX2VtYWlsKCkgYXV0aG9yJ3Mgbm90ZTogaXQncyBub3QgY2xlYXIgaG93IHRvIGludGVycHJldCB0aGlzIGluXG4gICAgICAvLyB0aGUgY29udGV4dCBvZiBhIGdlbmVyYWwgZW1haWwgYWRkcmVzcyB2YWxpZGF0b3IuIFRoZSBjb25jbHVzaW9uIElcbiAgICAgIC8vIGhhdmUgcmVhY2hlZCBpcyB0aGlzOiBcImFkZHJlc3NpbmcgaW5mb3JtYXRpb25cIiBtdXN0IGNvbXBseSB3aXRoXG4gICAgICAvLyBSRkMgNTMyMSAoYW5kIGluIHR1cm4gUkZDIDEwMzUpLCBhbnl0aGluZyB0aGF0IGlzIFwic2VtYW50aWNhbGx5XG4gICAgICAvLyBpbnZpc2libGVcIiBtdXN0IGNvbXBseSBvbmx5IHdpdGggUkZDIDUzMjIuXG4gICAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBjb21tZW50XG4gICAgICBjYXNlICcoJzpcbiAgICAgICAgaWYgKGVsZW1lbnRMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAvLyBjb21tZW50cyBhdCB0aGUgc3RhcnQgb2YgdGhlIGRvbWFpbiBhcmUgZGVwcmVjYXRlZCBpbiB0aGUgdGV4dFxuICAgICAgICAgIC8vIGNvbW1lbnRzIGF0IHRoZSBzdGFydCBvZiBhIHN1YmRvbWFpbiBhcmUgb2JzLWRvbWFpblxuICAgICAgICAgIC8vIChodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1MzIyI3NlY3Rpb24tMy40LjEpXG4gICAgICAgICAgdXBkYXRlUmVzdWx0KGVsZW1lbnRDb3VudCA9PT0gMCA/IElTRU1BSUxfREVQUkVDX0NGV1NfTkVBUl9BVCA6XG4gICAgICAgICAgICBJU0VNQUlMX0RFUFJFQ19DT01NRU5UKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9DRldTX0NPTU1FTlQpO1xuICAgICAgICAgIGFzc2VydEVuZCA9IHRydWU7IC8vIGNhbid0IHN0YXJ0IGEgY29tbWVudCBtaWQtZWxlbWVudCwgYmV0dGVyIGJlIGVuZFxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5zdGFjay5wdXNoKGNvbnRleHQubm93KTtcbiAgICAgICAgY29udGV4dC5ub3cgPSBDT05URVhUX0NPTU1FTlQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gbmV4dCBkb3QtYXRvbSBlbGVtZW50XG4gICAgICBjYXNlICcuJzpcbiAgICAgICAgaWYgKGVsZW1lbnRMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAvLyBhbm90aGVyIGRvdCwgYWxyZWFkeT8gZmF0YWwgZXJyb3JcbiAgICAgICAgICB1cGRhdGVSZXN1bHQoZWxlbWVudENvdW50ID09PSAwID8gSVNFTUFJTF9FUlJfRE9UX1NUQVJUIDpcbiAgICAgICAgICAgIElTRU1BSUxfRVJSX0NPTlNFQ1VUSVZFRE9UUyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaHlwaGVuRmxhZykge1xuICAgICAgICAgIC8vIHByZXZpb3VzIHN1YmRvbWFpbiBlbmRlZCBpbiBhIGh5cGhlblxuICAgICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX0VSUl9ET01BSU5IWVBIRU5FTkQpOyAvLyBmYXRhbCBlcnJvclxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnRMZW5ndGggPiA2Mykge1xuICAgICAgICAgIC8vIE5vd2hlcmUgaW4gUkZDIDUzMjEgZG9lcyBpdCBzYXkgZXhwbGljaXRseSB0aGF0IHRoZVxuICAgICAgICAgIC8vIGRvbWFpbiBwYXJ0IG9mIGEgTWFpbGJveCBtdXN0IGJlIGEgdmFsaWQgZG9tYWluIGFjY29yZGluZ1xuICAgICAgICAgIC8vIHRvIHRoZSBETlMgc3RhbmRhcmRzIHNldCBvdXQgaW4gUkZDIDEwMzUsIGJ1dCB0aGlzICppcypcbiAgICAgICAgICAvLyBpbXBsaWVkIGluIHNldmVyYWwgcGxhY2VzLiBGb3IgaW5zdGFuY2UsIHdoZXJldmVyIHRoZSBpZGVhXG4gICAgICAgICAgLy8gb2YgaG9zdCByb3V0aW5nIGlzIGRpc2N1c3NlZCB0aGUgUkZDIHNheXMgdGhhdCB0aGUgZG9tYWluXG4gICAgICAgICAgLy8gbXVzdCBiZSBsb29rZWQgdXAgaW4gdGhlIEROUy4gVGhpcyB3b3VsZCBiZSBub25zZW5zZSB1bmxlc3NcbiAgICAgICAgICAvLyB0aGUgZG9tYWluIHdhcyBkZXNpZ25lZCB0byBiZSBhIHZhbGlkIEROUyBkb21haW4uIEhlbmNlIHdlXG4gICAgICAgICAgLy8gbXVzdCBjb25jbHVkZSB0aGF0IHRoZSBSRkMgMTAzNSByZXN0cmljdGlvbiBvbiBsYWJlbCBsZW5ndGhcbiAgICAgICAgICAvLyBhbHNvIGFwcGxpZXMgdG8gUkZDIDUzMjEgZG9tYWlucy5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzEwMzUjc2VjdGlvbi0yLjMuNFxuICAgICAgICAgIC8vIGxhYmVscyAgICAgICAgICA2MyBvY3RldHMgb3IgbGVzc1xuXG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfUkZDNTMyMl9MQUJFTF9UT09MT05HKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENGV1MgaXMgT0sgYWdhaW4gbm93IHdlJ3JlIGF0IHRoZSBiZWdpbm5pbmcgb2YgYW4gZWxlbWVudCAoYWx0aG91Z2hcbiAgICAgICAgLy8gaXQgbWF5IGJlIG9ic29sZXRlIENGV1MpXG4gICAgICAgIGFzc2VydEVuZCA9IGZhbHNlO1xuICAgICAgICBlbGVtZW50TGVuZ3RoID0gMDtcbiAgICAgICAgZWxlbWVudENvdW50Kys7XG4gICAgICAgIGF0b21MaXN0LmRvbWFpbltlbGVtZW50Q291bnRdID0gJyc7XG4gICAgICAgIHBhcnNlRGF0YS5kb21haW4gKz0gdG9rZW47XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBkb21haW4gbGl0ZXJhbFxuICAgICAgY2FzZSAnWyc6XG4gICAgICAgIGlmIChwYXJzZURhdGEuZG9tYWluLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIC8vIGRvbWFpbiBsaXRlcmFsIG11c3QgYmUgdGhlIG9ubHkgY29tcG9uZW50XG4gICAgICAgICAgYXNzZXJ0RW5kID0gdHJ1ZTtcbiAgICAgICAgICBlbGVtZW50TGVuZ3RoKys7XG4gICAgICAgICAgY29udGV4dC5zdGFjay5wdXNoKGNvbnRleHQubm93KTtcbiAgICAgICAgICBjb250ZXh0Lm5vdyA9IENPTVBPTkVOVF9MSVRFUkFMO1xuICAgICAgICAgIHBhcnNlRGF0YS5kb21haW4gKz0gdG9rZW47XG4gICAgICAgICAgYXRvbUxpc3QuZG9tYWluW2VsZW1lbnRDb3VudF0gKz0gdG9rZW47XG4gICAgICAgICAgcGFyc2VEYXRhLmxpdGVyYWwgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBmYXRhbCBlcnJvclxuICAgICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX0VSUl9FWFBFQ1RJTkdfQVRFWFQpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gZm9sZGluZyB3aGl0ZSBzcGFjZVxuICAgICAgY2FzZSAnXFxyJzpcbiAgICAgICAgaWYgKCgrK2kgPT09IGVtYWlsLmxlbmd0aCkgfHwgZW1haWxbaV0gIT09ICdcXG4nKSB7XG4gICAgICAgICAgLy8gZmF0YWwgZXJyb3JcbiAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9FUlJfQ1JfTk9fTEYpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBjYXNlICcgJzpcbiAgICAgIGNhc2UgJ1xcdCc6XG4gICAgICAgIGlmIChlbGVtZW50TGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdXBkYXRlUmVzdWx0KGVsZW1lbnRDb3VudCA9PT0gMCA/IElTRU1BSUxfREVQUkVDX0NGV1NfTkVBUl9BVCA6XG4gICAgICAgICAgICBJU0VNQUlMX0RFUFJFQ19GV1MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHdlIGNhbid0IHN0YXJ0IEZXUyBpbiB0aGUgbWlkZGxlIG9mIGFuIGVsZW1lbnQsIHNvIHRoaXMgYmV0dGVyIGJlXG4gICAgICAgICAgLy8gdGhlIGVuZFxuICAgICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX0NGV1NfRldTKTtcbiAgICAgICAgICBhc3NlcnRFbmQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5zdGFjay5wdXNoKGNvbnRleHQubm93KTtcbiAgICAgICAgY29udGV4dC5ub3cgPSBDT05URVhUX0ZXUztcbiAgICAgICAgcHJldlRva2VuID0gdG9rZW47XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gYXRleHRcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIFJGQyA1MzIyIGFsbG93cyBhbnkgYXRleHQuLi5cbiAgICAgICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTMyMiNzZWN0aW9uLTMuMi4zXG4gICAgICAgIC8vICAgIGF0ZXh0ID0gQUxQSEEgLyBESUdJVCAvIDsgUHJpbnRhYmxlIFVTLUFTQ0lJXG4gICAgICAgIC8vICAgICAgICAgICAgXCIhXCIgLyBcIiNcIiAvICAgICA7ICBjaGFyYWN0ZXJzIG5vdCBpbmNsdWRpbmdcbiAgICAgICAgLy8gICAgICAgICAgICBcIiRcIiAvIFwiJVwiIC8gICAgIDsgIHNwZWNpYWxzLiAgVXNlZCBmb3IgYXRvbXMuXG4gICAgICAgIC8vICAgICAgICAgICAgXCImXCIgLyBcIidcIiAvXG4gICAgICAgIC8vICAgICAgICAgICAgXCIqXCIgLyBcIitcIiAvXG4gICAgICAgIC8vICAgICAgICAgICAgXCItXCIgLyBcIi9cIiAvXG4gICAgICAgIC8vICAgICAgICAgICAgXCI9XCIgLyBcIj9cIiAvXG4gICAgICAgIC8vICAgICAgICAgICAgXCJeXCIgLyBcIl9cIiAvXG4gICAgICAgIC8vICAgICAgICAgICAgXCJgXCIgLyBcIntcIiAvXG4gICAgICAgIC8vICAgICAgICAgICAgXCJ8XCIgLyBcIn1cIiAvXG4gICAgICAgIC8vICAgICAgICAgICAgXCJ+XCJcblxuICAgICAgICAvLyBCdXQgUkZDIDUzMjEgb25seSBhbGxvd3MgbGV0dGVyLWRpZ2l0LWh5cGhlbiB0byBjb21wbHkgd2l0aCBETlMgcnVsZXNcbiAgICAgICAgLy8gICAoUkZDcyAxMDM0ICYgMTEyMylcbiAgICAgICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTMyMSNzZWN0aW9uLTQuMS4yXG4gICAgICAgIC8vICAgc3ViLWRvbWFpbiAgICAgPSBMZXQtZGlnIFtMZGgtc3RyXVxuICAgICAgICAvL1xuICAgICAgICAvLyAgIExldC1kaWcgICAgICAgID0gQUxQSEEgLyBESUdJVFxuICAgICAgICAvL1xuICAgICAgICAvLyAgIExkaC1zdHIgICAgICAgID0gKiggQUxQSEEgLyBESUdJVCAvIFwiLVwiICkgTGV0LWRpZ1xuICAgICAgICAvL1xuICAgICAgICBpZiAoYXNzZXJ0RW5kKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBlbmNvdW50ZXJlZCBhdGV4dCB3aGVyZSBpdCBpcyBubyBsb25nZXIgdmFsaWRcbiAgICAgICAgICBzd2l0Y2ggKGNvbnRleHQucHJldikge1xuICAgICAgICAgIGNhc2UgQ09OVEVYVF9DT01NRU5UOlxuICAgICAgICAgIGNhc2UgQ09OVEVYVF9GV1M6XG4gICAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9FUlJfQVRFWFRfQUZURVJfQ0ZXUyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIENPTVBPTkVOVF9MSVRFUkFMOlxuICAgICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX0FURVhUX0FGVEVSX0RPTUxJVCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogbG9naWNhbGx5IHVucmVhY2hhYmxlICovXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbW9yZSBhdGV4dCBmb3VuZCB3aGVyZSBub25lIGlzIGFsbG93ZWQsICcgK1xuICAgICAgICAgICAgICAnYnV0IHVucmVjb2duaXplZCBwcmV2IGNvbnRleHQ6ICcgKyBjb250ZXh0LnByZXYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNoYXJDb2RlID0gdG9rZW4uY2hhckNvZGVBdCgwKTtcbiAgICAgICAgLy8gYXNzdW1lIHRoaXMgdG9rZW4gaXNuJ3QgYSBoeXBoZW4gdW5sZXNzIHdlIGRpc2NvdmVyIGl0IGlzXG4gICAgICAgIGh5cGhlbkZsYWcgPSBmYWxzZTtcblxuICAgICAgICBpZiAoY2hhckNvZGUgPCAzMyB8fCBjaGFyQ29kZSA+IDEyNiB8fCBzcGVjaWFsc0xvb2t1cChjaGFyQ29kZSkpIHtcbiAgICAgICAgICAvLyBmYXRhbCBlcnJvclxuICAgICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX0VSUl9FWFBFQ1RJTkdfQVRFWFQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRva2VuID09PSAnLScpIHtcbiAgICAgICAgICBpZiAoZWxlbWVudExlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gaHlwaGVucyBjYW4ndCBiZSBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgc3ViZG9tYWluXG4gICAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9FUlJfRE9NQUlOSFlQSEVOU1RBUlQpOyAvLyBmYXRhbCBlcnJvclxuICAgICAgICAgIH1cblxuICAgICAgICAgIGh5cGhlbkZsYWcgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCEoKGNoYXJDb2RlID4gNDcgJiYgY2hhckNvZGUgPCA1OCkgfHxcbiAgICAgICAgICAgICAgICAgICAgIChjaGFyQ29kZSA+IDY0ICYmIGNoYXJDb2RlIDwgOTEpIHx8XG4gICAgICAgICAgICAgICAgICAgICAoY2hhckNvZGUgPiA5NiAmJiBjaGFyQ29kZSA8IDEyMykpKSB7XG4gICAgICAgICAgLy8gbm90IGFuIFJGQyA1MzIxIHN1YmRvbWFpbiwgYnV0IHN0aWxsIE9LIGJ5IFJGQyA1MzIyXG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfUkZDNTMyMl9ET01BSU4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyc2VEYXRhLmRvbWFpbiArPSB0b2tlbjtcbiAgICAgICAgYXRvbUxpc3QuZG9tYWluW2VsZW1lbnRDb3VudF0gKz0gdG9rZW47XG4gICAgICAgIGVsZW1lbnRMZW5ndGgrKztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIC8vIGRvbWFpbiBsaXRlcmFsXG4gICAgY2FzZSBDT01QT05FTlRfTElURVJBTDpcbiAgICAgIC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzUzMjIjc2VjdGlvbi0zLjQuMVxuICAgICAgLy8gICBkb21haW4tbGl0ZXJhbCAgPSAgIFtDRldTXSBcIltcIiAqKFtGV1NdIGR0ZXh0KSBbRldTXSBcIl1cIiBbQ0ZXU11cbiAgICAgIC8vXG4gICAgICAvLyAgIGR0ZXh0ICAgICAgICAgICA9ICAgJWQzMy05MCAvICAgICAgICAgIDsgUHJpbnRhYmxlIFVTLUFTQ0lJXG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgJWQ5NC0xMjYgLyAgICAgICAgIDsgIGNoYXJhY3RlcnMgbm90IGluY2x1ZGluZ1xuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgIG9icy1kdGV4dCAgICAgICAgICA7ICBcIltcIiwgXCJdXCIsIG9yIFwiXFxcIlxuICAgICAgLy9cbiAgICAgIC8vICAgb2JzLWR0ZXh0ICAgICAgID0gICBvYnMtTk8tV1MtQ1RMIC8gcXVvdGVkLXBhaXJcbiAgICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIGVuZCBvZiBkb21haW4gbGl0ZXJhbFxuICAgICAgY2FzZSAnXSc6XG4gICAgICAgIGlmIChtYXhSZXN1bHQgPCBJU0VNQUlMX0RFUFJFQykge1xuICAgICAgICAgIC8vIENvdWxkIGJlIGEgdmFsaWQgUkZDIDUzMjEgYWRkcmVzcyBsaXRlcmFsLCBzbyBsZXQncyBjaGVja1xuXG4gICAgICAgICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTMyMSNzZWN0aW9uLTQuMS4yXG4gICAgICAgICAgLy8gICBhZGRyZXNzLWxpdGVyYWwgID0gXCJbXCIgKCBJUHY0LWFkZHJlc3MtbGl0ZXJhbCAvXG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIElQdjYtYWRkcmVzcy1saXRlcmFsIC9cbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgR2VuZXJhbC1hZGRyZXNzLWxpdGVyYWwgKSBcIl1cIlxuICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICA7IFNlZSBTZWN0aW9uIDQuMS4zXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1MzIxI3NlY3Rpb24tNC4xLjNcbiAgICAgICAgICAvLyAgIElQdjQtYWRkcmVzcy1saXRlcmFsICA9IFNudW0gMyhcIi5cIiAgU251bSlcbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vICAgSVB2Ni1hZGRyZXNzLWxpdGVyYWwgID0gXCJJUHY2OlwiIElQdjYtYWRkclxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gICBHZW5lcmFsLWFkZHJlc3MtbGl0ZXJhbCAgPSBTdGFuZGFyZGl6ZWQtdGFnIFwiOlwiIDEqZGNvbnRlbnRcbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vICAgU3RhbmRhcmRpemVkLXRhZyAgPSBMZGgtc3RyXG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA7IFN0YW5kYXJkaXplZC10YWcgTVVTVCBiZSBzcGVjaWZpZWQgaW4gYVxuICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgOyBTdGFuZGFyZHMtVHJhY2sgUkZDIGFuZCByZWdpc3RlcmVkIHdpdGggSUFOQVxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gICBkY29udGVudCAgICAgID0gJWQzMy05MCAvIDsgUHJpbnRhYmxlIFVTLUFTQ0lJXG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgICVkOTQtMTI2IDsgZXhjbC4gXCJbXCIsIFwiXFxcIiwgXCJdXCJcbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vICAgU251bSAgICAgICAgICA9IDEqM0RJR0lUXG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgIDsgcmVwcmVzZW50aW5nIGEgZGVjaW1hbCBpbnRlZ2VyXG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgIDsgdmFsdWUgaW4gdGhlIHJhbmdlIDAgdGhyb3VnaCAyNTVcbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vICAgSVB2Ni1hZGRyICAgICA9IElQdjYtZnVsbCAvIElQdjYtY29tcCAvIElQdjZ2NC1mdWxsIC8gSVB2NnY0LWNvbXBcbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vICAgSVB2Ni1oZXggICAgICA9IDEqNEhFWERJR1xuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gICBJUHY2LWZ1bGwgICAgID0gSVB2Ni1oZXggNyhcIjpcIiBJUHY2LWhleClcbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vICAgSVB2Ni1jb21wICAgICA9IFtJUHY2LWhleCAqNShcIjpcIiBJUHY2LWhleCldIFwiOjpcIlxuICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBbSVB2Ni1oZXggKjUoXCI6XCIgSVB2Ni1oZXgpXVxuICAgICAgICAgIC8vICAgICAgICAgICAgICAgICA7IFRoZSBcIjo6XCIgcmVwcmVzZW50cyBhdCBsZWFzdCAyIDE2LWJpdCBncm91cHMgb2ZcbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgOyB6ZXJvcy4gIE5vIG1vcmUgdGhhbiA2IGdyb3VwcyBpbiBhZGRpdGlvbiB0byB0aGVcbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgOyBcIjo6XCIgbWF5IGJlIHByZXNlbnQuXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyAgIElQdjZ2NC1mdWxsICAgPSBJUHY2LWhleCA1KFwiOlwiIElQdjYtaGV4KSBcIjpcIiBJUHY0LWFkZHJlc3MtbGl0ZXJhbFxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gICBJUHY2djQtY29tcCAgID0gW0lQdjYtaGV4ICozKFwiOlwiIElQdjYtaGV4KV0gXCI6OlwiXG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgIFtJUHY2LWhleCAqMyhcIjpcIiBJUHY2LWhleCkgXCI6XCJdXG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgIElQdjQtYWRkcmVzcy1saXRlcmFsXG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgIDsgVGhlIFwiOjpcIiByZXByZXNlbnRzIGF0IGxlYXN0IDIgMTYtYml0IGdyb3VwcyBvZlxuICAgICAgICAgIC8vICAgICAgICAgICAgICAgICA7IHplcm9zLiAgTm8gbW9yZSB0aGFuIDQgZ3JvdXBzIGluIGFkZGl0aW9uIHRvIHRoZVxuICAgICAgICAgIC8vICAgICAgICAgICAgICAgICA7IFwiOjpcIiBhbmQgSVB2NC1hZGRyZXNzLWxpdGVyYWwgbWF5IGJlIHByZXNlbnQuXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyBpc19lbWFpbCgpIGF1dGhvcidzIG5vdGU6IFdlIGNhbid0IHVzZSBpcDJsb25nKCkgdG8gdmFsaWRhdGVcbiAgICAgICAgICAvLyBJUHY0IGFkZHJlc3NlcyBiZWNhdXNlIGl0IGFjY2VwdHMgYWJicmV2aWF0ZWQgYWRkcmVzc2VzXG4gICAgICAgICAgLy8gKHh4eC54eHgueHh4KSwgZXhwYW5kaW5nIHRoZSBsYXN0IGdyb3VwIHRvIGNvbXBsZXRlIHRoZSBhZGRyZXNzLlxuICAgICAgICAgIC8vIGZpbHRlcl92YXIoKSB2YWxpZGF0ZXMgSVB2NiBhZGRyZXNzIGluY29uc2lzdGVudGx5ICh1cCB0byBQSFAgNS4zLjNcbiAgICAgICAgICAvLyBhdCBsZWFzdCkgLS0gc2VlIGh0dHA6Ly9idWdzLnBocC5uZXQvYnVnLnBocD9pZD01MzIzNiBmb3IgZXhhbXBsZVxuXG4gICAgICAgICAgLy8gVE9ETzogdmFyIGhlcmU/XG4gICAgICAgICAgdmFyIG1heEdyb3VwcyA9IDgsIG1hdGNoZXNJUCwgaW5kZXggPSBmYWxzZTtcbiAgICAgICAgICB2YXIgYWRkcmVzc0xpdGVyYWwgPSBwYXJzZURhdGEubGl0ZXJhbDtcblxuICAgICAgICAgIC8vIG1heWJlIGV4dHJhY3QgSVB2NCBwYXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYWRkcmVzcy1saXRlcmFsXG4gICAgICAgICAgaWYgKG1hdGNoZXNJUCA9IElQdjRfUkVHRVguZXhlYyhhZGRyZXNzTGl0ZXJhbCkpIHtcbiAgICAgICAgICAgIGlmICgoaW5kZXggPSBtYXRjaGVzSVAuaW5kZXgpICE9PSAwKSB7XG4gICAgICAgICAgICAgIC8vIGNvbnZlcnQgSVB2NCBwYXJ0IHRvIElQdjYgZm9ybWF0IGZvciBmdXRoZXIgdGVzdGluZ1xuICAgICAgICAgICAgICBhZGRyZXNzTGl0ZXJhbCA9IGFkZHJlc3NMaXRlcmFsLnNsaWNlKDAsIG1hdGNoZXNJUC5pbmRleCkgKyAnMDowJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vdGhpbmcgdGhlcmUgZXhjZXB0IGEgdmFsaWQgSVB2NCBhZGRyZXNzLCBzby4uLlxuICAgICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfUkZDNTMyMV9BRERSRVNTTElURVJBTCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChhZGRyZXNzTGl0ZXJhbC5zbGljZSgwLCA1KS50b0xvd2VyQ2FzZSgpICE9PSAnaXB2NjonKSB7XG4gICAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9SRkM1MzIyX0RPTUFJTkxJVEVSQUwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBhZGRyZXNzTGl0ZXJhbC5zdWJzdHIoNSk7XG4gICAgICAgICAgICBtYXRjaGVzSVAgPSBtYXRjaC5zcGxpdCgnOicpO1xuICAgICAgICAgICAgaW5kZXggPSBtYXRjaC5pbmRleE9mKCc6OicpO1xuXG4gICAgICAgICAgICBpZiAoIX5pbmRleCkge1xuICAgICAgICAgICAgICAvLyBuZWVkIGV4YWN0bHkgdGhlIHJpZ2h0IG51bWJlciBvZiBncm91cHNcbiAgICAgICAgICAgICAgaWYgKG1hdGNoZXNJUC5sZW5ndGggIT09IG1heEdyb3Vwcykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX1JGQzUzMjJfSVBWNl9HUlBDT1VOVCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggIT09IG1hdGNoLmxhc3RJbmRleE9mKCc6OicpKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX1JGQzUzMjJfSVBWNl8yWDJYQ09MT04pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwIHx8IGluZGV4ID09PSBtYXRjaC5sZW5ndGggLSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gUkZDIDQyOTEgYWxsb3dzIDo6IGF0IHRoZSBzdGFydCBvciBlbmQgb2YgYW4gYWRkcmVzcyB3aXRoXG4gICAgICAgICAgICAgICAgLy8gNyBvdGhlciBncm91cHMgaW4gYWRkaXRpb25cbiAgICAgICAgICAgICAgICBtYXhHcm91cHMrKztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChtYXRjaGVzSVAubGVuZ3RoID4gbWF4R3JvdXBzKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfUkZDNTMyMl9JUFY2X01BWEdSUFMpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZXNJUC5sZW5ndGggPT09IG1heEdyb3Vwcykge1xuICAgICAgICAgICAgICAgIC8vIGVsaWRpbmcgYSBzaW5nbGUgXCI6OlwiXG4gICAgICAgICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfUkZDNTMyMV9JUFY2REVQUkVDQVRFRCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSVB2NiB0ZXN0aW5nIHN0cmF0ZWd5XG4gICAgICAgICAgICBpZiAobWF0Y2hbMF0gPT09ICc6JyAmJiBtYXRjaFsxXSAhPT0gJzonKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX1JGQzUzMjJfSVBWNl9DT0xPTlNUUlQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFttYXRjaC5sZW5ndGggLSAxXSA9PT0gJzonICYmXG4gICAgICAgICAgICAgICAgICAgICAgIG1hdGNoW21hdGNoLmxlbmd0aCAtIDJdICE9PSAnOicpIHtcbiAgICAgICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfUkZDNTMyMl9JUFY2X0NPTE9ORU5EKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlc0lQLmV2ZXJ5KElQdjZfUkVHRVhfVEVTVCkpIHtcbiAgICAgICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfUkZDNTMyMV9BRERSRVNTTElURVJBTCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9SRkM1MzIyX0lQVjZfQkFEQ0hBUik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX1JGQzUzMjJfRE9NQUlOTElURVJBTCk7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJzZURhdGEuZG9tYWluICs9IHRva2VuO1xuICAgICAgICBhdG9tTGlzdC5kb21haW5bZWxlbWVudENvdW50XSArPSB0b2tlbjtcbiAgICAgICAgZWxlbWVudExlbmd0aCsrO1xuICAgICAgICBjb250ZXh0LnByZXYgPSBjb250ZXh0Lm5vdztcbiAgICAgICAgY29udGV4dC5ub3cgPSBjb250ZXh0LnN0YWNrLnBvcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1xcXFwnOlxuICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9SRkM1MzIyX0RPTUxJVF9PQlNEVEVYVCk7XG4gICAgICAgIGNvbnRleHQuc3RhY2sucHVzaChjb250ZXh0Lm5vdyk7XG4gICAgICAgIGNvbnRleHQubm93ID0gQ09OVEVYVF9RVU9URURQQUlSO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIGZvbGRpbmcgd2hpdGUgc3BhY2VcbiAgICAgIGNhc2UgJ1xccic6XG4gICAgICAgIGlmICgoKytpID09PSBlbWFpbC5sZW5ndGgpIHx8IGVtYWlsW2ldICE9PSAnXFxuJykge1xuICAgICAgICAgIC8vIGZhdGFsIGVycm9yXG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX0NSX05PX0xGKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSAnICc6XG4gICAgICBjYXNlICdcXHQnOlxuICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9DRldTX0ZXUyk7XG5cbiAgICAgICAgY29udGV4dC5zdGFjay5wdXNoKGNvbnRleHQubm93KTtcbiAgICAgICAgY29udGV4dC5ub3cgPSBDT05URVhUX0ZXUztcbiAgICAgICAgcHJldlRva2VuID0gdG9rZW47XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gZHRleHRcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzUzMjIjc2VjdGlvbi0zLjQuMVxuICAgICAgICAvLyAgIGR0ZXh0ICAgICAgICAgPSAgICVkMzMtOTAgLyAgOyBQcmludGFibGUgVVMtQVNDSUlcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAlZDk0LTEyNiAvIDsgIGNoYXJhY3RlcnMgbm90IGluY2x1ZGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIG9icy1kdGV4dCAgOyAgXCJbXCIsIFwiXVwiLCBvciBcIlxcXCJcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICBvYnMtZHRleHQgICAgID0gICBvYnMtTk8tV1MtQ1RMIC8gcXVvdGVkLXBhaXJcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICBvYnMtTk8tV1MtQ1RMID0gICAlZDEtOCAvICAgIDsgVVMtQVNDSUkgY29udHJvbFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICVkMTEgLyAgICAgOyAgY2hhcmFjdGVycyB0aGF0IGRvIG5vdFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICVkMTIgLyAgICAgOyAgaW5jbHVkZSB0aGUgY2FycmlhZ2VcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAlZDE0LTMxIC8gIDsgIHJldHVybiwgbGluZSBmZWVkLCBhbmRcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAlZDEyNyAgICAgIDsgIHdoaXRlIHNwYWNlIGNoYXJhY3RlcnNcbiAgICAgICAgY2hhckNvZGUgPSB0b2tlbi5jaGFyQ29kZUF0KDApO1xuXG4gICAgICAgIC8vIENSLCBMRiwgU1AgJiBIVEFCIGhhdmUgYWxyZWFkeSBiZWVuIHBhcnNlZCBhYm92ZVxuICAgICAgICBpZiAoY2hhckNvZGUgPiAxMjcgfHwgY2hhckNvZGUgPT09IDAgfHwgdG9rZW4gPT09ICdbJykge1xuICAgICAgICAgIC8vIGZhdGFsIGVycm9yXG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX0VYUEVDVElOR19EVEVYVCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhckNvZGUgPCAzMyB8fCBjaGFyQ29kZSA9PT0gMTI3KSB7XG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfUkZDNTMyMl9ET01MSVRfT0JTRFRFWFQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyc2VEYXRhLmxpdGVyYWwgKz0gdG9rZW47XG4gICAgICAgIHBhcnNlRGF0YS5kb21haW4gKz0gdG9rZW47XG4gICAgICAgIGF0b21MaXN0LmRvbWFpbltlbGVtZW50Q291bnRdICs9IHRva2VuO1xuICAgICAgICBlbGVtZW50TGVuZ3RoKys7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICAvLyBxdW90ZWQgc3RyaW5nXG4gICAgY2FzZSBDT05URVhUX1FVT1RFRFNUUklORzpcbiAgICAgIC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzUzMjIjc2VjdGlvbi0zLjIuNFxuICAgICAgLy8gICBxdW90ZWQtc3RyaW5nID0gW0NGV1NdXG4gICAgICAvLyAgICAgICAgICAgICAgICAgICBEUVVPVEUgKihbRldTXSBxY29udGVudCkgW0ZXU10gRFFVT1RFXG4gICAgICAvLyAgICAgICAgICAgICAgICAgICBbQ0ZXU11cbiAgICAgIC8vXG4gICAgICAvLyAgIHFjb250ZW50ICAgICAgPSBxdGV4dCAvIHF1b3RlZC1wYWlyXG4gICAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBxdW90ZWQgcGFpclxuICAgICAgY2FzZSAnXFxcXCc6XG4gICAgICAgIGNvbnRleHQuc3RhY2sucHVzaChjb250ZXh0Lm5vdyk7XG4gICAgICAgIGNvbnRleHQubm93ID0gQ09OVEVYVF9RVU9URURQQUlSO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIGZvbGRpbmcgd2hpdGUgc3BhY2VcbiAgICAgIC8vIGluc2lkZSBhIHF1b3RlZCBzdHJpbmcsIHNwYWNlcyBhcmUgYWxsb3dlZCBhcyByZWd1bGFyIGNoYXJhY3RlcnNcbiAgICAgIC8vIGl0J3Mgb25seSBGV1MgaWYgd2UgaW5jbHVkZSBIVEFCIG9yIENSTEZcbiAgICAgIGNhc2UgJ1xccic6XG4gICAgICAgIGlmICgoKytpID09PSBlbWFpbC5sZW5ndGgpIHx8IGVtYWlsW2ldICE9PSAnXFxuJykge1xuICAgICAgICAgIC8vIGZhdGFsIGVycm9yXG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX0NSX05PX0xGKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSAnXFx0JzpcbiAgICAgICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTMyMiNzZWN0aW9uLTMuMi4yXG4gICAgICAgIC8vICAgUnVucyBvZiBGV1MsIGNvbW1lbnQsIG9yIENGV1MgdGhhdCBvY2N1ciBiZXR3ZWVuIGxleGljYWwgdG9rZW5zIGluXG4gICAgICAgIC8vICAgYSBzdHJ1Y3R1cmVkIGhlYWRlciBmaWVsZCBhcmUgc2VtYW50aWNhbGx5IGludGVycHJldGVkIGFzIGEgc2luZ2xlXG4gICAgICAgIC8vICAgc3BhY2UgY2hhcmFjdGVyLlxuXG4gICAgICAgIC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzUzMjIjc2VjdGlvbi0zLjIuNFxuICAgICAgICAvLyAgIHRoZSBDUkxGIGluIGFueSBGV1MvQ0ZXUyB0aGF0IGFwcGVhcnMgd2l0aGluIHRoZSBxdW90ZWQtc3RyaW5nIFtpc11cbiAgICAgICAgLy8gICBzZW1hbnRpY2FsbHkgXCJpbnZpc2libGVcIiBhbmQgdGhlcmVmb3JlIG5vdCBwYXJ0IG9mIHRoZVxuICAgICAgICAvLyAgIHF1b3RlZC1zdHJpbmdcblxuICAgICAgICBwYXJzZURhdGEubG9jYWwgKz0gJyAnO1xuICAgICAgICBhdG9tTGlzdC5sb2NhbFtlbGVtZW50Q291bnRdICs9ICcgJztcbiAgICAgICAgZWxlbWVudExlbmd0aCsrO1xuXG4gICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX0NGV1NfRldTKTtcbiAgICAgICAgY29udGV4dC5zdGFjay5wdXNoKGNvbnRleHQubm93KTtcbiAgICAgICAgY29udGV4dC5ub3cgPSBDT05URVhUX0ZXUztcbiAgICAgICAgcHJldlRva2VuID0gdG9rZW47XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gZW5kIG9mIHF1b3RlZCBzdHJpbmdcbiAgICAgIGNhc2UgJ1wiJzpcbiAgICAgICAgcGFyc2VEYXRhLmxvY2FsICs9IHRva2VuO1xuICAgICAgICBhdG9tTGlzdC5sb2NhbFtlbGVtZW50Q291bnRdICs9IHRva2VuO1xuICAgICAgICBlbGVtZW50TGVuZ3RoKys7XG4gICAgICAgIGNvbnRleHQucHJldiA9IGNvbnRleHQubm93O1xuICAgICAgICBjb250ZXh0Lm5vdyA9IGNvbnRleHQuc3RhY2sucG9wKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gcXRleHRcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzUzMjIjc2VjdGlvbi0zLjIuNFxuICAgICAgICAvLyAgIHF0ZXh0ICAgICAgICAgID0gICAlZDMzIC8gICAgICAgICAgICAgOyBQcmludGFibGUgVVMtQVNDSUlcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgJWQzNS05MSAvICAgICAgICAgIDsgIGNoYXJhY3RlcnMgbm90IGluY2x1ZGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAlZDkzLTEyNiAvICAgICAgICAgOyAgXCJcXFwiIG9yIHRoZSBxdW90ZSBjaGFyYWN0ZXJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgb2JzLXF0ZXh0XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgb2JzLXF0ZXh0ICAgICAgPSAgIG9icy1OTy1XUy1DVExcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICBvYnMtTk8tV1MtQ1RMICA9ICAgJWQxLTggLyAgICAgICAgICAgIDsgVVMtQVNDSUkgY29udHJvbFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAlZDExIC8gICAgICAgICAgICAgOyAgY2hhcmFjdGVycyB0aGF0IGRvIG5vdFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAlZDEyIC8gICAgICAgICAgICAgOyAgaW5jbHVkZSB0aGUgY2FycmlhZ2VcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgJWQxNC0zMSAvICAgICAgICAgIDsgIHJldHVybiwgbGluZSBmZWVkLCBhbmRcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgJWQxMjcgICAgICAgICAgICAgIDsgIHdoaXRlIHNwYWNlIGNoYXJhY3RlcnNcbiAgICAgICAgY2hhckNvZGUgPSB0b2tlbi5jaGFyQ29kZUF0KDApO1xuXG4gICAgICAgIGlmIChjaGFyQ29kZSA+IDEyNyB8fCBjaGFyQ29kZSA9PT0gMCB8fCBjaGFyQ29kZSA9PT0gMTApIHtcbiAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9FUlJfRVhQRUNUSU5HX1FURVhUKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyQ29kZSA8IDMyIHx8IGNoYXJDb2RlID09PSAxMjcpIHtcbiAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9ERVBSRUNfUVRFWFQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyc2VEYXRhLmxvY2FsICs9IHRva2VuO1xuICAgICAgICBhdG9tTGlzdC5sb2NhbFtlbGVtZW50Q291bnRdICs9IHRva2VuO1xuICAgICAgICBlbGVtZW50TGVuZ3RoKys7XG4gICAgICB9XG5cbiAgICAgIC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzUzMjIjc2VjdGlvbi0zLjQuMVxuICAgICAgLy8gICBJZiB0aGUgc3RyaW5nIGNhbiBiZSByZXByZXNlbnRlZCBhcyBhIGRvdC1hdG9tICh0aGF0IGlzLCBpdCBjb250YWluc1xuICAgICAgLy8gICBubyBjaGFyYWN0ZXJzIG90aGVyIHRoYW4gYXRleHQgY2hhcmFjdGVycyBvciBcIi5cIiBzdXJyb3VuZGVkIGJ5IGF0ZXh0XG4gICAgICAvLyAgIGNoYXJhY3RlcnMpLCB0aGVuIHRoZSBkb3QtYXRvbSBmb3JtIFNIT1VMRCBiZSB1c2VkIGFuZCB0aGUgcXVvdGVkLVxuICAgICAgLy8gICBzdHJpbmcgZm9ybSBTSE9VTEQgTk9UIGJlIHVzZWQuXG5cbiAgICAgIGJyZWFrO1xuICAgIC8vIHF1b3RlZCBwYWlyXG4gICAgY2FzZSBDT05URVhUX1FVT1RFRFBBSVI6XG4gICAgICAvLyBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1MzIyI3NlY3Rpb24tMy4yLjFcbiAgICAgIC8vICAgcXVvdGVkLXBhaXIgICAgID0gICAoXCJcXFwiIChWQ0hBUiAvIFdTUCkpIC8gb2JzLXFwXG4gICAgICAvL1xuICAgICAgLy8gICBWQ0hBUiAgICAgICAgICAgPSAgJWQzMy0xMjYgICA7IHZpc2libGUgKHByaW50aW5nKSBjaGFyYWN0ZXJzXG4gICAgICAvLyAgIFdTUCAgICAgICAgICAgICA9ICBTUCAvIEhUQUIgIDsgd2hpdGUgc3BhY2VcbiAgICAgIC8vXG4gICAgICAvLyAgIG9icy1xcCAgICAgICAgICA9ICAgXCJcXFwiICglZDAgLyBvYnMtTk8tV1MtQ1RMIC8gTEYgLyBDUilcbiAgICAgIC8vXG4gICAgICAvLyAgIG9icy1OTy1XUy1DVEwgICA9ICAgJWQxLTggLyAgIDsgVVMtQVNDSUkgY29udHJvbFxuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICVkMTEgLyAgICA7ICBjaGFyYWN0ZXJzIHRoYXQgZG8gbm90XG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgJWQxMiAvICAgIDsgIGluY2x1ZGUgdGhlIGNhcnJpYWdlXG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgJWQxNC0zMSAvIDsgIHJldHVybiwgbGluZSBmZWVkLCBhbmRcbiAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAlZDEyNyAgICAgOyAgd2hpdGUgc3BhY2UgY2hhcmFjdGVyc1xuICAgICAgLy9cbiAgICAgIC8vIGkuZS4gb2JzLXFwICAgICAgID0gIFwiXFxcIiAoJWQwLTgsICVkMTAtMzEgLyAlZDEyNylcbiAgICAgIGNoYXJDb2RlID0gdG9rZW4uY2hhckNvZGVBdCgwKTtcblxuICAgICAgaWYgKGNoYXJDb2RlID4gMTI3KSB7XG4gICAgICAgIC8vIGZhdGFsIGVycm9yXG4gICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX0VSUl9FWFBFQ1RJTkdfUVBBSVIpO1xuICAgICAgfSBlbHNlIGlmICgoY2hhckNvZGUgPCAzMSAmJiBjaGFyQ29kZSAhPT0gOSkgfHwgY2hhckNvZGUgPT09IDEyNykge1xuICAgICAgICAvLyBTUCAmIEhUQUIgYXJlIGFsbG93ZWRcbiAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfREVQUkVDX1FQKTtcbiAgICAgIH1cblxuICAgICAgLy8gQXQgdGhpcyBwb2ludCB3ZSBrbm93IHdoZXJlIHRoaXMgcXBhaXIgb2NjdXJyZWQgc29cbiAgICAgIC8vIHdlIGNvdWxkIGNoZWNrIHRvIHNlZSBpZiB0aGUgY2hhcmFjdGVyIGFjdHVhbGx5XG4gICAgICAvLyBuZWVkZWQgdG8gYmUgcXVvdGVkIGF0IGFsbC5cbiAgICAgIC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzUzMjEjc2VjdGlvbi00LjEuMlxuICAgICAgLy8gICB0aGUgc2VuZGluZyBzeXN0ZW0gU0hPVUxEIHRyYW5zbWl0IHRoZVxuICAgICAgLy8gICBmb3JtIHRoYXQgdXNlcyB0aGUgbWluaW11bSBxdW90aW5nIHBvc3NpYmxlLlxuXG4gICAgICAvLyBUT0RPOiBjaGVjayB3aGV0aGVyIHRoZSBjaGFyYWN0ZXIgbmVlZHMgdG8gYmUgcXVvdGVkIChlc2NhcGVkKVxuICAgICAgLy8gaW4gdGhpcyBjb250ZXh0XG5cbiAgICAgIGNvbnRleHQucHJldiA9IGNvbnRleHQubm93O1xuICAgICAgY29udGV4dC5ub3cgPSBjb250ZXh0LnN0YWNrLnBvcCgpOyAvLyBlbmQgb2YgcXBhaXJcbiAgICAgIHRva2VuID0gJ1xcXFwnICsgdG9rZW47XG5cbiAgICAgIHN3aXRjaCAoY29udGV4dC5ub3cpIHtcbiAgICAgIGNhc2UgQ09OVEVYVF9DT01NRU5UOiBicmVhaztcbiAgICAgIGNhc2UgQ09OVEVYVF9RVU9URURTVFJJTkc6XG4gICAgICAgIHBhcnNlRGF0YS5sb2NhbCArPSB0b2tlbjtcbiAgICAgICAgYXRvbUxpc3QubG9jYWxbZWxlbWVudENvdW50XSArPSB0b2tlbjtcblxuICAgICAgICAvLyB0aGUgbWF4aW11bSBzaXplcyBzcGVjaWZpZWQgYnkgUkZDIDUzMjEgYXJlIG9jdGV0IGNvdW50cyxcbiAgICAgICAgLy8gc28gd2UgbXVzdCBpbmNsdWRlIHRoZSBiYWNrc2xhc2hcbiAgICAgICAgZWxlbWVudExlbmd0aCArPSAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ09NUE9ORU5UX0xJVEVSQUw6XG4gICAgICAgIHBhcnNlRGF0YS5kb21haW4gKz0gdG9rZW47XG4gICAgICAgIGF0b21MaXN0LmRvbWFpbltlbGVtZW50Q291bnRdICs9IHRva2VuO1xuXG4gICAgICAgIC8vIHRoZSBtYXhpbXVtIHNpemVzIHNwZWNpZmllZCBieSBSRkMgNTMyMSBhcmUgb2N0ZXQgY291bnRzLFxuICAgICAgICAvLyBzbyB3ZSBtdXN0IGluY2x1ZGUgdGhlIGJhY2tzbGFzaFxuICAgICAgICBlbGVtZW50TGVuZ3RoICs9IDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IGxvZ2ljYWxseSB1bnJlYWNoYWJsZSAqL1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdxdW90ZWQgcGFpciBsb2dpYyBpbnZva2VkIGluIGFuIGludmFsaWQgY29udGV4dDogJyArXG4gICAgICAgICAgY29udGV4dC5ub3cpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgLy8gY29tbWVudFxuICAgIGNhc2UgQ09OVEVYVF9DT01NRU5UOlxuICAgICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTMyMiNzZWN0aW9uLTMuMi4yXG4gICAgICAvLyAgIGNvbW1lbnQgID0gXCIoXCIgKihbRldTXSBjY29udGVudCkgW0ZXU10gXCIpXCJcbiAgICAgIC8vXG4gICAgICAvLyAgIGNjb250ZW50ID0gY3RleHQgLyBxdW90ZWQtcGFpciAvIGNvbW1lbnRcbiAgICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIG5lc3RlZCBjb21tZW50XG4gICAgICBjYXNlICcoJzpcbiAgICAgICAgLy8gbmVzdGVkIGNvbW1lbnRzIGFyZSBva1xuICAgICAgICBjb250ZXh0LnN0YWNrLnB1c2goY29udGV4dC5ub3cpO1xuICAgICAgICBjb250ZXh0Lm5vdyA9IENPTlRFWFRfQ09NTUVOVDtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBlbmQgb2YgY29tbWVudFxuICAgICAgY2FzZSAnKSc6XG4gICAgICAgIGNvbnRleHQucHJldiA9IGNvbnRleHQubm93O1xuICAgICAgICBjb250ZXh0Lm5vdyA9IGNvbnRleHQuc3RhY2sucG9wKCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBxdW90ZWQgcGFpclxuICAgICAgY2FzZSAnXFxcXCc6XG4gICAgICAgIGNvbnRleHQuc3RhY2sucHVzaChjb250ZXh0Lm5vdyk7XG4gICAgICAgIGNvbnRleHQubm93ID0gQ09OVEVYVF9RVU9URURQQUlSO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIGZvbGRpbmcgd2hpdGUgc3BhY2VcbiAgICAgIGNhc2UgJ1xccic6XG4gICAgICAgIGlmICgoKytpID09PSBlbWFpbC5sZW5ndGgpIHx8IGVtYWlsW2ldICE9PSAnXFxuJykge1xuICAgICAgICAgIC8vIGZhdGFsIGVycm9yXG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX0NSX05PX0xGKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSAnICc6XG4gICAgICBjYXNlICdcXHQnOlxuICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9DRldTX0ZXUyk7XG5cbiAgICAgICAgY29udGV4dC5zdGFjay5wdXNoKGNvbnRleHQubm93KTtcbiAgICAgICAgY29udGV4dC5ub3cgPSBDT05URVhUX0ZXUztcbiAgICAgICAgcHJldlRva2VuID0gdG9rZW47XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gY3RleHRcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzUzMjIjc2VjdGlvbi0zLjIuM1xuICAgICAgICAvLyAgIGN0ZXh0ICAgICAgICAgPSAlZDMzLTM5IC8gIDsgUHJpbnRhYmxlIFVTLUFTQ0lJXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICVkNDItOTEgLyAgOyAgY2hhcmFjdGVycyBub3QgaW5jbHVkaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICVkOTMtMTI2IC8gOyAgXCIoXCIsIFwiKVwiLCBvciBcIlxcXCJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgb2JzLWN0ZXh0XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgb2JzLWN0ZXh0ICAgICA9IG9icy1OTy1XUy1DVExcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICBvYnMtTk8tV1MtQ1RMID0gJWQxLTggLyAgICA7IFVTLUFTQ0lJIGNvbnRyb2xcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgJWQxMSAvICAgICA7ICBjaGFyYWN0ZXJzIHRoYXQgZG8gbm90XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICVkMTIgLyAgICAgOyAgaW5jbHVkZSB0aGUgY2FycmlhZ2VcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgJWQxNC0zMSAvICA7ICByZXR1cm4sIGxpbmUgZmVlZCwgYW5kXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICVkMTI3ICAgICAgOyAgd2hpdGUgc3BhY2UgY2hhcmFjdGVyc1xuICAgICAgICBjaGFyQ29kZSA9IHRva2VuLmNoYXJDb2RlQXQoMCk7XG5cbiAgICAgICAgaWYgKGNoYXJDb2RlID4gMTI3IHx8IGNoYXJDb2RlID09PSAwIHx8IGNoYXJDb2RlID09PSAxMCkge1xuICAgICAgICAgIC8vIGZhdGFsIGVycm9yXG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX0VYUEVDVElOR19DVEVYVCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhckNvZGUgPCAzMiB8fCBjaGFyQ29kZSA9PT0gMTI3KSB7XG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfREVQUkVDX0NURVhUKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgLy8gZm9sZGluZyB3aGl0ZSBzcGFjZVxuICAgIGNhc2UgQ09OVEVYVF9GV1M6XG4gICAgICAvLyBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1MzIyI3NlY3Rpb24tMy4yLjJcbiAgICAgIC8vICAgRldTICAgICA9ICAgKFsqV1NQIENSTEZdIDEqV1NQKSAvICBvYnMtRldTXG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyBGb2xkaW5nIHdoaXRlIHNwYWNlXG5cbiAgICAgIC8vIEJ1dCBub3RlIHRoZSBlcnJhdHVtOlxuICAgICAgLy8gaHR0cDovL3d3dy5yZmMtZWRpdG9yLm9yZy9lcnJhdGFfc2VhcmNoLnBocD9yZmM9NTMyMiZlaWQ9MTkwODpcbiAgICAgIC8vICAgSW4gdGhlIG9ic29sZXRlIHN5bnRheCwgYW55IGFtb3VudCBvZiBmb2xkaW5nIHdoaXRlIHNwYWNlIE1BWSBiZVxuICAgICAgLy8gICBpbnNlcnRlZCB3aGVyZSB0aGUgb2JzLUZXUyBydWxlIGlzIGFsbG93ZWQuICBUaGlzIGNyZWF0ZXMgdGhlXG4gICAgICAvLyAgIHBvc3NpYmlsaXR5IG9mIGhhdmluZyB0d28gY29uc2VjdXRpdmUgXCJmb2xkc1wiIGluIGEgbGluZSwgYW5kXG4gICAgICAvLyAgIHRoZXJlZm9yZSB0aGUgcG9zc2liaWxpdHkgdGhhdCBhIGxpbmUgd2hpY2ggbWFrZXMgdXAgYSBmb2xkZWQgaGVhZGVyXG4gICAgICAvLyAgIGZpZWxkIGNvdWxkIGJlIGNvbXBvc2VkIGVudGlyZWx5IG9mIHdoaXRlIHNwYWNlLlxuICAgICAgLy9cbiAgICAgIC8vICAgb2JzLUZXUyA9ICAgMSooW0NSTEZdIFdTUClcblxuICAgICAgaWYgKHByZXZUb2tlbiA9PT0gJ1xccicpIHtcbiAgICAgICAgaWYgKHRva2VuID09PSAnXFxyJykge1xuICAgICAgICAgIC8vIGZhdGFsIGVycm9yXG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX0ZXU19DUkxGX1gyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgrK2NybGZDb3VudCA+IDEpIHtcbiAgICAgICAgICAvLyBtdWx0aXBsZSBmb2xkcyA9IG9ic29sZXRlIEZXU1xuICAgICAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX0RFUFJFQ19GV1MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNybGZDb3VudCA9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSAnXFxyJzpcbiAgICAgICAgaWYgKCgrK2kgPT09IGVtYWlsLmxlbmd0aCkgfHwgZW1haWxbaV0gIT09ICdcXG4nKSB7XG4gICAgICAgICAgLy8gZmF0YWwgZXJyb3JcbiAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9FUlJfQ1JfTk9fTEYpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnICc6XG4gICAgICBjYXNlICdcXHQnOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChwcmV2VG9rZW4gPT09ICdcXHInKSB7XG4gICAgICAgICAgLy8gZmF0YWwgZXJyb3JcbiAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9FUlJfRldTX0NSTEZfRU5EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNybGZDb3VudCA9IDA7XG5cbiAgICAgICAgY29udGV4dC5wcmV2ID0gY29udGV4dC5ub3c7XG4gICAgICAgIGNvbnRleHQubm93ID0gY29udGV4dC5zdGFjay5wb3AoKTsgLy8gZW5kIG9mIEZXU1xuXG4gICAgICAgIGktLTsgLy8gbG9vayBhdCB0aGlzIHRva2VuIGFnYWluIGluIHRoZSBwYXJlbnQgY29udGV4dFxuICAgICAgfVxuICAgICAgcHJldlRva2VuID0gdG9rZW47XG4gICAgICBicmVhaztcbiAgICAvLyB1bmV4cGVjdGVkIGNvbnRleHRcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogbG9naWNhbGx5IHVucmVhY2hhYmxlICovXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biBjb250ZXh0OiAnICsgY29udGV4dC5ub3cpO1xuICAgIH0gLy8gcHJpbWFyeSBzdGF0ZSBtYWNoaW5lXG5cbiAgICBpZiAobWF4UmVzdWx0ID4gSVNFTUFJTF9SRkM1MzIyKSB7XG4gICAgICAvLyBmYXRhbCBlcnJvciwgbm8gcG9pbnQgY29udGludWluZ1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9IC8vIHRva2VuIGxvb3BcblxuICAvLyBjaGVjayBmb3IgZXJyb3JzXG4gIGlmIChtYXhSZXN1bHQgPCBJU0VNQUlMX1JGQzUzMjIpIHtcbiAgICAvLyBmYXRhbCBlcnJvcnNcbiAgICBpZiAoY29udGV4dC5ub3cgPT09IENPTlRFWFRfUVVPVEVEU1RSSU5HKSB7XG4gICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9FUlJfVU5DTE9TRURRVU9URURTVFIpO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dC5ub3cgPT09IENPTlRFWFRfUVVPVEVEUEFJUikge1xuICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX0JBQ0tTTEFTSEVORCk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0Lm5vdyA9PT0gQ09OVEVYVF9DT01NRU5UKSB7XG4gICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9FUlJfVU5DTE9TRURDT01NRU5UKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRleHQubm93ID09PSBDT01QT05FTlRfTElURVJBTCkge1xuICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX1VOQ0xPU0VERE9NTElUKTtcbiAgICB9IGVsc2UgaWYgKHRva2VuID09PSAnXFxyJykge1xuICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX0ZXU19DUkxGX0VORCk7XG4gICAgfSBlbHNlIGlmIChwYXJzZURhdGEuZG9tYWluLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX05PRE9NQUlOKTtcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnRMZW5ndGggPT09IDApIHtcbiAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX0VSUl9ET1RfRU5EKTtcbiAgICB9IGVsc2UgaWYgKGh5cGhlbkZsYWcpIHtcbiAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX0VSUl9ET01BSU5IWVBIRU5FTkQpO1xuXG4gICAgLy8gb3RoZXIgZXJyb3JzXG4gICAgfSBlbHNlIGlmIChwYXJzZURhdGEuZG9tYWluLmxlbmd0aCA+IDI1NSkge1xuICAgICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTMyMSNzZWN0aW9uLTQuNS4zLjEuMlxuICAgICAgLy8gICBUaGUgbWF4aW11bSB0b3RhbCBsZW5ndGggb2YgYSBkb21haW4gbmFtZSBvciBudW1iZXIgaXMgMjU1IG9jdGV0cy5cbiAgICAgIHVwZGF0ZVJlc3VsdChJU0VNQUlMX1JGQzUzMjJfRE9NQUlOX1RPT0xPTkcpO1xuICAgIH0gZWxzZSBpZiAocGFyc2VEYXRhLmxvY2FsLmxlbmd0aCArIHBhcnNlRGF0YS5kb21haW4ubGVuZ3RoICsgLyogJ0AnICovIDEgPlxuICAgICAgICAyNTQpIHtcbiAgICAgIC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzUzMjEjc2VjdGlvbi00LjEuMlxuICAgICAgLy8gICBGb3J3YXJkLXBhdGggICA9IFBhdGhcbiAgICAgIC8vXG4gICAgICAvLyAgIFBhdGggICAgICAgICAgID0gXCI8XCIgWyBBLWQtbCBcIjpcIiBdIE1haWxib3ggXCI+XCJcbiAgICAgIC8vXG4gICAgICAvLyBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1MzIxI3NlY3Rpb24tNC41LjMuMS4zXG4gICAgICAvLyAgIFRoZSBtYXhpbXVtIHRvdGFsIGxlbmd0aCBvZiBhIHJldmVyc2UtcGF0aCBvciBmb3J3YXJkLXBhdGggaXMgMjU2XG4gICAgICAvLyAgIG9jdGV0cyAoaW5jbHVkaW5nIHRoZSBwdW5jdHVhdGlvbiBhbmQgZWxlbWVudCBzZXBhcmF0b3JzKS5cbiAgICAgIC8vXG4gICAgICAvLyBUaHVzLCBldmVuIHdpdGhvdXQgKG9ic29sZXRlKSByb3V0aW5nIGluZm9ybWF0aW9uLCB0aGUgTWFpbGJveCBjYW5cbiAgICAgIC8vIG9ubHkgYmUgMjU0IGNoYXJhY3RlcnMgbG9uZy4gVGhpcyBpcyBjb25maXJtZWQgYnkgdGhpcyB2ZXJpZmllZFxuICAgICAgLy8gZXJyYXR1bSB0byBSRkMgMzY5NjpcbiAgICAgIC8vXG4gICAgICAvLyBodHRwOi8vd3d3LnJmYy1lZGl0b3Iub3JnL2VycmF0YV9zZWFyY2gucGhwP3JmYz0zNjk2JmVpZD0xNjkwXG4gICAgICAvLyAgIEhvd2V2ZXIsIHRoZXJlIGlzIGEgcmVzdHJpY3Rpb24gaW4gUkZDIDI4MjEgb24gdGhlIGxlbmd0aCBvZiBhblxuICAgICAgLy8gICBhZGRyZXNzIGluIE1BSUwgYW5kIFJDUFQgY29tbWFuZHMgb2YgMjU0IGNoYXJhY3RlcnMuICBTaW5jZSBhZGRyZXNzZXNcbiAgICAgIC8vICAgdGhhdCBkbyBub3QgZml0IGluIHRob3NlIGZpZWxkcyBhcmUgbm90IG5vcm1hbGx5IHVzZWZ1bCwgdGhlIHVwcGVyXG4gICAgICAvLyAgIGxpbWl0IG9uIGFkZHJlc3MgbGVuZ3RocyBzaG91bGQgbm9ybWFsbHkgYmUgY29uc2lkZXJlZCB0byBiZSAyNTQuXG4gICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9SRkM1MzIyX1RPT0xPTkcpO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudExlbmd0aCA+IDYzKSB7XG4gICAgICAvLyBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMxMDM1I3NlY3Rpb24tMi4zLjRcbiAgICAgIC8vIGxhYmVscyAgIDYzIG9jdGV0cyBvciBsZXNzXG4gICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9SRkM1MzIyX0xBQkVMX1RPT0xPTkcpO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5taW5Eb21haW5BdG9tcyAmJiBhdG9tTGlzdC5kb21haW4ubGVuZ3RoIDxcbiAgICAgICAgb3B0aW9ucy5taW5Eb21haW5BdG9tcykge1xuICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRVJSX1RPT1NIT1JUX0RPTUFJTik7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnRsZFdoaXRlbGlzdCkge1xuICAgICAgdmFyIHRsZEF0b20gPSBhdG9tTGlzdC5kb21haW5bZWxlbWVudENvdW50XSwgdGxkVmFsaWQgPSBmYWxzZSwgbjtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMudGxkV2hpdGVsaXN0KSkge1xuICAgICAgICBmb3IgKGkgPSAwLCBuID0gb3B0aW9ucy50bGRXaGl0ZWxpc3QubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRsZEF0b20gPT09IG9wdGlvbnMudGxkV2hpdGVsaXN0W2ldKSB7XG4gICAgICAgICAgICB0bGRWYWxpZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRsZFZhbGlkID0gaGFzT3duLmNhbGwob3B0aW9ucy50bGRXaGl0ZWxpc3QsIHRsZEF0b20pO1xuICAgICAgfVxuICAgICAgaWYgKCF0bGRWYWxpZCkge1xuICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9FUlJfVU5LTk9XTl9UTEQpO1xuICAgICAgfVxuICAgIH1cbiAgfSAvLyBjaGVjayBmb3IgZXJyb3JzXG5cbiAgdmFyIGRuc1Bvc2l0aXZlID0gZmFsc2U7XG5cbiAgaWYgKG9wdGlvbnMuY2hlY2tETlMgJiYgbWF4UmVzdWx0IDwgSVNFTUFJTF9ETlNXQVJOICYmIEhBU19SRVFVSVJFKSB7XG4gICAgZG5zIHx8IChkbnMgPSByZXF1aXJlKCdkbnMnKSk7XG4gICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTMyMSNzZWN0aW9uLTIuMy41XG4gICAgLy8gICBOYW1lcyB0aGF0IGNhblxuICAgIC8vICAgYmUgcmVzb2x2ZWQgdG8gTVggUlJzIG9yIGFkZHJlc3MgKGkuZS4sIEEgb3IgQUFBQSkgUlJzIChhcyBkaXNjdXNzZWRcbiAgICAvLyAgIGluIFNlY3Rpb24gNSkgYXJlIHBlcm1pdHRlZCwgYXMgYXJlIENOQU1FIFJScyB3aG9zZSB0YXJnZXRzIGNhbiBiZVxuICAgIC8vICAgcmVzb2x2ZWQsIGluIHR1cm4sIHRvIE1YIG9yIGFkZHJlc3MgUlJzLlxuICAgIC8vXG4gICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTMyMSNzZWN0aW9uLTUuMVxuICAgIC8vICAgVGhlIGxvb2t1cCBmaXJzdCBhdHRlbXB0cyB0byBsb2NhdGUgYW4gTVggcmVjb3JkIGFzc29jaWF0ZWQgd2l0aCB0aGVcbiAgICAvLyAgIG5hbWUuICBJZiBhIENOQU1FIHJlY29yZCBpcyBmb3VuZCwgdGhlIHJlc3VsdGluZyBuYW1lIGlzIHByb2Nlc3NlZCBhc1xuICAgIC8vICAgaWYgaXQgd2VyZSB0aGUgaW5pdGlhbCBuYW1lLiAuLi4gSWYgYW4gZW1wdHkgbGlzdCBvZiBNWHMgaXMgcmV0dXJuZWQsXG4gICAgLy8gICB0aGUgYWRkcmVzcyBpcyB0cmVhdGVkIGFzIGlmIGl0IHdhcyBhc3NvY2lhdGVkIHdpdGggYW4gaW1wbGljaXQgTVhcbiAgICAvLyAgIFJSLCB3aXRoIGEgcHJlZmVyZW5jZSBvZiAwLCBwb2ludGluZyB0byB0aGF0IGhvc3QuXG4gICAgLy9cbiAgICAvLyBpc0VtYWlsKCkgYXV0aG9yJ3Mgbm90ZTogV2Ugd2lsbCByZWdhcmQgdGhlIGV4aXN0ZW5jZSBvZiBhIENOQU1FIHRvIGJlXG4gICAgLy8gc3VmZmljaWVudCBldmlkZW5jZSBvZiB0aGUgZG9tYWluJ3MgZXhpc3RlbmNlLiBGb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuICAgIC8vIHdlIHdpbGwgbm90IHJlcGVhdCB0aGUgRE5TIGxvb2t1cCBmb3IgdGhlIENOQU1FJ3MgdGFyZ2V0LCBidXQgd2Ugd2lsbFxuICAgIC8vIHJhaXNlIGEgd2FybmluZyBiZWNhdXNlIHdlIGRpZG4ndCBpbW1lZGlhdGVseSBmaW5kIGFuIE1YIHJlY29yZC5cbiAgICBpZiAoZWxlbWVudENvdW50ID09PSAwKSB7XG4gICAgICAvLyBjaGVja2luZyBUTEQgRE5TIG9ubHkgd29ya3MgaWYgeW91IGV4cGxpY2l0bHkgY2hlY2sgZnJvbSB0aGUgcm9vdFxuICAgICAgcGFyc2VEYXRhLmRvbWFpbiArPSAnLic7XG4gICAgfVxuXG4gICAgdmFyIGRuc0RvbWFpbiA9IHBhcnNlRGF0YS5kb21haW47XG4gICAgZG5zLnJlc29sdmVNeChkbnNEb21haW4sIGZ1bmN0aW9uKGVyciwgcmVjb3Jkcykge1xuICAgICAgaWYgKChlcnIgJiYgZXJyLmNvZGUgIT09IGRucy5OT0RBVEEpIHx8ICghZXJyICYmICFyZWNvcmRzKSkge1xuICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9ETlNXQVJOX05PX1JFQ09SRCk7XG4gICAgICAgIHJldHVybiBmaW5pc2goKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZWNvcmRzICYmIHJlY29yZHMubGVuZ3RoKSB7XG4gICAgICAgIGRuc1Bvc2l0aXZlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZpbmlzaCgpO1xuICAgICAgfVxuICAgICAgdmFyIGRvbmUgPSBmYWxzZSwgY291bnQgPSAzO1xuICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRE5TV0FSTl9OT19NWF9SRUNPUkQpO1xuICAgICAgZG5zLnJlc29sdmVDbmFtZShkbnNEb21haW4sIGhhbmRsZVJlY29yZHMpO1xuICAgICAgZG5zLnJlc29sdmU0KGRuc0RvbWFpbiwgaGFuZGxlUmVjb3Jkcyk7XG4gICAgICBkbnMucmVzb2x2ZTYoZG5zRG9tYWluLCBoYW5kbGVSZWNvcmRzKTtcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlY29yZHMoZXJyLCByZWNvcmRzKSB7XG4gICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgIGNvdW50LS07XG4gICAgICAgIGlmICghZXJyICYmIHJlY29yZHMgJiYgcmVjb3Jkcy5sZW5ndGgpIHtcbiAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgLy8gbm8gdXNhYmxlIHJlY29yZHMgZm9yIHRoZSBkb21haW4gY2FuIGJlIGZvdW5kXG4gICAgICAgICAgdXBkYXRlUmVzdWx0KElTRU1BSUxfRE5TV0FSTl9OT19SRUNPUkQpO1xuICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgIGZpbmlzaCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAob3B0aW9ucy5jaGVja0ROUykge1xuICAgIC8vIGd1YXJhbnRlZSBhc3luY2hyb25pY2l0eVxuICAgIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzICYmXG4gICAgICB0eXBlb2YgcHJvY2Vzcy5uZXh0VGljayA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBwcm9jZXNzLm5leHRUaWNrKGZpbmlzaClcbiAgICAgIDogc2V0VGltZW91dChmaW5pc2gsIDEpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmaW5pc2goKTtcbiAgfSAvLyBjaGVja0ROU1xuXG4gIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICBpZiAoIWRuc1Bvc2l0aXZlICYmIG1heFJlc3VsdCA8IElTRU1BSUxfRE5TV0FSTikge1xuICAgICAgaWYgKGVsZW1lbnRDb3VudCA9PT0gMCkge1xuICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9SRkM1MzIxX1RMRCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY2hhckNvZGUgPSBhdG9tTGlzdC5kb21haW5bZWxlbWVudENvdW50XS5jaGFyQ29kZUF0KDApO1xuICAgICAgICBpZiAoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpIHtcbiAgICAgICAgICB1cGRhdGVSZXN1bHQoSVNFTUFJTF9SRkM1MzIxX1RMRE5VTUVSSUMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1heFJlc3VsdCA8IHRocmVzaG9sZCkge1xuICAgICAgbWF4UmVzdWx0ID0gSVNFTUFJTF9WQUxJRDtcbiAgICB9XG5cbiAgICBpZiAoIWRpYWdub3NlKSB7XG4gICAgICBtYXhSZXN1bHQgPSBtYXhSZXN1bHQgPCBUSFJFU0hPTEQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sobWF4UmVzdWx0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWF4UmVzdWx0O1xuICB9IC8vIGZpbmlzaFxufSAvLyBpc0VtYWlsXG5cbm1vZHVsZS5leHBvcnRzID0gaXNFbWFpbDtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJykpIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciB0b0NhbWVsRm4gPSBmdW5jdGlvbihzdHIsIGxldHRlcil7XG4gICAgICAgcmV0dXJuIGxldHRlciA/IGxldHRlci50b1VwcGVyQ2FzZSgpOiAnJ1xuICAgfVxuXG52YXIgaHlwaGVuUmUgPSByZXF1aXJlKCcuL2h5cGhlblJlJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdHIpe1xuICAgcmV0dXJuIHN0cj9cbiAgICAgICAgICBzdHIucmVwbGFjZShoeXBoZW5SZSwgdG9DYW1lbEZuKTpcbiAgICAgICAgICAnJ1xufSIsInZhciBSRSA9IC9cXHMrL2dcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdHIpe1xuICAgIGlmICghc3RyKXtcbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgcmV0dXJuIHN0ci50cmltKCkucmVwbGFjZShSRSwgJyAnKVxufSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgc2VwYXJhdGUgICAgID0gcmVxdWlyZSgnLi9zZXBhcmF0ZScpXG52YXIgY2FtZWxpemUgICAgID0gcmVxdWlyZSgnLi9jYW1lbGl6ZScpXG52YXIgdG9VcHBlckZpcnN0ID0gcmVxdWlyZSgnLi90b1VwcGVyRmlyc3QnKVxudmFyIGh5cGhlblJlICAgICA9IHJlcXVpcmUoJy4vaHlwaGVuUmUnKVxuXG5mdW5jdGlvbiB0b0xvd2VyQW5kU3BhY2Uoc3RyLCBsZXR0ZXIpe1xuICAgIHJldHVybiBsZXR0ZXI/ICcgJyArIGxldHRlci50b0xvd2VyQ2FzZSgpOiAnICdcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lLCBjb25maWcpe1xuXG4gICAgdmFyIHN0ciA9IGNvbmZpZyAmJiBjb25maWcuY2FwaXRhbGl6ZT9cbiAgICAgICAgICAgICAgICAgICAgc2VwYXJhdGUoY2FtZWxpemUobmFtZSksICcgJyk6XG4gICAgICAgICAgICAgICAgICAgIHNlcGFyYXRlKG5hbWUsICcgJykucmVwbGFjZShoeXBoZW5SZSwgdG9Mb3dlckFuZFNwYWNlKVxuXG4gICAgcmV0dXJuIHRvVXBwZXJGaXJzdChzdHIudHJpbSgpKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAvWy1cXHNdKyguKT8vZyIsIid1c2Ugc3RyaWN0J1xuXG52YXIgc2VwYXJhdGUgPSByZXF1aXJlKCcuL3NlcGFyYXRlJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgIHJldHVybiBzZXBhcmF0ZShuYW1lKS50b0xvd2VyQ2FzZSgpXG59IiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tYXRjaCcpKC9eW2EtekEtWjAtOV0rJC8pIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdpc2VtYWlsJykiLCIndXNlIHN0cmljdCdcblxudmFyIHJlZ2V4ID0gL15bQS1GMC05XXs4fSg/Oi0/W0EtRjAtOV17NH0pezN9LT9bQS1GMC05XXsxMn0kL2lcbnZhciByZWdleDIgPSAvXlxce1tBLUYwLTldezh9KD86LT9bQS1GMC05XXs0fSl7M30tP1tBLUYwLTldezEyfVxcfSQvaVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICByZXR1cm4gcmVnZXgudGVzdCh2YWx1ZSkgfHwgcmVnZXgyLnRlc3QodmFsdWUpXG59XG5cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFscGhhbnVtOiByZXF1aXJlKCcuL2FscGhhbnVtJyksXG4gICAgbWF0Y2ggICA6IHJlcXVpcmUoJy4vbWF0Y2gnKSxcbiAgICBndWlkICAgOiByZXF1aXJlKCcuL2d1aWQnKSxcbiAgICBlbWFpbCAgIDogcmVxdWlyZSgnLi9lbWFpbCcpLFxuICAgIG51bWVyaWMgICA6IHJlcXVpcmUoJy4vbnVtZXJpYycpXG59IiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBGID0gcmVxdWlyZSgnZnVuY3Rpb25hbGx5JylcblxubW9kdWxlLmV4cG9ydHMgPSBGLmN1cnJ5KGZ1bmN0aW9uKHJlLCB2YWx1ZSl7XG4gICAgcmV0dXJuICEhcmUudGVzdCh2YWx1ZSlcbn0pIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnaS1zJykubnVtZXJpYyIsIid1c2Ugc3RyaWN0J1xuXG52YXIgZG91YmxlQ29sb25SZSAgICAgID0gLzo6L2dcbnZhciB1cHBlclRvTG93ZXJSZSAgICAgPSAvKFtBLVpdKykoW0EtWl1bYS16XSkvZ1xudmFyIGxvd2VyVG9VcHBlclJlICAgICA9IC8oW2EtelxcZF0pKFtBLVpdKS9nXG52YXIgdW5kZXJzY29yZVRvRGFzaFJlID0gL18vZ1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUsIHNlcGFyYXRvcil7XG5cbiAgIHJldHVybiBuYW1lP1xuICAgICAgICAgICBuYW1lLnJlcGxhY2UoZG91YmxlQ29sb25SZSwgJy8nKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKHVwcGVyVG9Mb3dlclJlLCAnJDFfJDInKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKGxvd2VyVG9VcHBlclJlLCAnJDFfJDInKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKHVuZGVyc2NvcmVUb0Rhc2hSZSwgc2VwYXJhdG9yIHx8ICctJylcbiAgICAgICAgICAgIDpcbiAgICAgICAgICAgICcnXG59IiwidmFyIFJFID0gL1xccy9nXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RyKXtcbiAgICBpZiAoIXN0cil7XG4gICAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIHJldHVybiBzdHIucmVwbGFjZShSRSwgJycpXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdHIpe1xuICAgIHJldHVybiBzdHIubGVuZ3RoP1xuICAgICAgICAgICAgc3RyLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyLnN1YnN0cmluZygxKTpcbiAgICAgICAgICAgIHN0clxufSIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoP1xuICAgICAgICAgICAgICAgIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc3Vic3RyaW5nKDEpOlxuICAgICAgICAgICAgICAgIHZhbHVlXG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3ByZWZpeGVyJykoKSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgb2JqZWN0SGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHlOYW1lKXtcbiAgICByZXR1cm4gb2JqZWN0SGFzT3duLmNhbGwob2JqZWN0LCBwcm9wZXJ0eU5hbWUpXG59IiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2KSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmFwcGx5KHYpID09PSAnW29iamVjdCBGdW5jdGlvbl0nXG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHYpe1xuICAgIHJldHVybiAhIXYgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuIiwidmFyIHRvVXBwZXJGaXJzdCA9IHJlcXVpcmUoJ3VzdHJpbmcnKS50b1VwcGVyRmlyc3RcblxudmFyIHJlICAgICAgICAgPSAvXihNb3p8V2Via2l0fEtodG1sfE98bXN8SWNhYikoPz1bQS1aXSkvXG5cbnZhciBkb2NTdHlsZSAgID0gdHlwZW9mIGRvY3VtZW50ID09ICd1bmRlZmluZWQnP1xuICAgICAgICAgICAgICAgICAgICB7fTpcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlXG5cbnZhciBwcmVmaXhJbmZvID0gKGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgcHJlZml4ID0gKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gZG9jU3R5bGUpIHtcbiAgICAgICAgICAgICAgICBpZiggcmUudGVzdChwcm9wKSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCBpcyBmYXN0ZXIgdGhhbiBtYXRjaCwgc28gaXQncyBiZXR0ZXIgdG8gcGVyZm9ybVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGF0IG9uIHRoZSBsb3QgYW5kIG1hdGNoIG9ubHkgd2hlbiBuZWNlc3NhcnlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICBwcm9wLm1hdGNoKHJlKVswXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTm90aGluZyBmb3VuZCBzbyBmYXI/IFdlYmtpdCBkb2VzIG5vdCBlbnVtZXJhdGUgb3ZlciB0aGUgQ1NTIHByb3BlcnRpZXMgb2YgdGhlIHN0eWxlIG9iamVjdC5cbiAgICAgICAgICAgIC8vIEhvd2V2ZXIgKHByb3AgaW4gc3R5bGUpIHJldHVybnMgdGhlIGNvcnJlY3QgdmFsdWUsIHNvIHdlJ2xsIGhhdmUgdG8gdGVzdCBmb3JcbiAgICAgICAgICAgIC8vIHRoZSBwcmVjZW5jZSBvZiBhIHNwZWNpZmljIHByb3BlcnR5XG4gICAgICAgICAgICBpZiAoJ1dlYmtpdE9wYWNpdHknIGluIGRvY1N0eWxlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1dlYmtpdCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCdLaHRtbE9wYWNpdHknIGluIGRvY1N0eWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdLaHRtbCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICcnXG4gICAgICAgIH0pKCksXG5cbiAgICBsb3dlciA9IHByZWZpeC50b0xvd2VyQ2FzZSgpXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdHlsZSAgICAgICA6IHByZWZpeCxcbiAgICAgICAgY3NzICAgICAgIDogJy0nICsgbG93ZXIgKyAnLScsXG4gICAgICAgIGRvbSAgICAgICA6ICh7XG4gICAgICAgICAgICBXZWJraXQ6ICdXZWJLaXQnLFxuICAgICAgICAgICAgbXMgICAgOiAnTVMnLFxuICAgICAgICAgICAgbyAgICAgOiAnV2ViS2l0J1xuICAgICAgICB9KVtwcmVmaXhdIHx8IHRvVXBwZXJGaXJzdChwcmVmaXgpXG4gICAgfVxuXG59KSgpXG5cbm1vZHVsZS5leHBvcnRzID0gcHJlZml4SW5mbyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdib3JkZXItcmFkaXVzJyAgICAgICAgICAgICAgOiAxLFxuICAgICdib3JkZXItdG9wLWxlZnQtcmFkaXVzJyAgICAgOiAxLFxuICAgICdib3JkZXItdG9wLXJpZ2h0LXJhZGl1cycgICAgOiAxLFxuICAgICdib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzJyAgOiAxLFxuICAgICdib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1cycgOiAxLFxuICAgICdib3gtc2hhZG93JyAgICAgICAgICAgICAgICAgOiAxLFxuICAgICdvcmRlcicgICAgICAgICAgICAgICAgICAgICAgOiAxLFxuICAgICdmbGV4JyAgICAgICAgICAgICAgICAgICAgICAgOiBmdW5jdGlvbihuYW1lLCBwcmVmaXgpe1xuICAgICAgICByZXR1cm4gW3ByZWZpeCArICdib3gtZmxleCddXG4gICAgfSxcbiAgICAnYm94LWZsZXgnICAgICAgICAgICAgICAgICAgIDogMSxcbiAgICAnYm94LWFsaWduJyAgICAgICAgICAgICAgICAgIDogMSxcbiAgICAnYW5pbWF0aW9uJyAgICAgICAgICAgICAgICAgIDogMSxcbiAgICAnYW5pbWF0aW9uLWR1cmF0aW9uJyAgICAgICAgIDogMSxcbiAgICAnYW5pbWF0aW9uLW5hbWUnICAgICAgICAgICAgIDogMSxcbiAgICAndHJhbnNpdGlvbicgICAgICAgICAgICAgICAgIDogMSxcbiAgICAndHJhbnNpdGlvbi1kdXJhdGlvbicgICAgICAgIDogMSxcbiAgICAndHJhbnNmb3JtJyAgICAgICAgICAgICAgICAgIDogMSxcbiAgICAndHJhbnNmb3JtLXN0eWxlJyAgICAgICAgICAgIDogMSxcbiAgICAndHJhbnNmb3JtLW9yaWdpbicgICAgICAgICAgIDogMSxcbiAgICAnYmFja2ZhY2UtdmlzaWJpbGl0eScgICAgICAgIDogMSxcbiAgICAncGVyc3BlY3RpdmUnICAgICAgICAgICAgICAgIDogMSxcbiAgICAnYm94LXBhY2snICAgICAgICAgICAgICAgICAgIDogMVxufSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgdXN0cmluZyA9IHJlcXVpcmUoJ3VzdHJpbmcnKVxudmFyIGNhbWVsaXplID0gdXN0cmluZy5jYW1lbGl6ZVxudmFyIGh5cGhlbmF0ZSA9IHVzdHJpbmcuaHlwaGVuYXRlXG52YXIgdG9Mb3dlckZpcnN0ID0gdXN0cmluZy50b0xvd2VyRmlyc3RcbnZhciB0b1VwcGVyRmlyc3QgPSB1c3RyaW5nLnRvVXBwZXJGaXJzdFxuXG52YXIgcHJlZml4SW5mbyA9IHJlcXVpcmUoJy4vcHJlZml4SW5mbycpXG52YXIgcHJlZml4UHJvcGVydGllcyA9IHJlcXVpcmUoJy4vcHJlZml4UHJvcGVydGllcycpXG5cbnZhciBkb2NTdHlsZSA9IHR5cGVvZiBkb2N1bWVudCA9PSAndW5kZWZpbmVkJz9cbiAgICAgICAgICAgICAgICB7fTpcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGVcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhc1N0eWxlUHJlZml4KXtcblxuICAgIHJldHVybiBmdW5jdGlvbihuYW1lLCBjb25maWcpe1xuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge31cblxuICAgICAgICB2YXIgc3R5bGVOYW1lID0gdG9Mb3dlckZpcnN0KGNhbWVsaXplKG5hbWUpKSxcbiAgICAgICAgICAgIGNzc05hbWUgICA9IGh5cGhlbmF0ZShuYW1lKSxcblxuICAgICAgICAgICAgdGhlTmFtZSAgID0gYXNTdHlsZVByZWZpeD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZU5hbWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzTmFtZSxcblxuICAgICAgICAgICAgdGhlUHJlZml4ID0gcHJlZml4SW5mby5zdHlsZT9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc1N0eWxlUHJlZml4P1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXhJbmZvLnN0eWxlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXhJbmZvLmNzc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJ1xuXG4gICAgICAgIGlmICggc3R5bGVOYW1lIGluIGRvY1N0eWxlICkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5hc1N0cmluZz9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZU5hbWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsgdGhlTmFtZSBdXG4gICAgICAgIH1cblxuICAgICAgICAvL25vdCBhIHZhbGlkIHN0eWxlIG5hbWUsIHNvIHdlJ2xsIHJldHVybiB0aGUgdmFsdWUgd2l0aCBhIHByZWZpeFxuXG4gICAgICAgIHZhciB1cHBlckNhc2VkICAgICA9IHRoZU5hbWUsXG4gICAgICAgICAgICBwcmVmaXhQcm9wZXJ0eSA9IHByZWZpeFByb3BlcnRpZXNbY3NzTmFtZV0sXG4gICAgICAgICAgICByZXN1bHQgICAgICAgICA9IFtdXG5cbiAgICAgICAgaWYgKGFzU3R5bGVQcmVmaXgpe1xuICAgICAgICAgICAgdXBwZXJDYXNlZCA9IHRvVXBwZXJGaXJzdCh0aGVOYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwcmVmaXhQcm9wZXJ0eSA9PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgICAgIHZhciBwcmVmaXhlZENzcyA9IHByZWZpeFByb3BlcnR5KHRoZU5hbWUsIHRoZVByZWZpeCkgfHwgW11cbiAgICAgICAgICAgIGlmIChwcmVmaXhlZENzcyAmJiAhQXJyYXkuaXNBcnJheShwcmVmaXhlZENzcykpe1xuICAgICAgICAgICAgICAgIHByZWZpeGVkQ3NzID0gW3ByZWZpeGVkQ3NzXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJlZml4ZWRDc3MubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBwcmVmaXhlZENzcyA9IHByZWZpeGVkQ3NzLm1hcChmdW5jdGlvbihwcm9wZXJ0eSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhc1N0eWxlUHJlZml4P1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b0xvd2VyRmlyc3QoY2FtZWxpemUocHJvcGVydHkpKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHlwaGVuYXRlKHByb3BlcnR5KVxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChwcmVmaXhlZENzcylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGVQcmVmaXgpe1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhlUHJlZml4ICsgdXBwZXJDYXNlZClcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5wdXNoKHRoZU5hbWUpXG5cbiAgICAgICAgaWYgKGNvbmZpZy5hc1N0cmluZyB8fCByZXN1bHQubGVuZ3RoID09IDEpe1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFswXVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbn0iLCIndXNlIHN0cmljdCdcblxudmFyIHVzdHJpbmcgPSByZXF1aXJlKCd1c3RyaW5nJylcblxudmFyIHByZWZpeEluZm8gID0gcmVxdWlyZSgnLi9wcmVmaXhJbmZvJylcbnZhciBjc3NQcmVmaXhGbiA9IHJlcXVpcmUoJy4vY3NzUHJlZml4JylcblxudmFyIEhZUEhFTkFURSAgID0gdXN0cmluZy5oeXBoZW5hdGVcbnZhciBIQVNfT1dOICAgICA9IHJlcXVpcmUoJy4vaGFzT3duJylcbnZhciBJU19PQkpFQ1QgICA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKVxudmFyIElTX0ZVTkNUSU9OID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJylcblxudmFyIGFwcGx5UHJlZml4ID0gZnVuY3Rpb24odGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIG5vcm1hbGl6ZUZuKXtcbiAgICBjc3NQcmVmaXhGbihwcm9wZXJ0eSkuZm9yRWFjaChmdW5jdGlvbihwKXtcbiAgICAgICAgdGFyZ2V0W25vcm1hbGl6ZUZuPyBub3JtYWxpemVGbihwKTogcF0gPSB2YWx1ZVxuICAgIH0pXG59XG5cbnZhciB0b09iamVjdCA9IGZ1bmN0aW9uKHN0cil7XG4gICAgc3RyID0gKHN0ciB8fCAnJykuc3BsaXQoJzsnKVxuXG4gICAgdmFyIHJlc3VsdCA9IHt9XG5cbiAgICBzdHIuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgdmFyIHNwbGl0ID0gaXRlbS5zcGxpdCgnOicpXG5cbiAgICAgICAgaWYgKHNwbGl0Lmxlbmd0aCA9PSAyKXtcbiAgICAgICAgICAgIHJlc3VsdFtzcGxpdFswXS50cmltKCldID0gc3BsaXRbMV0udHJpbSgpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEBpZ25vcmVcbiAqIEBtZXRob2QgdG9TdHlsZU9iamVjdFxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gc3R5bGVzIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBhIHN0eWxlIG9iamVjdC5cbiAqIEBwYXJhbSAge09iamVjdH0gW2NvbmZpZ11cbiAqIEBwYXJhbSAge0Jvb2xlYW59IFtjb25maWcuYWRkVW5pdHM9dHJ1ZV0gVHJ1ZSBpZiB5b3Ugd2FudCB0byBhZGQgdW5pdHMgd2hlbiBudW1lcmljYWwgdmFsdWVzIGFyZSBlbmNvdW50ZXJlZC5cbiAqIEBwYXJhbSAge09iamVjdH0gIGNvbmZpZy5jc3NVbml0bGVzcyBBbiBvYmplY3Qgd2hvc2Uga2V5cyByZXByZXNlbnQgY3NzIG51bWVyaWNhbCBwcm9wZXJ0eSBuYW1lcyB0aGF0IHdpbGwgbm90IGJlIGFwcGVuZGVkIHdpdGggdW5pdHMuXG4gKiBAcGFyYW0gIHtPYmplY3R9ICBjb25maWcucHJlZml4UHJvcGVydGllcyBBbiBvYmplY3Qgd2hvc2Uga2V5cyByZXByZXNlbnQgY3NzIHByb3BlcnR5IG5hbWVzIHRoYXQgc2hvdWxkIGJlIHByZWZpeGVkXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICBjb25maWcuY3NzVW5pdD0ncHgnIFRoZSBjc3MgdW5pdCB0byBhcHBlbmQgdG8gbnVtZXJpY2FsIHZhbHVlcy4gRGVmYXVsdHMgdG8gJ3B4J1xuICogQHBhcmFtICB7U3RyaW5nfSAgY29uZmlnLm5vcm1hbGl6ZU5hbWUgQSBmdW5jdGlvbiB0aGF0IG5vcm1hbGl6ZXMgYSBuYW1lIHRvIGEgdmFsaWQgY3NzIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSAge1N0cmluZ30gIGNvbmZpZy5zY29wZVxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIG9iamVjdCwgbm9ybWFsaXplZCB3aXRoIGNzcyBzdHlsZSBuYW1lc1xuICovXG52YXIgVE9fU1RZTEVfT0JKRUNUID0gZnVuY3Rpb24oc3R5bGVzLCBjb25maWcsIHByZXBlbmQsIHJlc3VsdCl7XG5cbiAgICBpZiAodHlwZW9mIHN0eWxlcyA9PSAnc3RyaW5nJyl7XG4gICAgICAgIHN0eWxlcyA9IHRvT2JqZWN0KHN0eWxlcylcbiAgICB9XG5cbiAgICBjb25maWcgPSBjb25maWcgfHwge31cbiAgICByZXN1bHQgPSByZXN1bHQgfHwge31cblxuICAgIHZhciBzY29wZSAgICA9IGNvbmZpZy5zY29wZSB8fCB7fSxcblxuICAgICAgICAvL2NvbmZpZ3NcbiAgICAgICAgYWRkVW5pdHMgPSBjb25maWcuYWRkVW5pdHMgIT0gbnVsbD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuYWRkVW5pdHM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUgJiYgc2NvcGUuYWRkVW5pdHMgIT0gbnVsbD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuYWRkVW5pdHM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXG5cbiAgICAgICAgY3NzVW5pdGxlc3MgICAgICA9IChjb25maWcuY3NzVW5pdGxlc3MgIT0gbnVsbD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmNzc1VuaXRsZXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZT9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmNzc1VuaXRsZXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCkgfHwge30sXG4gICAgICAgIGNzc1VuaXQgICAgICAgICAgPSAoY29uZmlnLmNzc1VuaXQgfHwgc2NvcGU/IHNjb3BlLmNzc1VuaXQ6IG51bGwpIHx8ICdweCcsXG4gICAgICAgIHByZWZpeFByb3BlcnRpZXMgPSAoY29uZmlnLnByZWZpeFByb3BlcnRpZXMgfHwgKHNjb3BlPyBzY29wZS5wcmVmaXhQcm9wZXJ0aWVzOiBudWxsKSkgfHwge30sXG5cbiAgICAgICAgbm9ybWFsaXplRm4gPSBjb25maWcubm9ybWFsaXplTmFtZSB8fCBIWVBIRU5BVEUsXG5cbiAgICAgICAgcHJvY2Vzc2VkLFxuICAgICAgICBzdHlsZU5hbWUsXG5cbiAgICAgICAgcHJvcE5hbWUsXG4gICAgICAgIHByb3BWYWx1ZSxcbiAgICAgICAgcHJvcENzc1VuaXQsXG4gICAgICAgIHByb3BUeXBlLFxuICAgICAgICBwcm9wSXNOdW1iZXIsXG5cbiAgICAgICAgZm5Qcm9wVmFsdWUsXG4gICAgICAgIHByZWZpeFxuXG4gICAgZm9yIChwcm9wTmFtZSBpbiBzdHlsZXMpIGlmIChIQVNfT1dOKHN0eWxlcywgcHJvcE5hbWUpKSB7XG5cbiAgICAgICAgcHJvcFZhbHVlID0gc3R5bGVzWyBwcm9wTmFtZSBdXG5cbiAgICAgICAgLy90aGUgaHlwaGVuYXRlZCBzdHlsZSBuYW1lIChjc3MgcHJvcGVydHkgbmFtZSlcbiAgICAgICAgc3R5bGVOYW1lID0gbm9ybWFsaXplRm4ocHJlcGVuZD8gcHJlcGVuZCArIHByb3BOYW1lOiBwcm9wTmFtZSlcblxuICAgICAgICBwcm9jZXNzZWQgPSBmYWxzZVxuICAgICAgICBwcmVmaXggICAgPSBmYWxzZVxuXG4gICAgICAgIGlmIChJU19GVU5DVElPTihwcm9wVmFsdWUpKSB7XG5cbiAgICAgICAgICAgIC8vYSBmdW5jdGlvbiBjYW4gZWl0aGVyIHJldHVybiBhIGNzcyB2YWx1ZVxuICAgICAgICAgICAgLy9vciBhbiBvYmplY3Qgd2l0aCB7IHZhbHVlLCBwcmVmaXgsIG5hbWUgfVxuICAgICAgICAgICAgZm5Qcm9wVmFsdWUgPSBwcm9wVmFsdWUuY2FsbChzY29wZSB8fCBzdHlsZXMsIHByb3BWYWx1ZSwgcHJvcE5hbWUsIHN0eWxlTmFtZSwgc3R5bGVzKVxuXG4gICAgICAgICAgICBpZiAoSVNfT0JKRUNUKGZuUHJvcFZhbHVlKSAmJiBmblByb3BWYWx1ZS52YWx1ZSAhPSBudWxsKXtcblxuICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IGZuUHJvcFZhbHVlLnZhbHVlXG4gICAgICAgICAgICAgICAgcHJlZml4ICAgID0gZm5Qcm9wVmFsdWUucHJlZml4XG4gICAgICAgICAgICAgICAgc3R5bGVOYW1lID0gZm5Qcm9wVmFsdWUubmFtZT9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplRm4oZm5Qcm9wVmFsdWUubmFtZSk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlTmFtZVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IGZuUHJvcFZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wVHlwZSAgICAgPSB0eXBlb2YgcHJvcFZhbHVlXG4gICAgICAgIHByb3BJc051bWJlciA9IHByb3BUeXBlID09ICdudW1iZXInIHx8IChwcm9wVHlwZSA9PSAnc3RyaW5nJyAmJiBwcm9wVmFsdWUgIT0gJycgJiYgcHJvcFZhbHVlICogMSA9PSBwcm9wVmFsdWUpXG5cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PSBudWxsIHx8IHN0eWxlTmFtZSA9PSBudWxsIHx8IHN0eWxlTmFtZSA9PT0gJycpe1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wSXNOdW1iZXIgfHwgcHJvcFR5cGUgPT0gJ3N0cmluZycpe1xuICAgICAgICAgICBwcm9jZXNzZWQgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXByb2Nlc3NlZCAmJiBwcm9wVmFsdWUudmFsdWUgIT0gbnVsbCAmJiBwcm9wVmFsdWUucHJlZml4KXtcbiAgICAgICAgICAgcHJvY2Vzc2VkID0gdHJ1ZVxuICAgICAgICAgICBwcmVmaXggICAgPSBwcm9wVmFsdWUucHJlZml4XG4gICAgICAgICAgIHByb3BWYWx1ZSA9IHByb3BWYWx1ZS52YWx1ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2Nlc3NlZCl7XG5cbiAgICAgICAgICAgIHByZWZpeCA9IHByZWZpeCB8fCAhIXByZWZpeFByb3BlcnRpZXNbc3R5bGVOYW1lXVxuXG4gICAgICAgICAgICBpZiAocHJvcElzTnVtYmVyKXtcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBhZGRVbml0cyAmJiAhKHN0eWxlTmFtZSBpbiBjc3NVbml0bGVzcykgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgKyBjc3NVbml0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgKyAnJy8vY2hhbmdlIGl0IHRvIGEgc3RyaW5nLCBzbyB0aGF0IGpxdWVyeSBkb2VzIG5vdCBhcHBlbmQgcHggb3Igb3RoZXIgdW5pdHNcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9zcGVjaWFsIGJvcmRlciB0cmVhdG1lbnRcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAgc3R5bGVOYW1lID09ICdib3JkZXInIHx8XG4gICAgICAgICAgICAgICAgICAgICghc3R5bGVOYW1lLmluZGV4T2YoJ2JvcmRlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIX5zdHlsZU5hbWUuaW5kZXhPZigncmFkaXVzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhfnN0eWxlTmFtZS5pbmRleE9mKCd3aWR0aCcpKVxuICAgICAgICAgICAgICAgICAgICApICYmXG4gICAgICAgICAgICAgICAgICAgIHByb3BJc051bWJlclxuICAgICAgICAgICAgICAgICl7XG5cbiAgICAgICAgICAgICAgICBzdHlsZU5hbWUgPSBub3JtYWxpemVGbihzdHlsZU5hbWUgKyAnLXdpZHRoJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9zcGVjaWFsIGJvcmRlciByYWRpdXMgdHJlYXRtZW50XG4gICAgICAgICAgICBpZiAoIXN0eWxlTmFtZS5pbmRleE9mKCdib3JkZXItcmFkaXVzLScpKXtcbiAgICAgICAgICAgICAgICBzdHlsZU5hbWUucmVwbGFjZSgvYm9yZGVyKC1yYWRpdXMpKC0oLiopKS8sIGZ1bmN0aW9uKHN0ciwgcmFkaXVzLCB0aGVSZXN0KXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICctdG9wJyAgICA6IFsnLXRvcC1sZWZ0JywgICAgICAnLXRvcC1yaWdodCcgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctbGVmdCcgICA6IFsnLXRvcC1sZWZ0JywgICAgJy1ib3R0b20tbGVmdCcgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctcmlnaHQnICA6IFsnLXRvcC1yaWdodCcsICAgJy1ib3R0b20tcmlnaHQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctYm90dG9tJyA6IFsnLWJvdHRvbS1sZWZ0JywgJy1ib3R0b20tcmlnaHQnXVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoZVJlc3QgaW4gcG9zaXRpb25zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlTmFtZSA9IFtdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uc1t0aGVSZXN0XS5mb3JFYWNoKGZ1bmN0aW9uKHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVOYW1lLnB1c2gobm9ybWFsaXplRm4oJ2JvcmRlcicgKyBwb3MgKyByYWRpdXMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVOYW1lID0gbm9ybWFsaXplRm4oJ2JvcmRlcicrIHRoZVJlc3QgKyByYWRpdXMpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZU5hbWUpKXtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVOYW1lLmZvckVhY2goZnVuY3Rpb24oc3R5bGVOYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmVmaXgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5UHJlZml4KHJlc3VsdCwgc3R5bGVOYW1lLCBwcm9wVmFsdWUsIG5vcm1hbGl6ZUZuKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbbm9ybWFsaXplRm4oc3R5bGVOYW1lKV0gPSBwcm9wVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByZWZpeCl7XG4gICAgICAgICAgICAgICAgYXBwbHlQcmVmaXgocmVzdWx0LCBzdHlsZU5hbWUsIHByb3BWYWx1ZSwgbm9ybWFsaXplRm4pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtub3JtYWxpemVGbihzdHlsZU5hbWUpXSA9IHByb3BWYWx1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vdGhlIHByb3BWYWx1ZSBtdXN0IGJlIGFuIG9iamVjdCwgc28gZ28gZG93biB0aGUgaGllcmFyY2h5XG4gICAgICAgICAgICBUT19TVFlMRV9PQkpFQ1QocHJvcFZhbHVlLCBjb25maWcsIHN0eWxlTmFtZSArICctJywgcmVzdWx0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUWUxFX09CSkVDVCIsIid1c2Ugc3RyaWN0J1xuXG52YXIgdG9TdHlsZU9iamVjdCA9IHJlcXVpcmUoJy4vdG9TdHlsZU9iamVjdCcpXG52YXIgaGFzT3duICAgICAgICA9IHJlcXVpcmUoJy4vaGFzT3duJylcblxuLyoqXG4gKiBAaWdub3JlXG4gKiBAbWV0aG9kIHRvU3R5bGVTdHJpbmdcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IHN0eWxlcyBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gYSBzdHlsZSBzdHJpbmcuXG4gKiBAcGFyYW0gIHtPYmplY3R9IGNvbmZpZ1xuICogQHBhcmFtICB7Qm9vbGVhbn0gY29uZmlnLmFkZFVuaXRzPXRydWUgVHJ1ZSBpZiB5b3Ugd2FudCB0byBhZGQgdW5pdHMgd2hlbiBudW1lcmljYWwgdmFsdWVzIGFyZSBlbmNvdW50ZXJlZC4gRGVmYXVsdHMgdG8gdHJ1ZVxuICogQHBhcmFtICB7T2JqZWN0fSAgY29uZmlnLmNzc1VuaXRsZXNzIEFuIG9iamVjdCB3aG9zZSBrZXlzIHJlcHJlc2VudCBjc3MgbnVtZXJpY2FsIHByb3BlcnR5IG5hbWVzIHRoYXQgd2lsbCBub3QgYmUgYXBwZW5kZWQgd2l0aCB1bml0cy5cbiAqIEBwYXJhbSAge09iamVjdH0gIGNvbmZpZy5wcmVmaXhQcm9wZXJ0aWVzIEFuIG9iamVjdCB3aG9zZSBrZXlzIHJlcHJlc2VudCBjc3MgcHJvcGVydHkgbmFtZXMgdGhhdCBzaG91bGQgYmUgcHJlZml4ZWRcbiAqIEBwYXJhbSAge1N0cmluZ30gIGNvbmZpZy5jc3NVbml0PSdweCcgVGhlIGNzcyB1bml0IHRvIGFwcGVuZCB0byBudW1lcmljYWwgdmFsdWVzLiBEZWZhdWx0cyB0byAncHgnXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICBjb25maWcuc2NvcGVcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBvYmplY3QsIG5vcm1hbGl6ZWQgd2l0aCBjc3Mgc3R5bGUgbmFtZXNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdHlsZXMsIGNvbmZpZyl7XG4gICAgc3R5bGVzID0gdG9TdHlsZU9iamVjdChzdHlsZXMsIGNvbmZpZylcblxuICAgIHZhciByZXN1bHQgPSBbXVxuICAgIHZhciBwcm9wXG5cbiAgICBmb3IocHJvcCBpbiBzdHlsZXMpIGlmIChoYXNPd24oc3R5bGVzLCBwcm9wKSl7XG4gICAgICAgIHJlc3VsdC5wdXNoKHByb3AgKyAnOiAnICsgc3R5bGVzW3Byb3BdKVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQuam9pbignOyAnKVxufSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ2V4cG9ydHMnLFxuXG4gICAgbWl4aW5zOiBbcmVxdWlyZSgnLi9jb21tb24nKV0sXG5cbiAgICBvcmllbnRhdGlvbjogJ3ZlcnRpY2FsJyxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHt9XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJyZi1jb2x1bW4gcmYtbGF5b3V0XCJ9LCBcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckNoaWxkcmVuKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH1cbn0pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBSb3dMYXlvdXQgPSByZXF1aXJlKCcuL1Jvd0xheW91dCcpXG52YXIgQ29sdW1uTGF5b3V0ID0gcmVxdWlyZSgnLi9Db2x1bW5MYXlvdXQnKVxuXG52YXIgY29tbW9uICAgICAgICAgPSByZXF1aXJlKCcuL2NvbW1vbicpXG52YXIgcmVuZGVyQ2hpbGRyZW4gPSBjb21tb24ucmVuZGVyQ2hpbGRyZW5cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICAgIG1peGluczogW1xuICAgICAgICBjb21tb25cbiAgICBdLFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuLmNvbmNhdCgpXG5cbiAgICAgICAgdmFyIHJvd0xheW91dCA9IFJvd0xheW91dChudWxsLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgIHZhciBjb2x1bW5MYXlvdXQgPSBDb2x1bW5MYXlvdXQobnVsbCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4uc2xpY2UoMCwgY2hpbGRyZW4ubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIClcblxuICAgICAgICB0aGlzLmFzQ2hpbGRMYXlvdXQoY29sdW1uTGF5b3V0KVxuICAgICAgICB0aGlzLmFzQ2hpbGRMYXlvdXQocm93TGF5b3V0KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwicmYtbGF5b3V0IHJmLWNvbXBvc2l0ZSByZi12LWNvbHVtbi1uLXJvdy0xIFwiKyh0aGlzLnByb3BzLmhvcml6b250YWw/J3JmLWhvcml6b250YWwnOidyZi12ZXJ0aWNhbCcpfSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDaGlsZHJlbihbY29sdW1uTGF5b3V0LCByb3dMYXlvdXRdLCB0aGlzKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfSxcblxuICAgIGFzQ2hpbGRMYXlvdXQ6IGZ1bmN0aW9uKGxheW91dCl7XG4gICAgICAgIHZhciBkZWZhdWx0UHJvcHMgPSBjb21tb24uZ2V0RGVmYXVsdFByb3BzKClcblxuICAgICAgICBPYmplY3Qua2V5cyhkZWZhdWx0UHJvcHMpLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgICAgIGxheW91dC5wcm9wc1trZXldID0gbGF5b3V0LnByb3BzW2tleV0gfHwgdGhpcy5wcm9wc1trZXldXG4gICAgICAgIH0sIHRoaXMpXG4gICAgfVxufSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFJvd0xheW91dCA9IHJlcXVpcmUoJy4vUm93TGF5b3V0JylcbnZhciBDb2x1bW5MYXlvdXQgPSByZXF1aXJlKCcuL0NvbHVtbkxheW91dCcpXG5cbnZhciBjb21tb24gICAgICAgICA9IHJlcXVpcmUoJy4vY29tbW9uJylcbnZhciByZW5kZXJDaGlsZHJlbiA9IGNvbW1vbi5yZW5kZXJDaGlsZHJlblxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ2V4cG9ydHMnLFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIGNvbW1vblxuICAgIF0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW4uY29uY2F0KClcblxuICAgICAgICB2YXIgcm93TGF5b3V0ID0gUm93TGF5b3V0KG51bGwsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgdmFyIGNvbHVtbkxheW91dCA9IENvbHVtbkxheW91dChudWxsLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5zbGljZSgxKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgIHRoaXMuYXNDaGlsZExheW91dChyb3dMYXlvdXQpXG4gICAgICAgIHRoaXMuYXNDaGlsZExheW91dChjb2x1bW5MYXlvdXQpXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJyZi1sYXlvdXQgcmYtY29tcG9zaXRlIHJmLXJvdy0xLWNvbHVtbi1uIFwiKyh0aGlzLnByb3BzLmhvcml6b250YWw/J3JmLWhvcml6b250YWwnOidyZi12ZXJ0aWNhbCcpfSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDaGlsZHJlbihbcm93TGF5b3V0LCBjb2x1bW5MYXlvdXRdLCB0aGlzKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfSxcblxuICAgIGFzQ2hpbGRMYXlvdXQ6IGZ1bmN0aW9uKGxheW91dCl7XG4gICAgICAgIHZhciBkZWZhdWx0UHJvcHMgPSBjb21tb24uZ2V0RGVmYXVsdFByb3BzKClcblxuICAgICAgICBPYmplY3Qua2V5cyhkZWZhdWx0UHJvcHMpLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgICAgIGxheW91dC5wcm9wc1trZXldID0gbGF5b3V0LnByb3BzW2tleV0gfHwgdGhpcy5wcm9wc1trZXldXG4gICAgICAgIH0sIHRoaXMpXG4gICAgfVxufSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICAgIG1peGluczogW1xuICAgICAgICByZXF1aXJlKCcuL2NvbW1vbicpXG4gICAgXSxcblxuICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcsXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7fVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwicmYtcm93IHJmLWxheW91dFwifSwgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDaGlsZHJlbigpXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG59KSIsInZhciB0b1N0eWxlID0gcmVxdWlyZSgndG8tc3R5bGUnKS5vYmplY3RcbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdpLXMnKS5udW1lcmljXG5cbmZ1bmN0aW9uIGdldEJvcmRlclNpemUobGF5b3V0KXtcbiAgICB2YXIgYm9yZGVyZWQgICA9IGxheW91dC5wcm9wcy5ib3JkZXJlZFxuICAgIHZhciBib3JkZXJTaXplID0gYm9yZGVyZWQ/XG4gICAgICAgICAgICAgICAgICAgICAgICBpc051bWVyaWMoYm9yZGVyZWQpP1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyZWQ6IHBhcnNlSW50KGJvcmRlcmVkLCAxMCkgfHwgMVxuICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgMFxuXG4gICAgcmV0dXJuIGJvcmRlclNpemVcbn1cblxuZnVuY3Rpb24gZ2V0RmxleChpdGVtKXtcbiAgICB2YXIgZmxleCA9IGl0ZW0ucHJvcHMuZmxleFxuXG4gICAgcmV0dXJuIGlzTnVtZXJpYyhmbGV4KT9cbiAgICAgICAgICAgICAgICBwYXJzZUludChmbGV4LCAxMCk6XG4gICAgICAgICAgICAgICAgMFxufVxuXG5mdW5jdGlvbiBpdGVtUGFkZGluZyhpdGVtLCBpbmRleCwgbGF5b3V0KXtcblxuICAgIHZhciBzdHlsZSA9IHt9XG5cbiAgICBpZiAobGF5b3V0LnByb3BzLmxheW91dFBhZGRpbmcpe1xuICAgICAgICBzdHlsZS5wYWRkaW5nID0gbGF5b3V0LnByb3BzLmxheW91dFBhZGRpbmdcbiAgICB9XG4gICAgaWYgKGl0ZW0ucHJvcHMubGF5b3V0UGFkZGluZyl7XG4gICAgICAgIHN0eWxlLnBhZGRpbmcgPSBpdGVtLnByb3BzLmxheW91dFBhZGRpbmdcbiAgICB9XG5cbiAgICB2YXIgYm9yZGVyU2l6ZSA9IGdldEJvcmRlclNpemUobGF5b3V0KVxuXG4gICAgaWYgKGJvcmRlclNpemUgJiYgaW5kZXgpe1xuICAgICAgICB2YXIgYm9yZGVyUG9zID0gbGF5b3V0Lm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCc/ICdib3JkZXItdG9wJzogJ2JvcmRlci1sZWZ0J1xuXG4gICAgICAgIHN0eWxlW2JvcmRlclBvcyArICctd2lkdGgnXSA9IGJvcmRlclNpemVcbiAgICAgICAgc3R5bGVbYm9yZGVyUG9zICsgJy1zdHlsZSddID0gJ3NvbGlkJ1xuICAgIH1cblxuICAgIHZhciBpdGVtRmxleCA9IGdldEZsZXgoaXRlbSlcblxuICAgIGlmIChpdGVtRmxleCAmJiBpdGVtRmxleCA+IDEwKXtcbiAgICAgICAgc3R5bGUuZmxleCA9IGl0ZW1GbGV4XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvU3R5bGUoc3R5bGUpXG59XG5cbmZ1bmN0aW9uIGl0ZW1DbGFzcyhpdGVtLCBpbmRleCwgbGF5b3V0KXtcbiAgICB2YXIgcmVzdWx0ID0gWydyZi1sYXlvdXQtaXRlbSddXG5cbiAgICB2YXIgYm9yZGVyU2l6ZSA9IGdldEJvcmRlclNpemUobGF5b3V0KVxuICAgIHZhciBpdGVtRmxleCAgID0gZ2V0RmxleChpdGVtKVxuXG4gICAgaWYgKGl0ZW1GbGV4ICYmIGl0ZW1GbGV4IDw9IDEwKXtcbiAgICAgICAgcmVzdWx0LnB1c2goJ3UtZmxleC0nICsgaXRlbUZsZXgpXG4gICAgfVxuXG4gICAgaWYgKGJvcmRlclNpemUgJiYgaW5kZXgpe1xuICAgICAgICByZXN1bHQucHVzaCgncmYtYm9yZGVyZWQnKVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQuam9pbignICcpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgZ2V0RGVmYXVsdFByb3BzOiByZXF1aXJlKCcuL2dldERlZmF1bHRQcm9wcycpLFxuXG4gICAgcmVuZGVyQ2hpbGRyZW46IHJlcXVpcmUoJy4vcmVuZGVyQ2hpbGRyZW4nKShpdGVtQ2xhc3MsIGl0ZW1QYWRkaW5nKVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBib3JkZXJlZDogMSxcbiAgICAgICAgbGF5b3V0UGFkZGluZzogMFxuICAgIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBSb3dMYXlvdXQgICA6IHJlcXVpcmUoJy4vUm93TGF5b3V0JyksXG4gICAgQ29sdW1uTGF5b3V0OiByZXF1aXJlKCcuL0NvbHVtbkxheW91dCcpLFxuICAgIFJvdzFDb2x1bW5OIDogcmVxdWlyZSgnLi9Sb3cxQ29sdW1uTicpLFxuICAgIENvbHVtbk5Sb3cxIDogcmVxdWlyZSgnLi9Db2x1bW5OUm93MScpXG59IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZW1DbGFzcywgaXRlbVBhZGRpbmcpe1xuICAgIHJldHVybiBmdW5jdGlvbihjaGlsZHJlbiwgbGF5b3V0KXtcbiAgICAgICAgaWYgKGNoaWxkcmVuICYmICFBcnJheS5pc0FycmF5KGNoaWxkcmVuKSl7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtjaGlsZHJlbl1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4gfHwgdGhpcy5wcm9wcy5jaGlsZHJlbiwgZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogaXRlbUNsYXNzKGl0ZW0sIGluZGV4LCB0aGlzKSwgc3R5bGU6IGl0ZW1QYWRkaW5nKGl0ZW0sIGluZGV4LCB0aGlzKX0sIGl0ZW0pXG4gICAgICAgIH0sIGxheW91dCB8fCB0aGlzKVxuICAgIH1cbn0iXX0=
