import { Container } from "react-bootstrap";
import Header from "@components/common/Header/Header";
import styles from "./style.module.css";
import Footer from "@components/common/Footer/Footer";
import { Outlet } from "react-router-dom";

const { container, wrapper } = styles;
function MainLayout() {
  return (
    <div>
      <Container className={container}>
        <Header />
        <div className={wrapper}>
          <Outlet/>
        </div>
        <Footer/>
      </Container>
    </div>
  );
}

export default MainLayout;
