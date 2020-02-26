function equals(obj, other) {
    var toRet = true;
    if (obj && other) {
        if (Object.keys(obj).length !== Object.keys(other).length) {
            toRet = false;
            return toRet;
        }
    }
    Object.keys(obj).forEach(function (key) {
        if (obj && other) {
            if ((Array.isArray(obj) && !Array.isArray(other))
                || (!Array.isArray(obj) && Array.isArray(other))) {
                toRet = false;
                return toRet;
            }
            if ((typeof obj[key] === 'object' && typeof other[key] !== 'object')
                || (typeof obj[key] !== 'object' && typeof other[key] === 'object')) {
                toRet = false;
                return toRet;
            }
            if (typeof obj[key] !== 'object' && typeof other[key] !== 'object') {
                if (obj[key] !== other[key]) {
                    toRet = false;
                    return toRet;
                }
            }
            if (typeof obj[key] === 'object' && typeof other[key] === 'object') {
                if (!equals(obj[key], other[key])) {
                    toRet = false;
                    return toRet;
                }
            }
        }
        return toRet;
    });
    return toRet;
}
var findKeys = function (obj, value) {
    function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) { return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten); }, []);
    }
    var toRet = [''];
    var toRet2 = [];
    Object.keys(obj).forEach(function (key) {
        if (obj[key] === value) {
            console.log(value, key);
            toRet2.push(key);
        }
        if (typeof obj[key] === 'object' && typeof value === 'object') {
            if (equals(obj[key], value)) {
                toRet2.push(key);
            }
            else {
                toRet = findKeys(obj[key], value);
                if (toRet[0] && toRet[0] !== '') {
                    toRet2.push(toRet);
                }
            }
        }
        if (typeof obj[key] === 'object' && typeof value !== 'object') {
            toRet = findKeys(obj[key], value);
            if (toRet[0] && toRet[0] !== '') {
                toRet2.push(toRet);
            }
        }
    });
    if (toRet2[0] && toRet2[0] !== '') {
        return flatten(toRet2);
    }
    return flatten(toRet);
};
var object = {
    a: 1,
    b: 2,
    ff: { a: 101 },
    hh: { a: 101 },
    ii: { a: 101 },
    ll: { a: 101 },
    ttttt: 1,
    c: {
        ca: 1,
        bb: {
            aa: 50,
            cc: {
                ccc: { vvv: 100 },
                tttt: { a: 101 },
                dfg: 1
            }
        }
    },
    d: 45,
    ee: { a: 101 },
    e: {
        a: 1,
        b: 3,
        dddd: {
            cvb: 500,
            nnnnnn: { a: 101 },
            ccc: { vvv: 100 }
        },
        zzzzz: { a: 101 },
        asd: 1
    }
};
console.log('results for 1 is ', findKeys(object, 1));
console.log('results for { vvv: 100 } is ', findKeys(object, {
    vvv: 100
}));
console.log('results for { a: 101 } ', findKeys(object, { a: 101 }));
