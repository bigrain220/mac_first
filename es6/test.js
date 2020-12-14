const data = {
    one: "1",
    two: "2",
    three: "3",
    obj: {
        name: 1,
        value: 1
    },
    // arr:[{name:2,value:2},{name:22,value:22}],
}
let res = {};
// function getObj(value = {}) {
//     for (const key in value) {
//         const element = value[key];
//         // formdata.append(`${key}`, element);
//     }
// };

// function getArr(value = [], key) {
//     value.forEach((item, index) => {
//         // formdata.append(`${key}[${index}]`, item);
//     })
// };

function appendFn(value, pre = "") {
    // console.log(value)
    for (const key in value) {
        // console.log(key)
        const ele = value[key];
        if (Object.prototype.toString.call(ele) === '[object Object]') {
            // appendFn(ele, key)
        } else if (Object.prototype.toString.call(ele) === "[object Array]") {
            console.log('value是数组');
        //除了数组和对象其余放在这里处理
        } else {
            console.log(res+`${res}\.${pre}\.${key}`);
            // pre ? `${res}.${pre}.${key}` = ele : res[pre + key] = ele;
        }
    }
}

appendFn(data);
console.log(res)