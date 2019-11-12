export declare type $Values<T extends object> = T[keyof T];
export declare type $Call<Fn extends (...args: any[]) => any> = Fn extends (arg: any) => infer RT ? RT : never;