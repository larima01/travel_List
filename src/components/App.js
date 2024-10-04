import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App(){
  const [items, setItem] = useState([]);

  function handleAddItem(item){
    setItem(items=> [...items, item]);
  }

  function handleDelete(id){
    setItem(items=>items.filter(item=>item.id !== id));
  };
  function handleToggleItem(id){
  setItem(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item ));
}

function handleClearList(){
  const confirmed = window.confirm("Are you sure you want to delete all te items?");

  if(confirmed)setItem([]);
}

return(
  <div className="app">
    <Logo />
  <Form onAddItem={handleAddItem} />
  <PackingList items={items} onDeleteItem={handleDelete} onToggleItem={handleToggleItem} onClearList={handleClearList} />
  <Stats items={items} />
  </div>
)
}



