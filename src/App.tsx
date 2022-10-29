import React, { FC, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Error from "./components/Error";
import Category from "./pages/Category";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Search from "./pages/Search";

import "swiper/css/bundle";
import Movie from "./pages/Movie";
import TV from "./pages/TV";
import Discovery from "./pages/Discovery";
import { useStore } from "./store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./shared/firebase";
import SignIn from "./pages/SignIn";
import History from "./pages/History";

const App: FC = () => {
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
        });
      } else {
        setCurrentUser(null);
      }
    });
  }, [setCurrentUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="explore" element={<Explore />} />
      <Route path="category/:id" element={<Category />} />
      <Route path="search" element={<Search />} />
      <Route path="discovery" element={<Discovery />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="history" element={<History />} />
      <Route path="movie/:id" element={<Movie />} />
      <Route path="tv/:id" element={<TV />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default App;
