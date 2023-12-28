import { useEffect, useState } from "react";
import "./App.css";
import { fetchPosts } from "./Services/api-post";
import Header from "./Components/Header";
import CardPost from "./Components/CardPost";
import { CiCirclePlus } from "react-icons/ci";

function App() {
  const [DataPost, setDataPost] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(12);

  const handleAnclar = (id, e) => {
    e.stopPropagation();
    // Cambiar el estado de anclaje para la tarjeta con el ID proporcionado
    setDataPost((prevData) =>
      prevData.map((post) =>
        post.id === id ? { ...post, pin: !post.pin } : post
      )
    );
  };
  const handleVerMas = async () => {
    try {
      const additionalData = await fetchPosts(visiblePosts, 12);
      setDataPost((prevData) => [...prevData, ...additionalData]);
      setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 12);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // Función asincrónica para realizar la solicitud a la API
    const fetchData = async () => {
      try {
        // Llama a la función externa que realiza la solicitud a la API
        const data = await fetchPosts(0, visiblePosts);
        const dataWithPinned = data.map((post) => ({
          ...post,
          pin: false,
        }));
        setDataPost(dataWithPinned);
      } catch (error) {
        // Maneja errores
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Llama a la función para realizar la solicitud cuando el componente se monta
    fetchData();
  }, []);

  return (
    <div className="App ">
      <Header />
      <div className="flex items-center justify-center mt-5">
        {loading ? (
          <p className="bg-teal-600 p-2 text-white">Cargando...</p>
        ) : (
          <>
            <section className="flex flex-col items-start">
              {DataPost?.sort((a, b) =>
                a.pin === b.pin ? 0 : a.pin ? -1 : 1
              ).map((post) => (
                <CardPost
                  id={post.id}
                  title={post.title}
                  key={post.id}
                  pin={post.pin}
                  onPinned={(e) => handleAnclar(post.id, e)}
                />
              ))}
            </section>
          </>
        )}
      </div>
      {!loading ? (
        <>
          <div className="flex justify-center mb-3">
            {visiblePosts < 100 && (
              <button
                className="mt-4 p-2 bg-teal-600 text-white rounded-md"
                onClick={handleVerMas}
              >
                <CiCirclePlus size={30} />
              </button>
            )}
          </div>
          <footer class="bg-gray-800 text-white py-4">
            <div class="container mx-auto text-center">
              <p class="text-sm">
                Desarrollado por{" "}
                <span class="font-bold">Davison Cañaveral ❤️</span>
              </p>
            </div>
          </footer>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
