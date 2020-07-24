import { writable } from 'svelte/store'
import tileTypeEnum from '../_enums/tileType/tileType.enum'

export const zoom = writable(1)

export const currentLayer = writable('0')
export const layers = writable({
  '0': {
    '0,0,0': {
      type: tileTypeEnum.DATA,
      building: 'kolo-seed--0000'
    },
    '1,0,0': {
      type: tileTypeEnum.TRUNK,
      building: 'kolo-seed--0000'
    },
    '0,1,0': {
      type: tileTypeEnum.TRUNK,
      building: 'kolo-seed--0000'
    },
    '0,0,1': {
      type: tileTypeEnum.TRUNK,
      building: 'kolo-seed--0000'
    }
  }
})

export const hoveredTile = writable(false)
export const selectedTile = writable(false)

import buildingTypeEnum from '../_enums/buildingType/buildingType.enum'
import koloSeedData from '../_data/buildings/kolo-seed/kolo-seed.data'

export const buildings = writable({
  'kolo-seed--0000': {
    type: buildingTypeEnum['KOLO-SEED'],
    area: [ '0,0,0', '1,0,0', '0,1,0', '0,0,1' ],
    ...koloSeedData
  }
})