"use client"
import Image from "next/image";
import { Inter } from "next/font/google";
import Home from "../components/Home";


const inter = Inter({ subsets: ["latin"] });

export default function App() {
  return (
    <div className="w-full h-full">
      <Home/>
    </div>
  );
}
// export async function getServerSideProps(context) {
//   const { user } = context;
//   if (!user) {
//     return { redirect: { destination: '/login' } };
//   }
//   return { props: {} }; // No redirect
// }

// import { useAuth } from '../context/AuthContext';
// import TodoList from '../components/TodoList';

// const Home = () => {
//     const { user, handleLogout } = useAuth();

//     if (!user) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div>
//             <h1>TODO List</h1>
//             <button onClick={handleLogout}>Logout</button>
//             <TodoList />
//         </div>
//     );
// };

// export default Home;