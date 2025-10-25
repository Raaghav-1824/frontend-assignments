import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "./redux/todoSlice";
import "./App.css";

// function App() {
//   const dispatch = useDispatch();
//   const todoItems = useSelector((state) => state.data); 
  
//   if (todoItems.todo.isLoading){
//     <h1>Loading...</h1>
//   } 

//   return (
//     <div className="App">
//       <button onClick={(e) => dispatch(fetchTodo())}>fetchAPI</button>
//     </div>
//   );
// }

function App() {
  const dispatch = useDispatch();
  const todoItems = useSelector((state) => state.todo);

  return (
    <div className="App">
      {todoItems.isLoading && <h1>Loading...</h1>}
      {todoItems.isError && <h1>Error loading data</h1>}
      {todoItems.data && todoItems.data.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
      <button onClick={() => dispatch(fetchTodo())}>fetchAPI</button>
    </div>
  );
}


export default App;


