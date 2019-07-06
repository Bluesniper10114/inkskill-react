declare interface ActionMeta {
  http: {
    url: string,
    done: boolean,
  }
}

declare interface Action {
  type: string,
  payload?: any,
  error?: Error,
}

declare interface ActionWithMeta extends Action {
  meta: ActionMeta,
}

declare type XHROptions = {
  url: string;
  data?: mixed;
  method?: string;
}

declare type Options = XHROptions | string;
