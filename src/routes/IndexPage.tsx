import React from "react";
import { resetThreshold } from "../redux/slices/threshold";
import PageContainer from "../components/PageContent/PageContainer";
import { useAppDispatch } from "../redux/hooks/hooks";
import { clearStorage } from "../utils/storage/sessionStorage";

export default function IndexPage() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(resetThreshold());
  }, []);
  clearStorage();

  return (
    <PageContainer
      title="indexPage.title"
      description="indexPage.description"
      childrenSx={{ mt: 6 }}
    ></PageContainer>
  );
}
