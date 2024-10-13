import LottieHandler from "@components/feedback/lottieHandler/LottieHandler";
import { Row, Col } from "react-bootstrap";

type GridListProp<T> = {
  records: T[];
  renderItem: (records: T) => React.ReactNode;
  emptyMessage?: string;
};

type HasId = {
  id?: number;
};

const GridList = <T extends HasId>({
  records,
  renderItem,
  emptyMessage,
}: GridListProp<T>) => {
  const categoryList =
    records.length > 0 ? (
      records.map((record) => (
        <Col
          xs={6}
          md={3}
          key={record.id}
          className="d-flex justify-content-center mb-5 mt-2"
        >
          {renderItem(record)}
        </Col>
      ))
    ) : (
      <Col>
        <LottieHandler type="empty" message={emptyMessage}></LottieHandler>
      </Col>
    );

  return <Row>{categoryList}</Row>;
};

export default GridList;
