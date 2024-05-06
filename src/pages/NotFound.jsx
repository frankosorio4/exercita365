import {Link} from "react-router-dom"

function NotFound() {

    return (
        <div className="container">
            <h1>Page Not Found</h1>
            <Link style={{ color: 'blue' }} to="/">Back to Home</Link>
        </div>
    )
  }
  
  export default NotFound;