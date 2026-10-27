export type IconName="calendar"|"trophy"|"people"|"child"|"person";
export interface Metric{value:string;label:string;icon:IconName;placeholder:string}
export interface TrainingFormat{id:string;title:string;description:string;image:string;position:string;icon:IconName}
export interface Court{id:string;number:string;sport:"Теннис"|"Падел";name:string;description:string;image:string;position:string;address:string;metro:string;placeholder:string;point:readonly[number,number]}
export interface TrainingStep{id:string;title:string;description:string;image:string;position:string;caption:string}
export interface Review{name:string;format:string;quote:string;portrait:{image:string;x:number;y:number;diameter:number;width:number;height:number}}
export interface SiteContent{hero:{eyebrow:string;title:string;description:string;primaryAction:{label:string;href:string}};metrics:Metric[];formats:TrainingFormat[];courts:Court[];steps:TrainingStep[];reviews:Review[];questions:{question:string;answer:string}[]}
