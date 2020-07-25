<script>
  export let tile

  import {
    hoveredTile,
    selectedTile,
    buildings
  } from '../../_stores/stores'
  import tileTypesData from '../../_data/tiles/types/tileTypes.data'
  import tileTypeEnum from '../../_enums/tileType/tileType.enum'
import Pin from '../_svg/pin/pin.svg.svelte'

  $: tileTypeData = ($hoveredTile || $selectedTile)
    && tileTypesData[($hoveredTile || $selectedTile).type]
  $: building = $buildings[tile.building]
</script>

<style>
  .tile-hover {
    position: absolute;
    bottom: 50px;
    z-index: 100;
    color: rgba(255,255,255,0.8);
    text-align: center;
    font-family: 'Consolas';
    width: 100vw;
  }

  h2 > .small {
    
    font-size: 1rem;
  }
</style>

<div class='tile-hover'>
  <h1>
    { #if building }

      { building.type } :
      { building.name }

    { :else }

      <i>Empty tile</i>
    { /if }
  </h1>
  <h2>
    { tile.type }
    <span class='small'>
      ({ tile.id.replace(/\,/g, ', ') })</span>
    { #if $selectedTile === tile }
    
      <Pin/>
    { /if }
  </h2>
  
  { #if tileTypeData }

    <p>{ @html tileTypeData.description({ building }) }</p>
  { /if }
  { #if building }
    { #each building.menu as item }

      { #if tile.type === tileTypeEnum.DATA && item.condition({ building }) }

        <button on:click={ () => item.action({ building }) }>
          { item.label }
        </button>
      { /if }
    { /each }
  { /if }
  <p></p>
</div>