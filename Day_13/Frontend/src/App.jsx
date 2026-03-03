import { useState } from 'react'
import './App.css'
import FaceExpression from './feature/Expression/component/FaceExpression'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <FaceExpression />
    </div>
  )
}

export default App
