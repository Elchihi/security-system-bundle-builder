import BundleBuilder from './components/BundleBuilder'
import ReviewPanel from './components/ReviewPanel'
import './App.css'

function App() {
  return (
    <main className="app">
      <div className="app__layout">
        <BundleBuilder />
        <ReviewPanel />
      </div>
    </main>
  )
}

export default App