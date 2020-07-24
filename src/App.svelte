<script>
	/** STORES */
	import {
		currentLayer,
		layers,
		hoveredTile,
		selectedTile
	} from './_stores/stores'

	/* COMPONENTS */
	import Layer from './_components/Layer/Layer.svelte'
	import TileHover from './_components/TileHover/TileHover.svelte'
	import TopMenu from './_components/TopMenu/TopMenu.svelte'

	$: layer = $layers[$currentLayer]
</script>

<TopMenu />
<Layer layer={ layer } />

{ #if $hoveredTile || $selectedTile }

	<TileHover tile={ $hoveredTile || $selectedTile } />
{ /if }