import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import SortMain from '../features/sorting/SortMain';
import Sidebar from './Sidebar';
import TreesMain from '../features/trees/TreesMain';
import BinaryTree from '../features/trees/BinaryTree';
import BinarySearchTree from '../features/trees/BinarySearchTree';
import ArraysMain from '../features/arrays/ArraysMain';
import RecursionMain from '../features/recursion/RecursionMain';
import Footer from './Footer';

const App = () => {
  return (
    <div id="appContainer" className="vertical-container">
      <Sidebar />
      <main id="main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="sorting" element={<SortMain />} />
          <Route path="trees" element={<TreesMain />}>
            <Route index element={<BinarySearchTree />} />
            <Route path="binarytree" element={<BinaryTree />} />
            <Route path="binarysearchtree" element={<BinarySearchTree />} />
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
          <Route path="arrays" element={<ArraysMain />} />
          <Route path="recursion" element={<RecursionMain />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
