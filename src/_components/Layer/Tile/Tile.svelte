<script>
  export let tile
  export let originX
  export let originY

  import {
    zoom,
    hoveredTile,
    selectedTile,
    buildings
  } from '../../../_stores/stores'
  import { TILE_WIDTH } from '../../../_config'

  $: width = TILE_WIDTH * $zoom
  $: height = width * Math.sqrt(3) / 2

  const {
    tileX, tileY, tileZ
  } = tile

  const reversed = !(tileX + tileY + tileZ)%2

  $: top = originY
    - height / 2
    - tileY * height
  $: left = originX
    - width / 2
    + tileX/2 * width
    - tileZ/2 * width

  function handleMouseOver() {
    
    hoveredTile.update(() => tile)
  }

  $: buildingArea = ($hoveredTile || $selectedTile)
    && $buildings[($hoveredTile || $selectedTile).building]

  function handleMouseOut() {
    
    hoveredTile.update(() => false)
  }

  function handleClick() {

    selectedTile.update(() => tile)
  }
</script>

<style>
  .tile {
    position: absolute;
    cursor: pointer;
    pointer-events: none;
  }

  .tile > .polygon__main {
    pointer-events: initial;
    stroke: #0a3d62;
    stroke-width: 10px;
  }

  .tile--DATA > .polygon__main {
    fill: #81ecec;
  }

  .tile--TRUNK > .polygon__main {
    fill: #e17055;
  }

  .tile--STEM > .polygon__main {
    fill: #fab1a0
  }

  .tile--ROOT > .polygon__main {
    fill: #786fa6;
  }

  .tile--LEAF > .polygon__main {
    fill: #00b894;;
  }

  .tile > .polygon__active {
    fill: white;
    opacity: 0.4;
    stroke: #0a3d62;
    stroke-width: 10px;
  }

  .tile > .polygon__building-area {
    stroke: white;
    stroke-width: 10px;
    opacity: 0.4;
    fill: none;
  }
</style>

<svg class={ `tile tile--${ tile.type }` }
    height={ height }
    width={ width }
    on:mouseover={ handleMouseOver }
    on:mouseout={ handleMouseOut }
    on:click={ handleClick }
    style={ `top: ${ top }px; left: ${ left }px` }>
  <polygon class='polygon__main'
      points={
        reversed
          ? `10,5 ${ width - 10 },5 ${ width / 2 },${ height - 5 }`
        
          : `${ width / 2 },10 ${ width - 10 },${ height - 5 } 10,${ height - 5 }` } />
          
  { #if $selectedTile === tile }

      <polygon class='polygon__active'
          points={
            reversed
              ? `10,5 ${ width - 10 },5 ${ width / 2 },${ height - 5 }`
            
              : `${ width / 2 },10 ${ width - 10 },${ height - 5 } 10,${ height - 5 }` } />
  { /if }
  
  { #if buildingArea }

      <polygon class='polygon__building-area'
          points={
            reversed
              ? `10,5 ${ width - 10 },5 ${ width / 2 },${ height - 5 }`
            
              : `${ width / 2 },10 ${ width - 10 },${ height - 5 } 10,${ height - 5 }` } />
  { /if }
</svg>