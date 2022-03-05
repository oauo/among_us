# There's an Element Among Us

Determine if array includes element, with deep equal.

```js
among(1).us([0,1,2]) //true
among([1]).us([[0],[1],[2]]) //true
among({foo:1}).us([{foo:0},{foo:1},{foo:2}]) //true

const x = {
  foo:[0,1,2],
  bar:`haii`,
  baz:true,
  qux:[
    {
      foo:[{foo:1}],
      bar:{
        foo:[{foo:[0,1], bar:{foo:true}}],
        bar:true,
      }
    },
    {
      foo:[{foo:2}],
      bar:{
        foo:[{foo:[2,3], bar:{foo:true}}],
        bar:true,
      }
    }
  ],
}

among(x).us([
  {...x, foo:[0,1]}, //false
  {...x, bar:`baii`}, //false
  {...x, qux:[{...x.qux[0], bar:{...x.qux[0].bar, bar:false}}, ...x.qux.slice(1)]}, //false

  x, //true
  {...x}, //true
  {...x, qux:[{...x.qux[0], bar:{...x.qux[0].bar, bar:true}}, ...x.qux.slice(1)]}, //true
])
```

There are 2 options that can be declared inside the `among(x, {shallowEqual:boolean, maxDepth:number})` function.

- `shallowEqual` [`false`] whether to do a shallow compare where `{foo:0} != {foo:0}` but `x == x` if referenced in the array.
- `maxDepth` [`8`] maximum number of recursions to compare to. A recursion is needed for each nested object or array, but not siblings.

sus
