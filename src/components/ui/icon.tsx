import{Baby,CalendarDays,Trophy,UserRound,UsersRound}from"lucide-react";import type{IconName}from"@/types/content";
const icons={calendar:CalendarDays,trophy:Trophy,people:UsersRound,child:Baby,person:UserRound};
export function ContentIcon({name,size=24}:{name:IconName;size?:number}){const Icon=icons[name];return <Icon size={size} strokeWidth={1.8} aria-hidden="true"/>;}
