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
      var rtn = handleRange()
      rtn.fixStr && binding.value.getSelection && binding.value.getSelection(rtn.fixStr, rtn.allStr)
    }
    /**
     * handle range fix
     */
    function handleRange() {
      var selection = window.getSelection()
      var rtn = {
        allStr: '',
        fixStr: ''
      }
      if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0)
        var region = document.createRange()
        region.selectNode(el)
        if (CheckIntersection(range, region)) {
          rtn.allStr = range.toString()
          if (binding.modifiers.fix) {
            fixRange(range, region)
            rtn.fixStr = range.toString()
          } else {
            var copyRange = range.cloneRange()
            fixRange(copyRange, region)
            rtn.fixStr = copyRange.toString()
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