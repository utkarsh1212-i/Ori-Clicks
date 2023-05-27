import { ChangeEvent, useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import "./App.css";
import Loader from "./Loader";
import { Form } from "react-bootstrap";
import ImageCard from "./ImageCard";
const API_KEY = "j6v0NjXeFrCNlWCQ2GGzvdJli8CQBgbRlY9ye9B1go620AC4ZaLQX7a8";
const API_URL = "https://api.pexels.com/v1/";

interface PhotosType {
  alt: string;
  avg_color: string;
  height: number;
  id: number;
  liked: boolean;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  src: {
    original: string;
    large: string;
    tiny: string;
    landscape: string;
    portrait: string;

    // Add other properties of the 'src' object if needed
  };
  url: string;
  width: number;
}

function Home() {
  const [pexelPhotos, setPhotosList] = useState<PhotosType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("random");

  const [page, setPage] = useState<number>(1);
  const [loading, setLoader] = useState<boolean>(false);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setSearchTerm("random");
    } else {
      setSearchTerm(event.target.value);
    }
    setPhotosList([]);
    setPage(1);
  };

  const getPhotos = async (searchTerm: string) => {
    setLoader(true);
    try {
      const response = await fetch(
        `${API_URL}/search?query=${searchTerm}&page=${page}&per_page=6`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      const data = await response.json();
      if (data) {
        setLoader(false);
      }
      setPhotosList((prev) => [...prev, ...data.photos]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
        document.documentElement.scrollHeight
      ) {
        setLoader(true);
        setPage((prev) => prev + 1);
        // getPhotos();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const debounce = <T extends (...args: any[]) => any>(
    cb: T,
    delay: number
  ) => {
    let timeoutId: any;
    return (...args: []) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };
  const debouncedHandleChange = debounce(handleChange, 700);

  useEffect(() => {
    getPhotos(searchTerm);
  }, [searchTerm, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="searchArea text-white p-3">
        <h4>Discover The world through Pixels</h4>
        <div className="w-100 d-flex justify-content-center">
          <Form>
            <Form.Group controlId="formBasicInput">
              <Form.Control
                type="text"
                size="lg"
                placeholder="Explore Pictures..."
                className="w-100"
                onChange={debouncedHandleChange}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="imageContainer">
        {pexelPhotos?.map((img) => {
          return <ImageCard imagename={img} key={img.id} />;
        })}
      </div>
      {loading ? <Loader /> : null}
    </>
  );
}

export default Home;
