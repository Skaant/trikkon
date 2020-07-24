<script>
  export let layer

  import Tile from './Tile/Tile.svelte'

  $: tiles = Object.entries(layer)
    .map(([ id, tile ]) => {
      
      const [
        tileX,
        tileY,
        tileZ
      ] = id
        .split(',')
        .map(index => parseInt(index))
      
      return {
        id,
        ...tile,
        tileX,
        tileY,
        tileZ
      }
    })

  $: bounds = tiles && tiles.reduce(
    (acc, tile) => {

      return {
        minX: tile.tileX < acc.minX ? tile.tileX : acc.minX,
        maxX: tile.tileX > acc.maxX ? tile.tileX : acc.maxX,
        minY: tile.tileY < acc.minY ? tile.tileY : acc.minY,
        maxY: tile.tileY > acc.maxY ? tile.tileY : acc.maxY,
        minZ: tile.tileZ < acc.minZ ? tile.tileZ : acc.minZ,
        maxZ: tile.tileZ > acc.maxZ ? tile.tileZ : acc.maxZ
      }
    },
    {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      minZ: 0,
      maxZ: 0
    }
  )

  $: tiles_value = tiles

  import {
    zoom,
    selectedTile
  } from '../../_stores/stores'
  import { TILE_WIDTH } from '../../_config'

  $: tileWidth = TILE_WIDTH * $zoom
  $: tileHeight = tileWidth * Math.sqrt(3) / 2

  $: tilesLeft = bounds.maxX > -bounds.minZ ? bounds.maxX : -bounds.minZ
  $: tilesRight = bounds.maxZ > -bounds.minX ? bounds.maxX : -bounds.minX
  /** tilesTop === maxY, tilesBottom === minY */

  $: contentWidth = (tilesLeft + tilesRight) * tileWidth
  $: contentHeight = (bounds.maxY + bounds.minY + 1) * tileHeight
  
  $: originX = tilesLeft * tileWidth
  $: originY = (bounds.maxY + 0.5) * tileHeight
  $: windowWidth = window.innerWidth
  $: windowHeight = window.innerHeight

  function handleResize() {
  
    originX = tilesLeft * tileWidth
    originY = (bounds.maxY + 0.5) * tileHeight
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
  }

  window.addEventListener(
    'resize',
    handleResize
  )

  function handleBackdropClick() {
    
    selectedTile.update(() => false)
  }
</script>

<style>
  .layer--root {
    position: relative;
  }

  .layer--backdrop {
    background-color: #0a3d62;
    min-height: 100vh;
    min-width: 100vw;
    position: absolute;
    top: 0;
    cursor: pointer;
  }

  .layer--content {
    position: absolute;
    pointer-events: none;
  }
</style>

<div class='layer--root'
  style={ `
    height: ${ contentHeight }px;
    width: ${ contentWidth }px;
  ` }>
  { contentHeight } / { contentWidth }
  X { originX } / Y { originY }

  <div class='layer--backdrop'
      on:click={ handleBackdropClick }></div>

  <div class='layer--content'
      style={ `
        height: ${ contentHeight }px;
        width: ${ contentWidth }px;
        top: ${ contentHeight < windowHeight
          ? (windowHeight - contentHeight) / 2
          : 0 }px;
        left: ${ contentWidth < windowWidth
          ? (windowWidth - contentWidth) / 2
          : 0 }px;` }>

    { #each tiles_value as tile }

      <Tile tile={ tile }
          originX={ originX }
          originY={ originY } />

    { /each }
  </div>
</div>