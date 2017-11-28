const vueSelection = {
  bind(el, binding, vnode) {
    el.onmousedown = handleMouseDown
    el.onmouseup = handleMouseUp

    /**
     * handle mousedown event on el
     */
    function handleMouseDown() {
      el.onmouseup = null
      document.body.onmouseup = handleBodyMouseUp
    }
    /**
     * handle mouseup event on el
     */
    function handleMouseUp() {
      var selection = handleRange()
      selection.fixRangeStr && binding.value.getSelection && binding.value.getSelection(selection.fixRangeStr, selection.rangeStr)
    }
    /**
     * handle mouseup event on body
     */
    function handleBodyMouseUp() {
      var selection = handleRange()
      selection.fixRangeStr && binding.value.getSelection && binding.value.getSelection(selection.fixRangeStr, selection.rangeStr)
      if (!el.onmouseup) el.onmouseup = handleMouseUp
      document.body.onmouseup = null
    }
    /**
     * handle mousedown event on el
     */
    function handleRange() {
      var selection = window.getSelection()
      var rtn = {
        rangeStr: '',
        fixRangeStr: ''
      }
      if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0)
        var region = document.createRange()
        region.selectNode(el)
        rtn.rangeStr = range.toString()
        if (binding.modifiers.fix) {
          fixRange(range, region)
          rtn.fixRangeStr = range.toString()
        } else {
          var copyRange = range.cloneRange()
          fixRange(copyRange, region)
          rtn.fixRangeStr = copyRange.toString()
          copyRange.detach()
        }
      }
      return rtn
    }
    /**
     * fix the range according to the region
     * @param {*} range 
     * @param {*} region 
     */
    function fixRange(range, region) {
      if (range.compareBoundaryPoints(Range.START_TO_START, region) < 0) {
        range.setStart(region.startContainer, region.startOffset)
      }
      if (range.compareBoundaryPoints(Range.END_TO_END, region) > 0) {
        range.setEnd(region.endContainer, region.endOffset)
      }
    }
  }
}

export default vueSelection;