interface IIconReq {
  routeName: string;
  icon: string;
  text?: string;
}

interface ITitleReq {
  routeName: string;
  icon?: string;
  text: string;
}

export type INavOptionsList = Array<IIconReq | ITitleReq>
