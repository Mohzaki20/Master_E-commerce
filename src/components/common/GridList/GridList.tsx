import { Row, Col } from "react-bootstrap";

type GridListProp<T> = {
  records: T[];
  renderItem: (records: T) => React.ReactNode;
};

type HasId = {
  id?: number;
};

const GridList = <T extends HasId>({
  records,
  renderItem,
}: GridListProp<T>) => {
  const categoryList =
    records.length > 0
      ? records.map((record) => (
          <Col
            xs={6}
            md={3}
            key={record.id}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {renderItem(record)}
          </Col>
        ))
      : "There are no categories";

  return <Row>{categoryList}</Row>;
};

export default GridList;
