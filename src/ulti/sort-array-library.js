// Example
// const myArray3 = [
//     {
//         text: "c"
//     },
//     {
//         text: "k"
//     },
//     {
//         text: "a"
//     },
//     {
//         text: "b"
//     },
//     {
//         text: "d"
//     }
// ];
// const filterArray = myArray3.reduce((arr, item) => arr.concat(item.text), [])
// const newArray3 = sortLibary(myArray3, "string", "incr", "text");
// console.log(newArray3);

// method: number, string, time
// towards: incr, decr
function sortLibrary(array, method, towards, key) {
   if (towards === 'incr') {
      switch (method) {
         case 'number':
            if (key) {
               array.sort((a, b) => {
                  return a[key] - b[key];
               });
               return array;
            }
            array.sort((a, b) => {
               return a - b;
            });
            return array;
         case 'string':
            if (key) {
               array.sort((a, b) => {
                  return a[key].localeCompare(b[key]);
               });
               return array;
            }
            array.sort((a, b) => {
               return a.localeCompare(b);
            });
            return array;
         case 'time':
            if (key) {
               array.sort((a, b) => {
                  return new Date(a[key]) - new Date(b[key]);
               });
               return array;
            }
            array.sort((a, b) => {
               return new Date(a) - new Date(b);
            });
            return array;
      }
   }
   if (towards === 'decr') {
      switch (method) {
         case 'number':
            if (key) {
               array.sort((a, b) => {
                  return b[key] - a[key];
               });
               return array;
            }
            array.sort((a, b) => {
               return b - a;
            });
            return array;
         case 'string':
            if (key) {
               array.sort((a, b) => {
                  return b[key].localeCompare(a[key]);
               });
               return array;
            }
            array.sort((a, b) => {
               return b.localeCompare(a);
            });
            return array;
         case 'time':
            if (key) {
               array.sort((a, b) => {
                  return new Date(b[key]) - new Date(a[key]);
               });
               return array;
            }
            array.sort((a, b) => {
               return new Date(b) - new Date(a);
            });
            return array;
      }
   }
}

module.exports = sortLibrary;
