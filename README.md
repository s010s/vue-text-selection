# vue-text-selection

## Overview
It's a vue 2.X directive of text-selection. Base on ```Selection``` and ```Range``` API, It can get the innerText of the selected range.

![example.gif](./gif/example.gif)
## Installation
#### NPM
```
npm install vue-selectable  --save
```
#### Direct ```<script>``` Include

```html
<script src="the-package-path/dist/v-selection.js"></script>
```

## Usage
#### NPM
```js
import selection from 'vue-text-selection';

// Register a global custom directive called v-selection
Vue.directive('selection', selection);

// Register the directive locally instead
new Vue({
  el: '#app',
  directives: { selection },
  methods:{
    getSelection: function(fixStr, allStr){
      // fixStr - the string that fix the boudary 
                  of the dom use the directive of the selection
      // allStr - the string of the selection
    }
  }
});
```
#### Direct ```<script>``` Include
```js
new Vue({
  el: '#app',
  directives: { 
    selection: selection.default
  },
  methods:{
    getSelection: function(fixStr, allStr){
      // fixStr - the string that fix the boudary 
                  of the dom use the directive of the selection
      // allStr - the string of the selection
    }
  }
});
```
#### HTML
```html
<div class="select-box" v-selection.fix="{getSelection:getSelection}">
  Text here!
</div>
```
## Option

```v-selection``` requires one mandatory parameter - directive parameter - object with one function, ```getSelection```, to get the fixStr ( the string that fix the boudary of the dom use the directive of the selection ) and the allStr ( the string of the selection ).

```v-selection``` has an optional modifiers, ```fix```, to auto limit the selection in the boundary of the dom use the directive.

## Examples

You can find the example in examples directory. Examples for v2 were tested against version 2.5.9.