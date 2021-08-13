import { SETTINGS } from "./settings/settings";

export function Bar({ height, id }) {
  return (
    <div className="bar" style={{height: `${height}px`, backgroundColor: `${SETTINGS.defaultColor}`}} id={`bar-${id}`}></div>
  )
};