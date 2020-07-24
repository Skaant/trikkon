import tileTypeEnum from "../../../_enums/tileType/tileType.enum";

export default {
  [tileTypeEnum.TRUNK]: {
    description: () => 'Inert wood-metal shell.'
  },
  [tileTypeEnum.DATA]: {
    description: ({ building }) =>

      `The data center and core consciousness of <b>${ building.name }</b>.`
  },
  [tileTypeEnum.STEM]: {
    description: () => 'Adaptative fiber structure.'
  },
  [tileTypeEnum.LEAF]: {
    description: () => 'Catch the sun lights and air.'
  },
  [tileTypeEnum.ROOT]: {
    description: () => 'Drain water and soil minerals.'
  }
}