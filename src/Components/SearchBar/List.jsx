import { React, useState } from "react";
import data from "../../api/search.json";
/* import Highlighter from "react-highlight-words";

function HighlightQuery({ text, query }) {
  return (
    <Highlighter
      highlightClassName="underline bg-transparent text-emerald-500"
      searchWords={[query]}
      autoEscape={true}
      textToHighlight={text}
    />
  );
} */

function List(props) {
  const filteredData = data.filter((el) => {
    if (props.input != "") {
      return el.text.toLowerCase().includes(props.input);
    }
  });
  return (
    <>
      <ul className="flex flex-col w-full min-h-full">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((item) => (
            <li
              className="flex-auto w-full h-full appearance-none bg-transparent bg-slate-200 pt-5 pb-5 pr-2 pl-2 text-zinc-900 hover:text-emerald-500 outline-none placeholder:text-zinc-500 focus:w-full focus:flex-none hover:bg-slate-100"
              key={item.id}
            >
              {item.text}
            </li>
          ))
        ) : (
          <>
            <li className="flex-auto w-full h-full text-center text-sm appearance-none bg-transparent bg-slate-200 pt-5 pb-5 pr-2 pl-2 text-zinc-900 outline-none placeholder:text-zinc-500 focus:w-full focus:flex-none hover:bg-slate-100">
              {props.input.length > 0
                ? `Nothing found for ${props.input}. Please try again`
                : ""}
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default List;
