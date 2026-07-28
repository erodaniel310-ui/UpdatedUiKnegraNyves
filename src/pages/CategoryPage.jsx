import { useParams } from "react-router-dom";
import Shop from "./Shop";

export default function CategoryPage() {
  const { category } = useParams();

  return <Shop category={category} />;
}