import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import UserPosts from "./pages/UserPostsPage";
import CreatePost from "./pages/CreatePostPage";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import EditPostPage from "./pages/EditPostPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <main>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/user/:id" element={<UserPosts />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/edit/:id" element={<EditPostPage />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
