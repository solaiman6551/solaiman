import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Research from './pages/Research';
import Experience from './pages/Experience';
import Repositories from './pages/Repositories';
import CV from './pages/CV';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/research" element={<Research />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/cv" element={<CV />} />
      </Routes>
    </>
  );
}
