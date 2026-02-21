import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import VideoDetails from "./pages/VideoDetails";
import TeachingDetails from "./pages/TeachingDetails";
import KidaseDetail from "./pages/KidaseDetail";
import KidaseTypes from "./pages/KidaseTypes";
import KidaseTypeDetails from "./pages/KidaseTypeDetails";
import KidaseSlideDetail from "./pages/KidaseSlideDetail";
import KidaseLanguages from "./pages/KidaseLanguages";
import ScrollToTop from "./components/ScrollToTop";
import ScrollUpButton from "./components/ScrollUpButton";
import HolyAngelDetail from "./pages/HolyAngelDetail";
import EventDetail from "./pages/EventDetail";
import Books from "./pages/Books";
import BookCategoryDetails from "./pages/BookCategoryDetails";
import BookReader from "./pages/BookReader";









import Home from "./pages/Home";
import HolyAngels from "./pages/HolyAngels";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import Videos from "./pages/Videos";
import Teachings from "./pages/Teachings";


function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
     <ScrollUpButton />
      <Routes>

        {/* Main layout route */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/HolyAngels" element={<HolyAngels />} />
          <Route path="/holy-angels/:id" element={<HolyAngelDetail />} />
          <Route path="/events/:id" element={<EventDetail />} />
          
          <Route path="/videos" element={<Videos />} />
          <Route path="/teachings" element={<Teachings />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:categoryId" element={<BookCategoryDetails />} />
          <Route path="/books/read/:categoryId/:bookId" element={<BookReader />} />


<Route path="/teachings/kidase" element={<KidaseLanguages />} />
<Route path="/teachings/kidase/:lang" element={<KidaseTypes />} />
<Route path="/teachings/kidase/:lang/:typeId"element={<KidaseTypeDetails />}/>
<Route path="/teachings/kidase/:lang/:typeId/:slideId"element={<KidaseSlideDetail />}/>




          <Route path="/videos/:id" element={<VideoDetails />} />
          <Route path="/History" element={<History />} />
          <Route path="/teachings/:id" element={<TeachingDetails />} />





        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
