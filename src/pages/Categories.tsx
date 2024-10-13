import { Container } from "react-bootstrap";
import Category from "@components/ecommerce/Category/Category";
import Loading from "@components/feedback/Loading";
import GridList from "@components/common/GridList/GridList";
import Heading from "@components/common/Heading/Heading";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { loading, error, records } = useCategories();
  return (
    <Container>
      <Heading title={"Categories"} />
      <Loading status={loading} error={error} type="category">
        <GridList
    emptyMessage="No Categories Found"
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
