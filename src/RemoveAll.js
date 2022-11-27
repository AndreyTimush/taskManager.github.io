import { useState } from "react";
function RemoveAll({ removeAllTasks }) {
  console.log("removeAll");
  return <button onClick={removeAllTasks}>clear all</button>;
}

export default RemoveAll;
