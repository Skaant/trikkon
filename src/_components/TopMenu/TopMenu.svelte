<script>

  import {
    zoom,
    currentLayer,
    layers
  } from '../../_stores/stores'

  const zoomLevel = [ 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2 ]

  function handleZoomLess() {
    zoom.update(prevZoom =>

      prevZoom > 0.5
        ? zoomLevel[zoomLevel.indexOf(prevZoom) - 1]
        
        : 0.5)
  }

  function handleZoomMore() {
    zoom.update(prevZoom =>

      prevZoom < 2
        ? zoomLevel[zoomLevel.indexOf(prevZoom) + 1]
        
        : 2)
  }

</script>

<style>
  #top-hover {
    position: absolute;
    top: 10px;
    z-index: 105;
    color: rgba(255,255,255,0.8);
    text-align: center;
    font-family: 'Consolas';
    width: 100vw;
  }
</style>

<div id='top-hover'>
  LAYERS :
  { #each
    Object.keys($layers).sort((a, b) => parseInt(a) > parseInt(b))
     as layerIndex }

    { #if layerIndex === $currentLayer }

      <span>&nbsp;{ layerIndex }&nbsp;</span>

    { :else }

      <button on:click={ () => currentLayer.update(layerIndex) }>
        { layerIndex }</button>
    { /if }
  { /each }
  ZOOM :
  <button on:click={ handleZoomLess }>
    -</button>
  { $zoom }
  <button on:click={ handleZoomMore }>
    +</button>
</div>