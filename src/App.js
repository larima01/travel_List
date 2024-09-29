import { useState } from "react";

export default function App(){
  const [items, setItem] = useState([]);
  function handleAddItem(item){
    setItem(items=> [...items, item])
  };

  function handleDelete(id){
    setItem(items=>items.filter(item=>item.id !== id))
  };
  function handleToggleItem(id){
  setItem(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item ));
}

return(
  <div className="app">
    <Logo />
  <Form onAddItem={handleAddItem} />
  <PackingList items={items} onDeleteItem={handleDelete} onToggleItem={handleToggleItem}/>
  <Stats items={items} />
  </div>
)
}

function Logo(){
  return<h1>🌴🌴 Far Away 💼 </h1>
}

function Form({onAddItem}){

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e){
    e.preventDefault();

    if(!description) return;
    const newItem = { description,quantity,packed: false, id: Date.now()};
    console.log(newItem);
    onAddItem(newItem);

    setDescription("");
  setQuantity(1);
  }
  return(
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip ?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({length: 20}, (_, i) => i + 1).map(num => (<option value={num} key={num}>{num}</option>))}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  )
}

function PackingList({items, onDeleteItem, onToggleItem}){
  return(
    <div className="list">
      <ul>
      {items.map(item => <Item item={item} key={item.id} onDelete={onDeleteItem} onToggleItem={onToggleItem}/>)}
    </ul>
    </div>
  )
}

function Item({ item, onDelete, onToggleItem }){
  return( 
  <li>
    <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through"} : {}}>{item.quantity} {item.description}</span>
      <button onClick={()=> onDelete(item.id)}>❌</button>
  </li>
  )
}

function Stats({items}){
  if(!items.length) return(
    <p className="stats">
      <em>Start adding some items to your packing list  🚀</em>
    </p>
  );
  const numItems = items.length;
  const numPacked =items.filter(item => item.packed).length;
  const percentage = Math.round(numPacked / numItems * 100)
  return(
    <footer className="stats">
      <em>
        {percentage === 100 ? 'You got everything! Ready to go ✈': `💼 You have ${numItems} items your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
      </footer>
  )
}
