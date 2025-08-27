import { useParams } from "react-router-dom";
import Page from "./Page";

export default function PageWrapper() {
  const { slug } = useParams();
  return <Page slug={slug} />;
}
