const vueSelection = {
  bind(el, binding, vnode) {
    document.body.addEventListener('mouseup', handleMouseUp)
    
    /**
     * handle mouseup event on body
     */
    function handleMouseUp() {
      if (!el.parentElement) {
        document.body.removeEventListener('mouseup', handleMouseUp)
        return
      }
      var selection = handleRange()
      selection.fixRangeStr && binding.value.getSelection && binding.value.getSelection(selection.fixRangeStr, selection.rangeStr)
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
        if (CheckIntersection(range, region)) {
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
      }
      return rtn
    }
    /**
     * check if the range intersects the region
     * @param {*} range 
     * @param {*} region 
     */
    function CheckIntersection(range, region) {
      return !(range.compareBoundaryPoints(Range.END_TO_START, region) > 0 || range.compareBoundaryPoints(Range.START_TO_END, region) < 0)
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