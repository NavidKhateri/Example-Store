import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Footer from "./Components/footer/footer";
import Header from "./Components/header/header";
import { Container } from "react-bootstrap";

import Home from "./Components/home/Home";
import Login from "./Components/login/login";
import Product from "./Components/product/Product";
import Cart from "./Components/cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { getprofile } from "./redux/action";
import Profile from "./Components/profile/Profile";
import Address from "./Components/address/Address";
import Checkout from "./Components/checkout/Checkout";
import Orders from "./Components/orders/Orders";
import Oneorder from "./Components/oneOrder/Oneorder";
import Page404 from "./Components/404/Page404";
import Setting from "./Components/setting/Setting";
import ChangePassword from "./Components/setting/changepassword/ChangePassword";
import ChangeProfile from "./Components/setting/changeprofile/ChangeProfile";
import UploadPhoto from "./Components/setting/uploadphoto/UploadPhoto";

function App() {
  const cartt = useSelector((state) => state.cart);
  const { cartItems } = cartt;
  const meghdarsabad = cartItems.reduce((jam, item) => jam + item.qqt, 0);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profile);
  const vaz = data ? data : false;
  const ala = vaz.message === "logged in" ? true : false;

  useEffect(() => {
    dispatch(getprofile());
  }, [dispatch]);
  return (
    <Router>
      <Header meghdarsabad={meghdarsabad} />
      
      <main className="py-3 mainn">
        <Container>
          <Routes>
            {ala ? (
              <Route
                path="/page404"
                element={
                  <Page404
                    message={!ala ? "Please LOGE-IN" : "you logged in"}
                  />
                }
              />
            ) : (
              <Route path="/page404" element={<Navigate to="/" />} />
            )}
            {/* <Route
              path="/page404"
              element={
                <Page404 message={!ala ? "Please LOGE-IN" : "you logged in"} />
              }
            /> */}

            <Route path="/" element={<Home />} />
            {!ala ? (
              <Route path="/login" element={<Login />} />
            ) : (
              <Route path="/login" element={<Navigate to="/page404" />} />
            )}

            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route path="/cart" element={<Cart />} />

            {ala ? (
              <Route
                path="/setting/changepassword"
                element={<ChangePassword />}
              />
            ) : (
              <Route
                path="/setting/changepassword"
                element={<Navigate to="/page404" />}
              />
            )}
            {ala ? (
              <Route
                path="/setting/changeprofile"
                element={<ChangeProfile />}
              />
            ) : (
              <Route
                path="/setting/changeprofile"
                element={<Navigate to="/page404" />}
              />
            )}
            {ala ? (
              <Route path="/setting/upleadphoto" element={<UploadPhoto />} />
            ) : (
              <Route
                path="/setting/upleadphoto"
                element={<Navigate to="/page404" />}
              />
            )}

            {ala ? (
              <Route path="/profile" element={<Profile />} />
            ) : (
              <Route path="/profile" element={<Navigate to="/page404" />} />
            )}

            {ala ? (
              <Route path="/setting" element={<Setting />} />
            ) : (
              <Route path="/setting" element={<Navigate to="/page404" />} />
            )}
            {ala ? (
              <Route path="/address" element={<Address />} />
            ) : (
              <Route path="/address" element={<Navigate to="/login" />} />
            )}

            {ala ? (
              <Route path="/checkout" element={<Checkout />} />
            ) : (
              <Route path="/checkout" element={<Navigate to="/page404" />} />
            )}

            {ala ? (
              <Route path="/orders" element={<Orders />} />
            ) : (
              <Route path="/orders" element={<Navigate to="/page404" />} />
            )}
            {ala ? (
              <Route path="/orders/:id" element={<Oneorder />} />
            ) : (
              <Route path="/orders/:id" element={<Navigate to="/page404" />} />
            )}
          </Routes>
        </Container>
      </main>
      
      <Footer />
    </Router>
  );
}

export default React.memo(App);
