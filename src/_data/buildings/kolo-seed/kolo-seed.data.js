import buildingTypeEnum from "../../../_enums/buildingType/buildingType.enum";
import {
  currentLayer,
  layers,
  hoveredTile,
  selectedTile
} from "../../../_stores/stores";
import tileTypeEnum from "../../../_enums/tileType/tileType.enum";

export default {
  type: buildingTypeEnum['KOLO-SEED'],
  name: 'Colonization seed-vessel',
  menu: [
    {
      condition: () => true,
      label: 'Make the KOLO-SEED sprout',
      action: () => {

        currentLayer.update(() => '1')
        layers.update(prevLayers => ({
          '-1': {
            '0,0,0': {
              type: tileTypeEnum.STEM
            },
            '0,0,-1': {
              type: tileTypeEnum.ROOT
            },
            '0,-1,0': {
              type: tileTypeEnum.ROOT
            },
            '-1,0,0': {
              type: tileTypeEnum.ROOT
            }
          },
          '0': {
            '0,0,0': {
              type: tileTypeEnum.DATA
            },
            '0,0,1': {
              type: tileTypeEnum.STEM
            },
            '0,1,0': {
              type: tileTypeEnum.STEM
            },
            '1,0,0': {
              type: tileTypeEnum.STEM
            }
          },
          '1': {
            '0,0,0': {
              type: tileTypeEnum.STEM
            },
            '0,0,1': {
              type: tileTypeEnum.LEAF
            },
            '0,1,0': {
              type: tileTypeEnum.LEAF
            },
            '1,0,0': {
              type: tileTypeEnum.LEAF
            }
          }
        }))
        hoveredTile.update(() => false)
        selectedTile.update(() => false)
      }
    }
  ]
}