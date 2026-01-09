import { useNavigate } from "react-router-dom"
const BulkOrder = () => {
    const navigate = useNavigate();
  return (
    <div
    onClick={() => navigate("/BulkOrder")}
    className="text-white hover:underline cursor-pointer">Bulk Order</div>
  )
}

export default BulkOrder